import { useState } from "react";
import { Play, ExternalLink, Heart, Share2, Music } from "lucide-react";

interface Track {
  name: string;
  artist: string;
  albumArt: string;
}

interface PlaylistPreviewProps {
  playlistUrl?: string;
  playlistName?: string;
  selectedEmojis?: string[];
  previewTracks?: Track[];
}

export default function PlaylistPreview({
  playlistUrl = "https://open.spotify.com/playlist/example",
  playlistName = "Chill Vibes Mix",
  selectedEmojis = ["🌅", "☕", "🎵"],
  previewTracks = [
    {
      name: "Sunset Dreams",
      artist: "Lo-Fi Collective",
      albumArt: "https://picsum.photos/400/400?random=1",
    },
    {
      name: "Coffee Shop Melody",
      artist: "Acoustic Soul",
      albumArt: "https://picsum.photos/400/400?random=2",
    },
    {
      name: "Morning Breeze",
      artist: "Indie Waves",
      albumArt: "https://picsum.photos/400/400?random=3",
    },
    {
      name: "Golden Hour",
      artist: "Ambient Dreams",
      albumArt: "https://picsum.photos/400/400?random=4",
    },
    {
      name: "Peaceful Moments",
      artist: "Chill Harmony",
      albumArt: "https://picsum.photos/400/400?random=5",
    },
  ],
}: PlaylistPreviewProps) {
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-yellow-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
          </div>

          <div className="relative z-10 p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Music className="w-8 h-8 text-pink-400" />
                <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
                  Your Playlist
                </h1>
              </div>

              <div className="flex items-center justify-center gap-2 mb-4">
                {selectedEmojis.map((emoji, i) => (
                  <span
                    key={i}
                    className="text-4xl animate-bounce"
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {playlistName}
              </h2>

              <p className="text-gray-300 text-lg">
                A perfect blend curated just for you
              </p>
            </div>

            {/* Track List */}
            <div className="space-y-3 mb-8">
              {previewTracks?.slice(0, 5).map((track, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredTrack(i)}
                  onMouseLeave={() => setHoveredTrack(null)}
                >
                  <div className="flex items-center gap-4 p-4">
                    {/* Album Art with Play Button Overlay */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={track.albumArt}
                        alt={track.name}
                        className="w-16 h-16 rounded-xl shadow-lg object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center transition-opacity duration-300 ${
                          hoveredTrack === i ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>

                    {/* Track Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-lg truncate group-hover:text-pink-300 transition-colors">
                        {track.name}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                        {track.artist}
                      </p>
                    </div>

                    {/* Track Number */}
                    <div className="text-2xl font-bold text-white/20 group-hover:text-pink-400/50 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Animated Border */}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 ${
                      hoveredTrack === i ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a
                href={playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Music className="w-5 h-5" />
                <span>Open in Spotify</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                    isLiked
                      ? "bg-pink-500 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                  />
                </button>

                <button className="p-3 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-110">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {previewTracks.length + 15}
                </div>
                <div>tracks</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">~2</div>
                <div>hours</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div>vibes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
      </div>
    </div>
  );
}
