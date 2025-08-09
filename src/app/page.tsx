"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Loader2,
  Music,
  Mic2,
  Headphones,
  ArrowRight,
  Sparkles,
  Users,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isLoggedIn = !!session;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950 font-sans text-gray-100 antialiased relative overflow-hidden">
      {/* Enhanced Background with animated elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-500/10 via-purple-500/10 to-transparent backdrop-blur-sm"></div>

      {/* Animated background orbs */}
      <motion.div
        className="fixed top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-emerald-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-emerald-500/20 to-purple-500/20 rounded-full blur-2xl"
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          delay: 5,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-pink-500/15 to-violet-500/15 rounded-full blur-xl"
        animate={{
          x: [-50, 50, -25, 25, 0],
          y: [25, -50, 50, -25, 0],
          scale: [1, 1.4, 0.6, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          delay: 10,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 flex flex-col items-center text-center space-y-16">
        {!isLoggedIn ? (
          <>
            {/* Enhanced Logo & Title */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="relative">
                <motion.div
                  className="mx-auto w-32 h-32 bg-gradient-to-br from-emerald-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden"
                  animate={{
                    boxShadow: [
                      "0 0 50px rgba(168, 85, 247, 0.5)",
                      "0 0 80px rgba(16, 185, 129, 0.5)",
                      "0 0 50px rgba(236, 72, 153, 0.5)",
                      "0 0 50px rgba(168, 85, 247, 0.5)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Music className="w-16 h-16 text-white relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                    animate={{ x: [-150, 150] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* Floating elements around logo */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-400 rounded-full"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-6 w-6 h-6 bg-purple-400 rounded-full"
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute top-1/2 -right-8 w-4 h-4 bg-pink-400 rounded-full"
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                />
              </div>

              <div className="space-y-6">
                <h1 className="text-6xl sm:text-8xl font-black bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                  MoodPlay
                </h1>
                <div className="space-y-3">
                  <motion.p
                    className="text-2xl sm:text-3xl text-purple-300 font-semibold"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  ></motion.p>
                  <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Discover playlists that relay your emotions, crafted by
                    someone who understands...
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Stats with better visual hierarchy */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
              {[
                {
                  icon: Music,
                  value: "40M+",
                  label: "Songs",
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  icon: Users,
                  value: "800K+",
                  label: "Playlists",
                  color: "from-purple-500 to-violet-500",
                },
                {
                  icon: TrendingUp,
                  value: "95%",
                  label: "Match Rate",
                  color: "from-pink-500 to-rose-500",
                },
              ].map(({ icon: Icon, value, label, color }, index) => (
                <motion.div
                  key={label}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Glowing background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                  ></div>

                  {/* Card content */}
                  <div className="relative bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:border-white/40 hover:shadow-2xl transition-all duration-300">
                    <Icon className="w-12 h-12 text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-4xl sm:text-5xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {value}
                    </p>
                    <p className="text-sm text-gray-300 uppercase tracking-wider font-medium">
                      {label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Sign In Section */}
            <div className="flex flex-col items-center space-y-8">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-4 p-6 bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl shadow-xl"
                >
                  <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
                  <span className="text-lg text-gray-300 font-medium">
                    Connecting...
                  </span>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <motion.button
                    onClick={() => signIn("spotify")}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-400 hover:to-purple-500 px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl shadow-purple-500/30"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      Sign in with Spotify
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12"
                      animate={{ x: [-300, 300] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.button>

                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      Free Forever
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      No Credit Card
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      Instant Access
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Enhanced Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="relative">
                <motion.div
                  className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Headphones className="w-12 h-12 text-white" />
                </motion.div>
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome, {session?.user?.name?.split(" ")[0] || "User"}!
                </h1>
                <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Your personalized music journey starts here. Choose your path.
                </p>
              </div>
            </motion.div>

            {/* Enhanced Feature Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
              {[
                {
                  icon: Mic2,
                  title: "Voice Your Vibe",
                  description:
                    "Speak your mood or write a prompt for a custom playlist.",
                  href: "/generate-from-prompt",
                  gradient: "from-emerald-500 to-teal-500",
                },
                {
                  icon: Headphones,
                  title: "Mood Quiz",
                  description: "Answer questions for a tailored mix.",
                  href: "/wizard",
                  gradient: "from-purple-500 to-pink-500",
                },
              ].map((option, index) => (
                <motion.div
                  key={option.title}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative"
                >
                  {/* Glowing background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${option.gradient} rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                  ></div>

                  {/* Card */}
                  <Link href={option.href} className="block">
                    <div className="relative bg-white/10 border border-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:border-white/40 hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="space-y-6 text-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${option.gradient} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                        >
                          <option.icon className="w-8 h-8 text-white" />
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {option.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed">
                            {option.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-center gap-3 text-emerald-400 font-semibold group-hover:gap-4 transition-all duration-300">
                          <span>
                            {option.title === "Voice Your Vibe"
                              ? "Explore"
                              : "Start"}
                          </span>
                          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
