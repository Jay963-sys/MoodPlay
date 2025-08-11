import { motion } from "framer-motion";

export default function HeroSection({ session }: { session: any }) {
  return (
    <section className="pt-40 pb-20 text-center relative z-10">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold mb-6"
      >
        {session ? "Welcome Back 🎵" : "Create Your Perfect Playlist"}
      </motion.h1>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        {session
          ? "Pick a style, set the mood, and let’s generate something special."
          : "Sign in with Spotify and craft playlists from your mood or text prompts."}
      </p>
    </section>
  );
}
