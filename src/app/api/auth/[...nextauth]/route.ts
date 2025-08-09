import "dotenv/config";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-modify-public,playlist-modify-private",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // On first sign in
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at; // in seconds
        return token;
      }

      // Check if the access token has expired
      if (token.expiresAt && Date.now() > token.expiresAt * 1000) {
        console.log("Access token expired, refreshing...");

        try {
          const refreshRes = await fetch(
            "https://accounts.spotify.com/api/token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(
                  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                ).toString("base64")}`,
              },
              body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: token.refreshToken!,
              }),
            }
          );

          if (!refreshRes.ok) {
            console.error("Failed to refresh token", await refreshRes.text());
            return token;
          }

          const refreshed = await refreshRes.json();
          token.accessToken = refreshed.access_token;
          token.expiresAt = Date.now() + refreshed.expires_in * 1000;

          if (refreshed.refresh_token) {
            token.refreshToken = refreshed.refresh_token;
          }

          console.log("Token refreshed successfully");
        } catch (err) {
          console.error("Error refreshing token", err);
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
