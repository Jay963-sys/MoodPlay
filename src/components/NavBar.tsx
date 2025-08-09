"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Mic2, HelpCircle, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 text-2xl font-black hover:scale-105 transition-all duration-300"
          >
            <motion.div
              className="relative w-10 h-10 bg-gradient-to-br from-emerald-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{
                rotate: [0, -10, 10, 0],
                scale: 1.1,
              }}
              transition={{ duration: 0.5 }}
            >
              <Music className="w-5 h-5 text-white" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full transform -skew-x-12"
                animate={{ x: [-40, 40] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300">
              MoodPlay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink
              href="/generate-from-prompt"
              text="Prompt Your Vibe"
              icon={Mic2}
              description="AI Prompt Generation"
            />
            <NavLink
              href="/wizard"
              text="Mood Quiz"
              icon={HelpCircle}
              description="Interactive Questions"
            />

            {session ? (
              <div className="flex items-center gap-3 ml-4">
                {/* User Avatar */}
                <motion.div
                  className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-purple-600 rounded-full flex items-center justify-center">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-sm text-gray-300 font-medium hidden lg:block">
                    {session.user?.name?.split(" ")[0] || "User"}
                  </span>
                </motion.div>

                {/* Sign Out Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="group relative overflow-hidden bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-400/40 px-4 py-2 rounded-xl transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span className="hidden sm:inline">Sign Out</span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0"
                      animate={{ x: [-100, 100] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </Button>
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-4"
              >
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400">
                  Not signed in
                </div>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
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
                  <X className="w-5 h-5 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-3">
                <MobileNavLink
                  href="/generate-from-prompt"
                  text="Voice Your Vibe"
                  icon={Mic2}
                  description="AI Voice Generation"
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
                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-purple-600 rounded-full flex items-center justify-center">
                        {session.user?.image ? (
                          <img
                            src={session.user.image}
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-gray-300 font-medium">
                        {session.user?.name || "User"}
                      </span>
                    </div>
                    <motion.button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </motion.button>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-white/10">
                    <div className="px-3 py-2 text-sm text-gray-400">
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
  );
}

function NavLink({
  href,
  text,
  icon: Icon,
  description,
}: {
  href: string;
  text: string;
  icon: any;
  description: string;
}) {
  return (
    <Link href={href} className="group relative">
      <motion.div
        className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400/20 to-purple-600/20 rounded-lg flex items-center justify-center group-hover:from-emerald-400/30 group-hover:to-purple-600/30 transition-colors">
          <Icon className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
        </div>
        <div className="hidden lg:block">
          <div className="text-sm font-medium text-white group-hover:text-emerald-200 transition-colors">
            {text}
          </div>
          <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
            {description}
          </div>
        </div>
        <div className="lg:hidden text-sm font-medium text-white group-hover:text-emerald-200 transition-colors">
          {text}
        </div>
      </motion.div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
        className="flex items-center gap-3 px-3 py-3 hover:bg-white/10 rounded-xl transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400/20 to-purple-600/20 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <div className="text-sm font-medium text-white">{text}</div>
          <div className="text-xs text-gray-400">{description}</div>
        </div>
      </motion.div>
    </Link>
  );
}
