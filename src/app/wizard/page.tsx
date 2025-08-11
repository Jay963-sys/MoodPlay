"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Music,
  Loader2,
  Brain,
  Sparkles,
  Play,
} from "lucide-react";
import Link from "next/link";
import PlaylistPreview from "@/components/PlaylistPreview";

const questions = [
  {
    id: "genre",
    question: "What genre speaks to your soul?",
    subtitle: "Choose the sound that moves you",
    options: [
      {
        emoji: "🎵",
        label: "Pop",
        color: "from-pink-400 via-pink-500 to-rose-500",
      },
      {
        emoji: "🪮",
        label: "Afro-Beats",
        color: "from-orange-400 via-red-500 to-red-600",
      },
      {
        emoji: "🎙️",
        label: "Rap",
        color: "from-gray-600 via-gray-700 to-gray-900",
      },
      {
        emoji: "🎤",
        label: "Hip-Hop",
        color: "from-purple-500 via-purple-600 to-purple-800",
      },
      {
        emoji: "🕊️",
        label: "Gospel",
        color: "from-blue-400 via-blue-500 to-blue-600",
      },
      {
        emoji: "🍲",
        label: "Soul Food",
        color: "from-amber-500 via-orange-500 to-orange-600",
      },
      {
        emoji: "🔷",
        label: "R&B",
        color: "from-indigo-400 via-indigo-500 to-purple-600",
      },
      {
        emoji: "🎸",
        label: "Jazz",
        color: "from-emerald-400 via-emerald-500 to-teal-600",
      },
    ],
    theme: {
      bg: "from-pink-500 via-purple-500 to-blue-500",
      accent: "text-pink-100",
      icon: "🎵",
      particles: "from-pink-400/20 to-blue-400/20",
    },
  },
  {
    id: "mood",
    question: "What's your current energy?",
    subtitle: "How are you feeling right now?",
    options: [
      {
        emoji: "😌",
        label: "Chill",
        color: "from-teal-300 via-teal-400 to-cyan-500",
      },
      {
        emoji: "🔥",
        label: "Hype",
        color: "from-red-400 via-red-500 to-orange-500",
      },
      {
        emoji: "😭",
        label: "Sad",
        color: "from-blue-500 via-blue-600 to-indigo-700",
      },
      {
        emoji: "😊",
        label: "Happy",
        color: "from-yellow-300 via-yellow-400 to-orange-400",
      },
      {
        emoji: "💔",
        label: "Heart-Broken",
        color: "from-rose-500 via-rose-600 to-pink-700",
      },
      {
        emoji: "😖",
        label: "Confused",
        color: "from-purple-400 via-purple-500 to-indigo-600",
      },
      {
        emoji: "🕊️",
        label: "Calm",
        color: "from-emerald-300 via-emerald-400 to-teal-500",
      },
      {
        emoji: "😴",
        label: "Sleepy",
        color: "from-slate-400 via-slate-500 to-gray-600",
      },
    ],
    theme: {
      bg: "from-cyan-500 via-blue-500 to-indigo-500",
      accent: "text-cyan-100",
      icon: "💭",
      particles: "from-cyan-400/20 to-indigo-400/20",
    },
  },
  {
    id: "activity",
    question: "What's the setting?",
    subtitle: "What activity needs the perfect soundtrack?",
    options: [
      {
        emoji: "🏃",
        label: "Workout",
        color: "from-green-400 via-green-500 to-emerald-600",
      },
      {
        emoji: "🚗",
        label: "Driving",
        color: "from-blue-400 via-blue-500 to-indigo-600",
      },
      {
        emoji: "📚",
        label: "Studying",
        color: "from-purple-400 via-purple-500 to-violet-600",
      },
      {
        emoji: "🛋️",
        label: "Relaxing",
        color: "from-teal-300 via-teal-400 to-cyan-500",
      },
      {
        emoji: "🧑‍💻",
        label: "Coding",
        color: "from-gray-500 via-gray-600 to-slate-700",
      },
      {
        emoji: "🧑‍🍳",
        label: "Cooking",
        color: "from-orange-400 via-orange-500 to-red-500",
      },
      {
        emoji: "🎮",
        label: "Gaming",
        color: "from-indigo-400 via-indigo-500 to-purple-600",
      },
      {
        emoji: "📅",
        label: "Focus",
        color: "from-emerald-400 via-emerald-500 to-teal-600",
      },
    ],
    theme: {
      bg: "from-green-500 via-emerald-500 to-teal-500",
      accent: "text-green-100",
      icon: "🎯",
      particles: "from-green-400/20 to-teal-400/20",
    },
  },
  {
    id: "era",
    question: "Which era calls to you?",
    subtitle: "Travel through time with music",
    options: [
      {
        emoji: "🕺",
        label: "80s",
        color: "from-purple-400 via-purple-500 to-pink-500",
      },
      {
        emoji: "💾",
        label: "90s",
        color: "from-cyan-400 via-cyan-500 to-blue-500",
      },
      {
        emoji: "📀",
        label: "2000s",
        color: "from-orange-400 via-orange-500 to-red-500",
      },
      {
        emoji: "📱",
        label: "Modern",
        color: "from-indigo-400 via-indigo-500 to-purple-500",
      },
    ],
    theme: {
      bg: "from-purple-500 via-pink-500 to-rose-500",
      accent: "text-purple-100",
      icon: "⏰",
      particles: "from-purple-400/20 to-pink-400/20",
    },
  },
  {
    id: "artist",
    question: "Any artist preference?",
    subtitle: "Optional: Focus on a specific artist or keep it random",
    options: [
      {
        emoji: "🧑‍🎤",
        label: "Drake",
        color: "from-yellow-500 via-yellow-600 to-orange-600",
      },
      {
        emoji: "👑",
        label: "Beyoncé",
        color: "from-yellow-300 via-yellow-400 to-yellow-600",
      },
      {
        emoji: "🕶️",
        label: "Weeknd",
        color: "from-gray-600 via-gray-700 to-black",
      },
      {
        emoji: "🎧",
        label: "Surprise Me",
        color: "from-indigo-400 via-indigo-500 to-purple-600",
      },
    ],
    theme: {
      bg: "from-gray-600 via-gray-700 to-gray-800",
      accent: "text-gray-100",
      icon: "🎤",
      particles: "from-gray-500/20 to-gray-700/20",
    },
    optional: true,
  },
];

