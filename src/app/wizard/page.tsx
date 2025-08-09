"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Music, Loader2, Brain } from "lucide-react";
import Link from "next/link";
import PlaylistPreview from "@/components/PlaylistPreview";

const questions = [
  {
    id: "genre",
    question: "What genre speaks to your soul?",
    subtitle: "Choose the sound that moves you",
    options: [
      { emoji: "🎵", label: "Pop", color: "from-pink-500 to-rose-500" },
      { emoji: "🪮", label: "Afro-Beats", color: "from-orange-500 to-red-500" },
      { emoji: "🎙️", label: "Rap", color: "from-gray-700 to-gray-900" },
      { emoji: "🎤", label: "Hip-Hop", color: "from-purple-600 to-purple-800" },
      { emoji: "🕊️", label: "Gospel", color: "from-blue-400 to-blue-600" },
      {
        emoji: "🍲",
        label: "Soul Food",
        color: "from-amber-600 to-orange-600",
      },
      { emoji: "🔷", label: "R&B", color: "from-indigo-500 to-purple-600" },
      { emoji: "🎸", label: "Jazz", color: "from-emerald-500 to-teal-600" },
    ],
    theme: {
      bg: "from-pink-600 via-purple-600 to-blue-600",
      accent: "text-pink-100",
      icon: "🎵",
    },
  },
  {
    id: "mood",
    question: "What's your current energy?",
    subtitle: "How are you feeling right now?",
    options: [
      { emoji: "😌", label: "Chill", color: "from-teal-400 to-cyan-500" },
      { emoji: "🔥", label: "Hype", color: "from-red-500 to-orange-500" },
      { emoji: "😭", label: "Sad", color: "from-blue-600 to-indigo-700" },
      { emoji: "😊", label: "Happy", color: "from-yellow-400 to-orange-400" },
      {
        emoji: "💔",
        label: "Heart-Broken",
        color: "from-rose-600 to-pink-700",
      },
      {
        emoji: "😖",
        label: "Confused",
        color: "from-purple-500 to-indigo-600",
      },
      { emoji: "🕊️", label: "Calm", color: "from-emerald-400 to-teal-500" },
      { emoji: "😴", label: "Sleepy", color: "from-slate-500 to-gray-600" },
    ],
    theme: {
      bg: "from-cyan-600 via-blue-600 to-indigo-600",
      accent: "text-cyan-100",
      icon: "💭",
    },
  },
  {
    id: "activity",
    question: "What's the setting?",
    subtitle: "What activity needs the perfect soundtrack?",
    options: [
      { emoji: "🏃", label: "Workout", color: "from-green-500 to-emerald-600" },
      { emoji: "🚗", label: "Driving", color: "from-blue-500 to-indigo-600" },
      {
        emoji: "📚",
        label: "Studying",
        color: "from-purple-500 to-violet-600",
      },
      { emoji: "🛋️", label: "Relaxing", color: "from-teal-400 to-cyan-500" },
      { emoji: "🧑‍💻", label: "Coding", color: "from-gray-600 to-slate-700" },
      { emoji: "🧑‍🍳", label: "Cooking", color: "from-orange-500 to-red-500" },
      { emoji: "🎮", label: "Gaming", color: "from-indigo-500 to-purple-600" },
      { emoji: "📅", label: "Focus", color: "from-emerald-500 to-teal-600" },
    ],
    theme: {
      bg: "from-green-600 via-emerald-600 to-teal-600",
      accent: "text-green-100",
      icon: "🎯",
    },
  },
  {
    id: "era",
    question: "Which era calls to you?",
    subtitle: "Travel through time with music",
    options: [
      { emoji: "🕺", label: "80s", color: "from-purple-500 to-pink-500" },
      { emoji: "💾", label: "90s", color: "from-cyan-500 to-blue-500" },
      { emoji: "📀", label: "2000s", color: "from-orange-500 to-red-500" },
      { emoji: "📱", label: "Modern", color: "from-indigo-500 to-purple-500" },
    ],
    theme: {
      bg: "from-purple-600 via-pink-600 to-rose-600",
      accent: "text-purple-100",
      icon: "⏰",
    },
  },
  {
    id: "artist",
    question: "Any artist preference?",
    subtitle: "Optional: Focus on a specific artist or keep it random",
    options: [
      { emoji: "🧑‍🎤", label: "Drake", color: "from-yellow-600 to-orange-600" },
      { emoji: "👑", label: "Beyoncé", color: "from-yellow-400 to-yellow-600" },
      { emoji: "🕶️", label: "Weeknd", color: "from-gray-700 to-black" },
      {
        emoji: "🎧",
        label: "Surprise Me",
        color: "from-indigo-500 to-purple-600",
      },
    ],
    theme: {
      bg: "from-gray-700 via-gray-800 to-gray-900",
      accent: "text-gray-100",
      icon: "🎤",
    },
    optional: true,
  },
];

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
      {/* Dynamic background based on current question */}
      <div
        className={`fixed inset-0 bg-gradient-to-br ${
          currentQuestion?.theme.bg || "from-gray-800 to-gray-900"
        } transition-all duration-1000`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Noise texture */}
      <div className="fixed inset-0 opacity-[0.02] bg-[url('/noise.png')] pointer-events-none"></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with back button and progress */}
        <div className="flex items-center justify-between p-6">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </motion.div>
          </Link>
          {!isLoading && !showSummary && (
            <div className="flex-1 max-w-xs mx-8">
              <div className="flex items-center justify-between text-white/80 text-sm mb-2">
                <span>Question {currentStep + 1}</span>
                <span>{questions.length} total</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-white to-white/80 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
          <div className="w-[72px]" /> {/* Spacer for balance */}
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center space-y-8 py-16"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-white/20 to-white/40 flex items-center justify-center"
                  >
                    <Music className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-white">
                      Crafting Your Perfect Playlist
                    </h2>
                    <p className="text-white/70 text-lg">
                      Analyzing your preferences and curating the perfect
                      tracks...
                    </p>
                  </div>
                  <div className="flex justify-center space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-white/60 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : showSummary ? (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="space-y-8"
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
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl font-medium transition-all backdrop-blur-sm"
                    >
                      Create Another Playlist
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Question header */}
                  <div className="text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="mx-auto w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl"
                    >
                      {currentQuestion.theme.icon}
                    </motion.div>
                    <div>
                      <h2
                        className={`text-3xl md:text-4xl font-black mb-2 ${currentQuestion.theme.accent}`}
                      >
                        {currentQuestion.question}
                      </h2>
                      <p className="text-white/70 text-lg">
                        {currentQuestion.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Options grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={option.label}
                        onClick={() => handleOptionClick(option.label)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-2xl"
                      >
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                        ></div>
                        <div className="relative space-y-3 text-center">
                          <div className="text-4xl">{option.emoji}</div>
                          <div className="text-white font-semibold">
                            {option.label}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-4">
                    <motion.button
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      whileHover={{ scale: currentStep > 0 ? 1.05 : 1 }}
                      whileTap={{ scale: currentStep > 0 ? 0.95 : 1 }}
                      className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white disabled:opacity-30 transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </motion.button>

                    {currentQuestion.optional && (
                      <motion.button
                        onClick={() => handleOptionClick("")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white transition-all"
                      >
                        <span>Skip</span>
                        <ArrowRight className="w-4 h-4" />
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
