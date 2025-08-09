import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const SPOTIFY_API = "https://api.spotify.com/v1";

async function refreshAccessToken(refreshToken: string) {
  try {
    const refreshRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!refreshRes.ok) {
      console.error("Failed to refresh token", await refreshRes.text());
      throw new Error("Failed to refresh token");
    }

    const refreshed = await refreshRes.json();
    return {
      accessToken: refreshed.access_token,
      expiresAt: Date.now() + refreshed.expires_in * 1000,
      refreshToken: refreshed.refresh_token || refreshToken,
    };
  } catch (err) {
    console.error("Error refreshing token", err);
    throw err;
  }
}

export async function POST(req: NextRequest) {
  console.log("Received POST request at /api/generate-playlist");

  const session = await getServerSession(authOptions);

  if (!session?.accessToken || !session?.refreshToken || !session?.expiresAt) {
    console.log("No session, accessToken, refreshToken, or expiresAt found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let accessToken = session.accessToken;

  // Check if token is expired
  if (Date.now() > session.expiresAt) {
    console.log("Access token expired, refreshing...");
    try {
      const refreshed = await refreshAccessToken(session.refreshToken);
      accessToken = refreshed.accessToken;
      console.log("Token refreshed successfully");
    } catch (err) {
      console.error("Failed to refresh token", err);
      return NextResponse.json(
        { error: "Failed to refresh token" },
        { status: 401 }
      );
    }
  }

  console.log("Token obtained, proceeding with playlist generation...");

  const { genre, mood, activity, era, artist } = await req.json();
  console.log(
    `Received request with data: genre=${genre}, mood=${mood}, activity=${activity}, era=${era}, artist=${artist}`
  );

  try {
    // Get user profile
    const profileRes = await fetch(`${SPOTIFY_API}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileRes.ok) {
      console.log("Failed to fetch user profile from Spotify");
      const profileError = await profileRes.json();
      console.error(profileError);
      return NextResponse.json(
        { error: "Failed to fetch user profile" },
        { status: profileRes.status }
      );
    }

    const profile = await profileRes.json();
    console.log("User profile fetched successfully:", profile);

    // Create a new playlist
    const playlistRes = await fetch(
      `${SPOTIFY_API}/users/${profile.id}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${genre} + ${mood} Playlist 🎧`,
          description: `Generated based on your vibe: ${mood}, era: ${era}, and artist: ${artist}`,
          public: true,
        }),
      }
    );

    if (!playlistRes.ok) {
      console.log("Failed to create playlist");
      const playlistError = await playlistRes.json();
      console.error(playlistError);
      return NextResponse.json(
        { error: "Failed to create playlist" },
        { status: playlistRes.status }
      );
    }

    const playlist = await playlistRes.json();
    console.log("Playlist created successfully:", playlist);

    // Search for tracks
    const query = `${genre} ${mood} ${activity} ${era} ${artist}`;
    console.log("Searching for tracks with query:", query);

    const searchRes = await fetch(
      `${SPOTIFY_API}/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!searchRes.ok) {
      console.log("Failed to search tracks on Spotify");
      const searchError = await searchRes.json();
      console.error(searchError);
      return NextResponse.json(
        { error: "Failed to search for tracks" },
        { status: searchRes.status }
      );
    }

    const searchData = await searchRes.json();
    const tracks = searchData.tracks?.items || [];
    console.log(`Found ${tracks.length} tracks in search results`);

    const selectedTracks = tracks.slice(0, 20);

    if (selectedTracks.length === 0) {
      console.log("No tracks found for the playlist");
      return NextResponse.json({ error: "No tracks found" }, { status: 404 });
    }

    const uris = selectedTracks.map((track: any) => track.uri);
    console.log(`Selected tracks URIs: ${uris}`);

    const addTracksRes = await fetch(
      `${SPOTIFY_API}/playlists/${playlist.id}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris }),
      }
    );

    if (!addTracksRes.ok) {
      console.log("Failed to add tracks to playlist");
      const addTracksError = await addTracksRes.json();
      console.error(addTracksError);
      return NextResponse.json(
        { error: "Failed to add tracks to playlist" },
        { status: addTracksRes.status }
      );
    }

    console.log("Tracks successfully added to the playlist");

    return NextResponse.json({
      playlistUrl: playlist.external_urls.spotify,
      playlistName: playlist.name,
      previewTracks: selectedTracks.slice(0, 5).map((track: any) => ({
        name: track.name,
        artist: track.artists[0]?.name,
        album: track.album.name,
        albumArt: track.album.images[0]?.url,
        previewUrl: track.preview_url,
        playlistId: playlist.id,
      })),
    });
  } catch (error) {
    console.error("Error during playlist generation:", error);
    return NextResponse.json(
      { error: "Failed to generate playlist" },
      { status: 500 }
    );
  }
}