// Floating particles component

export default function WizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [previewTracks, setPreviewTracks] = useState([]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleOptionClick = async (option: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = option;
    setAnswers(updatedAnswers);

    if (currentStep === questions.length - 1) {
      setIsLoading(true);

      const [genre, mood = "Any", activity = "Any", era = "Any", artist = ""] =
        updatedAnswers;

      try {
        const response = await fetch("/api/generate-playlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ genre, mood, activity, era, artist }),
        });

        const data = await response.json();
        setPlaylistUrl(data.playlistUrl);
        setPreviewTracks(data.previewTracks);
        setShowSummary(true);
      } catch (error) {
        console.error("Error generating playlist:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrentStep(0);
    setShowSummary(false);
    setPlaylistUrl("");
    setPreviewTracks([]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced dynamic background */}
      <div
        className={`fixed inset-0 bg-gradient-to-br ${
          currentQuestion?.theme.bg || "from-gray-800 to-gray-900"
        } transition-all duration-1000`}
      >
        {/* Layered gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/5 to-transparent"></div>

        {/* Mesh gradient overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(255,255,255,0.08) 0%, transparent 50%)
            `,
          }}
        ></div>
      </div>

      {/* Subtle noise texture */}
      <div className="fixed inset-0 opacity-[0.015] bg-[url('/noise.png')] pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Enhanced header */}
        <div className="flex items-center justify-between p-6 backdrop-blur-sm">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 hover:bg-white/25 hover:border-white/35 transition-all duration-300 text-white shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-semibold">Home</span>
            </motion.div>
          </Link>

          {!isLoading && !showSummary && (
            <div className="flex-1 max-w-sm mx-8">
              <div className="flex items-center justify-between text-white/90 text-sm mb-3">
                <span className="font-medium">Step {currentStep + 1}</span>
                <span className="text-white/70">
                  {Math.round(progress)}% complete
                </span>
              </div>
              <div className="relative w-full bg-white/20 rounded-full h-3 overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-white via-white/90 to-white/80 rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </motion.div>
              </div>
            </div>
          )}

          <div className="w-[88px]" />
        </div>

        {/* Enhanced main content */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-3xl">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  className="text-center space-y-10 py-20"
                >
                  {/* Enhanced loading animation */}
                  <div className="relative mx-auto w-32 h-32">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-white/30 via-white/50 to-white/30 p-1"
                    >
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/40 flex items-center justify-center backdrop-blur-sm">
                        <Music className="w-12 h-12 text-white" />
                      </div>
                    </motion.div>
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -inset-4 rounded-full border-2 border-dashed border-white/30"
                    />
                  </div>

                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-4xl font-black text-white mb-2">
                        Crafting Your Perfect Playlist
                      </h2>
                      <p className="text-white/80 text-xl max-w-md mx-auto">
                        AI is analyzing your taste and curating the perfect
                        tracks...
                      </p>
                    </motion.div>

                    {/* Enhanced loading dots */}
                    <div className="flex justify-center space-x-2">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 bg-white/70 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.4, 1, 0.4],
                            y: [0, -8, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : showSummary ? (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-10"
                >
                  <PlaylistPreview
                    playlistUrl={playlistUrl}
                    playlistName={answers[0] || "My Vibe"}
                    selectedEmojis={answers.map((ans, i) => {
                      const q = questions[i];
                      const match = q.options.find((opt) => opt.label === ans);
                      return match?.emoji || "";
                    })}
                    previewTracks={previewTracks}
                  />

                  <div className="flex justify-center">
                    <motion.button
                      onClick={handleRestart}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center gap-3 px-8 py-4 bg-white/15 hover:bg-white/25 border border-white/25 hover:border-white/35 text-white rounded-2xl font-semibold transition-all duration-300 backdrop-blur-md shadow-lg"
                    >
                      <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      Create Another Playlist
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-12"
                >
                  {/* Enhanced question header */}
                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="mx-auto w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl shadow-xl"
                    >
                      {currentQuestion.theme.icon}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h2
                        className={`text-4xl md:text-5xl font-black mb-3 ${currentQuestion.theme.accent} tracking-tight leading-tight`}
                      >
                        {currentQuestion.question}
                      </h2>
                      <p className="text-white/80 text-xl max-w-2xl mx-auto">
                        {currentQuestion.subtitle}
                      </p>
                    </motion.div>
                  </div>

                  {/* Enhanced options grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={option.label}
                        onClick={() => handleOptionClick(option.label)}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 0.1 * index,
                          type: "spring",
                          stiffness: 150,
                          damping: 12,
                        }}
                        whileHover={{
                          scale: 1.08,
                          y: -8,
                          rotateY: 5,
                          rotateX: 5,
                        }}
                        whileTap={{ scale: 0.95, y: 0 }}
                        className="group relative p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Option background gradient */}
                        <div
                          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-30 transition-all duration-500`}
                        ></div>

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative space-y-4 text-center">
                          <motion.div
                            className="text-5xl"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {option.emoji}
                          </motion.div>
                          <div className="text-white font-bold text-lg group-hover:text-white/95 transition-colors">
                            {option.label}
                          </div>
                        </div>

                        {/* Selection ripple effect */}
                        <motion.div
                          className="absolute inset-0 rounded-3xl bg-white/20 opacity-0"
                          whileTap={{
                            opacity: [0, 1, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 0.3 }}
                        ></motion.div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Enhanced navigation */}
                  <div className="flex justify-between items-center pt-6">
                    <motion.button
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      whileHover={{
                        scale: currentStep > 0 ? 1.05 : 1,
                        x: currentStep > 0 ? -4 : 0,
                      }}
                      whileTap={{ scale: currentStep > 0 ? 0.95 : 1 }}
                      className="group flex items-center gap-3 px-6 py-3 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 rounded-2xl hover:bg-white/10"
                    >
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      <span className="font-medium">Previous</span>
                    </motion.button>

                    {currentQuestion.optional && (
                      <motion.button
                        onClick={() => handleOptionClick("")}
                        whileHover={{ scale: 1.05, x: 4 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-3 px-6 py-3 text-white/70 hover:text-white transition-all duration-300 rounded-2xl hover:bg-white/10"
                      >
                        <span className="font-medium">Skip Question</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
