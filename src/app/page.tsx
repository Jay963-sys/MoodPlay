"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Music,
  Mic2,
  Headphones,
  ArrowRight,
  HelpCircle,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isLoggedIn = !!session;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800 antialiased">
      {/* Integrated Navbar */}
      <header className="relative z-50 border-b border-white/10">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-purple-800/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-purple-500/10 to-pink-500/5"></div>

        <nav className="relative max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            {/* Enhanced Logo */}
            <Link
              href="/"
              className="group flex items-center gap-4 text-2xl font-black hover:scale-105 transition-all duration-300"
            >
              <motion.div
                className="relative w-12 h-12 bg-gradient-to-br from-emerald-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/30"
                whileHover={{
                  rotate: [0, -10, 10, 0],
                  scale: 1.1,
                }}
                transition={{ duration: 0.5 }}
              >
                <Music className="w-6 h-6 text-white drop-shadow-lg" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-2xl transform -skew-x-12"
                  animate={{ x: [-50, 50] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <span className="text-3xl bg-gradient-to-r from-emerald-400 via-purple-300 to-pink-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:via-purple-200 group-hover:to-pink-300 transition-all duration-300 drop-shadow-sm">
                MoodPlay
              </span>
            </Link>

            {/* Desktop Navigation with improved spacing */}
            <div className="hidden md:flex items-center flex-1 justify-end">
              {/* Navigation Links - Centered section */}
              <div className="flex items-center gap-8 mr-auto ml-auto">
                <NavLink
                  href="/generate-from-prompt"
                  text="Prompt Your Vibe"
                  icon={Mic2}
                  description="AI Prompt Generation"
                  gradient="from-purple-500 to-pink-500"
                />

                <NavLink
                  href="/wizard"
                  text="Mood Quiz"
                  icon={HelpCircle}
                  description="Interactive Questions"
                  gradient="from-cyan-500 to-blue-500"
                />
              </div>

              {/* User Section - Right aligned with proper spacing */}
              <div className="flex items-center gap-6">
                {session ? (
                  <>
                    {/* Enhanced User Avatar */}
                    <motion.div
                      className="flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-2xl hover:from-white/20 hover:to-white/10 hover:border-white/30 transition-all duration-300 shadow-lg"
                      whileHover={{ scale: 1.03, y: -2 }}
                    >
                      <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        {session.user?.image ? (
                          <img
                            src={session.user.image}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-white/20"
                          />
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <span className="text-white font-semibold">
                        {session.user?.name?.split(" ")[0] || "User"}
                      </span>
                    </motion.div>

                    {/* Enhanced Sign Out Button */}
                    <motion.button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="group relative overflow-hidden bg-gradient-to-r from-gray-800/40 to-gray-700/40 hover:from-red-500/20 hover:to-pink-500/20 text-gray-300 hover:text-red-300 border border-gray-600/30 hover:border-red-400/50 px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg font-medium hover:shadow-red-500/10 backdrop-blur-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Subtle glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-pink-500/0 group-hover:from-red-500/10 group-hover:to-pink-500/10 transition-all duration-300 rounded-2xl"></div>

                      <span className="relative z-10 flex items-center gap-2">
                        <LogOut className="w-4 h-4 group-hover:rotate-12 transition-all duration-300" />
                        <span className="tracking-wide">Sign Out</span>
                      </span>
                    </motion.button>
                  </>
                ) : (
                  <div className="px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-2xl text-white/80 font-medium shadow-lg">
                    Not signed in
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 border border-white/30 rounded-2xl flex items-center justify-center hover:from-white/30 hover:to-white/20 transition-all duration-300 shadow-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden mt-6 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 space-y-6 shadow-2xl">
                  <MobileNavLink
                    href="/generate-from-prompt"
                    text="Prompt Your Vibe"
                    icon={Mic2}
                    description="AI Prompt Generation"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                  <MobileNavLink
                    href="/wizard"
                    text="Mood Quiz"
                    icon={HelpCircle}
                    description="Interactive Questions"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />

                  {session ? (
                    <div className="pt-4 border-t border-white/20 space-y-4">
                      <div className="flex items-center gap-4 px-4 py-3 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          {session.user?.image ? (
                            <img
                              src={session.user.image}
                              alt="Profile"
                              className="w-10 h-10 rounded-full border-2 border-white/20"
                            />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <span className="text-white font-semibold">
                          {session.user?.name || "User"}
                        </span>
                      </div>
                      <motion.button
                        onClick={() => {
                          signOut({ callbackUrl: "/" });
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-300 hover:text-white border border-red-500/30 rounded-2xl transition-all duration-200 font-semibold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </motion.button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-white/20">
                      <div className="px-4 py-3 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl text-white/80 font-medium">
                        Not signed in
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        {/* Floating music notes */}
        <div className="fixed top-24 right-16 w-10 h-10 text-white/15 animate-pulse">
          <Music className="w-full h-full" />
        </div>
        <div className="fixed bottom-20 left-16 w-8 h-8 text-white/15">
          <Music className="w-full h-full" />
        </div>
        <div className="fixed top-1/4 left-24 w-6 h-6 text-white/10 animate-pulse">
          <Music className="w-full h-full" />
        </div>
        <div className="fixed top-3/4 right-32 w-7 h-7 text-white/12">
          <Music className="w-full h-full" />
        </div>
        <div className="fixed bottom-1/3 right-20 w-5 h-5 text-white/8 animate-pulse">
          <Music className="w-full h-full" />
        </div>
        <div className="fixed top-1/2 left-12 w-9 h-9 text-white/10">
          <Music className="w-full h-full" />
        </div>
        <div className="fixed bottom-32 right-1/4 w-6 h-6 text-white/12 animate-pulse">
          <Music className="w-full h-full" />
        </div>
        <div className="fixed top-48 left-1/3 w-4 h-4 text-white/8">
          <Music className="w-full h-full" />
        </div>

        <div className="w-full max-w-4xl mx-auto px-6 text-center">
          {!isLoggedIn ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              {/* Center Logo */}
              <div className="w-40 h-40 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/20">
                <Music className="w-20 h-20 text-white" />
              </div>

              {/* Hero Text */}
              <div className="space-y-8 pt-8">
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none"></h1>
                <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
                  Discover playlists that relay your emotions
                </p>
              </div>

              {/* Sign In Button */}
              <div className="pt-24">
                {isLoading ? (
                  <div className="inline-flex items-center gap-5 px-16 py-8 bg-green-600 rounded-3xl text-2xl font-bold">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span></span>
                  </div>
                ) : (
                  <button
                    onClick={() => signIn("spotify")}
                    className="inline-flex items-center gap-5 px-16 py-8 bg-green-500 hover:bg-green-600 rounded-3xl font-bold text-2xl transition-all duration-200 shadow-2xl hover:shadow-green-500/25 hover:scale-105"
                  >
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <div className="absolute w-2 h-2 bg-black rounded-full"></div>
                      </div>
                    </div>
                    Sign in with Spotify
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-24"
            >
              {/* Welcome */}
              <div className="space-y-12">
                <div className="w-40 h-40 mx-auto bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                  <Headphones className="w-20 h-20 text-white" />
                </div>

                <div className="space-y-8">
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight drop-shadow-sm">
                    Welcome back,
                    <br />
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                      {session?.user?.name?.split(" ")[0] || "User"}!
                    </span>
                  </h1>
                  <p className="text-2xl md:text-3xl text-gray-200 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
                    How would you like to create your playlist today?
                  </p>
                </div>
              </div>

              {/* Options */}
              <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto pt-8">
                <Link href="/generate-from-prompt">
                  <motion.div
                    className="group relative overflow-hidden bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-xl border border-white/20 hover:border-purple-400/60 rounded-3xl p-16 transition-all duration-500 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-pink-500/10 shadow-2xl hover:shadow-purple-500/20"
                    whileHover={{ scale: 1.03, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 space-y-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-purple-500/25">
                        <Mic2 className="w-10 h-10 text-white drop-shadow-sm" />
                      </div>

                      <div className="text-center space-y-6">
                        <h3 className="text-4xl font-black text-white tracking-tight drop-shadow-sm">
                          Prompt Your Vibe
                        </h3>
                        <p className="text-gray-200 text-xl leading-relaxed font-medium drop-shadow-sm">
                          Describe your mood
                        </p>
                      </div>

                      <div className="flex items-center justify-center text-purple-300 font-bold text-xl pt-6">
                        <span className="drop-shadow-sm">Go</span>
                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-3 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.div>
                </Link>

                <Link href="/wizard">
                  <motion.div
                    className="group relative overflow-hidden bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-xl border border-white/20 hover:border-cyan-400/60 rounded-3xl p-16 transition-all duration-500 hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-blue-500/10 shadow-2xl hover:shadow-cyan-500/20"
                    whileHover={{ scale: 1.03, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 space-y-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/25">
                        <HelpCircle className="w-10 h-10 text-white drop-shadow-sm" />
                      </div>

                      <div className="text-center space-y-6">
                        <h3 className="text-4xl font-black text-white tracking-tight drop-shadow-sm">
                          Mood Quiz
                        </h3>
                        <p className="text-gray-200 text-xl leading-relaxed font-medium drop-shadow-sm">
                          Answer interactive questions
                        </p>
                      </div>

                      <div className="flex items-center justify-center text-cyan-300 font-bold text-xl pt-6">
                        <span className="drop-shadow-sm">Go</span>
                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-3 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

function NavLink({
  href,
  text,
  icon: Icon,
  description,
  gradient,
}: {
  href: string;
  text: string;
  icon: any;
  description: string;
  gradient: string;
}) {
  return (
    <Link href={href} className="group relative">
      <motion.div
        className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-2xl hover:from-white/20 hover:to-white/10 hover:border-white/30 transition-all duration-300 shadow-lg"
        whileHover={{ scale: 1.03, y: -3 }}
        whileTap={{ scale: 0.97 }}
      >
        <div
          className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-5 h-5 text-white drop-shadow-sm" />
        </div>
        <div className="hidden lg:block">
          <div className="text-sm font-bold text-white transition-colors drop-shadow-sm">
            {text}
          </div>
          <div className="text-xs text-gray-300 transition-colors">
            {description}
          </div>
        </div>
        <div className="lg:hidden text-sm font-bold text-white transition-colors">
          {text}
        </div>
      </motion.div>
    </Link>
  );
}

function MobileNavLink({
  href,
  text,
  icon: Icon,
  description,
  onClick,
}: {
  href: string;
  text: string;
  icon: any;
  description: string;
  onClick: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        className="flex items-center gap-4 px-4 py-4 hover:bg-gradient-to-r hover:from-white/15 hover:to-white/10 rounded-2xl transition-all duration-200 border border-transparent hover:border-white/20"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold text-white">{text}</div>
          <div className="text-xs text-gray-300">{description}</div>
        </div>
      </motion.div>
    </Link>
  );
}
