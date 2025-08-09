"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Track {
  name: string;
  artist: string;
  albumArt: string;
}

interface PlaylistPreviewProps {
  playlistUrl: string;
  playlistName: string;
  selectedEmojis: string[];
  previewTracks: Track[];
}

export default function PlaylistPreview({
  playlistUrl,
  playlistName,
  selectedEmojis,
  previewTracks,
}: PlaylistPreviewProps) {
  return (
    <motion.div
      className="p-8 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] max-w-3xl w-full mx-auto transition-all"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-3">
        Your Playlist is Ready 🎉
      </h2>

      <p className="text-lg text-center text-gray-300 mb-6">
        <span className="font-semibold text-orange-400">{playlistName}</span>{" "}
        inspired by <span className="text-2xl">{selectedEmojis.join(" ")}</span>
      </p>

      <div className="grid gap-4">
        {previewTracks?.slice(0, 5).map((track, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            <Image
              src={track.albumArt}
              alt={track.name}
              width={60}
              height={60}
              className="rounded-md shadow-md"
            />
            <div>
              <p className="font-semibold text-white">{track.name}</p>
              <p className="text-sm text-gray-400">{track.artist}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <a
          href={playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        >
          🎧 Open in Spotify
        </a>
      </div>
    </motion.div>
  );
}
