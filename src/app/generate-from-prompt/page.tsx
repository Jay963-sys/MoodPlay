"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Music,
  Send,
  Loader2,
  Mic,
  MicOff,
  Volume2,
  Zap,
  Heart,
  Coffee,
  Sun,
} from "lucide-react";
import Link from "next/link";
import PlaylistPreview from "@/components/PlaylistPreview";

const promptSuggestions = [
  {
    text: "Chill Afro-beats songs for a cozy evening",
    emoji: "🌙",
    color: "from-blue-500 to-purple-500",
  },
  {
    text: "High-energy workout beats to get pumped",
    emoji: "💪",
    color: "from-red-500 to-orange-500",
  },
  {
    text: "Melancholy Music for late night vibes",
    emoji: "🌃",
    color: "from-purple-500 to-pink-500",
  },
  {
    text: "Upbeat pop hits for a road trip",
    emoji: "🚗",
    color: "from-green-500 to-blue-500",
  },
  {
    text: "Focus music for deep work sessions",
    emoji: "🧠",
    color: "from-indigo-500 to-purple-500",
  },
  {
    text: "Nostalgic hits for good memories",
    emoji: "📼",
    color: "from-yellow-500 to-pink-500",
  },
];

const moodCards = [
  {
    icon: Sun,
    label: "Energetic",
    color: "from-yellow-400 to-orange-500",
    prompt: "upbeat energetic songs that make me want to dance and move",
  },
  {
    icon: Heart,
    label: "Romantic",
    color: "from-pink-400 to-red-500",
    prompt: "romantic love songs perfect for a date night or intimate moments",
  },
  {
    icon: Coffee,
    label: "Focus",
    color: "from-amber-400 to-brown-500",
    prompt: "ambient focus music for productivity and deep concentration",
  },
  {
    icon: Zap,
    label: "Intense",
    color: "from-purple-400 to-indigo-600",
    prompt: "intense dramatic music with powerful emotions and energy",
  },
];

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState<{
    playlistUrl: string;
    playlistName: string;
    previewTracks: { name: string; artist: string; albumArt: string }[];
  } | null>(null);
  const [error, setError] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [prompt]);

  async function generatePlaylistFromPrompt() {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setPlaylist(null);
    setCurrentStep(1);

    try {
      // Simulate multi-step process for better UX
      setCurrentStep(2);

      // Step 1: Parse the prompt
      const parseRes = await fetch("/api/parse-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!parseRes.ok) {
        throw new Error(`Failed to parse prompt: ${parseRes.status}`);
      }

      const parsedParams = await parseRes.json();
      setCurrentStep(3);

      // Step 2: Generate the playlist
      const generateRes = await fetch("/api/generate-playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedParams),
      });

      if (!generateRes.ok) {
        throw new Error(`Failed to generate playlist: ${generateRes.status}`);
      }

      const playlistData = await generateRes.json();
      setCurrentStep(4);

      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPlaylist({
        playlistUrl: playlistData.playlistUrl,
        playlistName: playlistData.playlistName,
        previewTracks: playlistData.previewTracks || [],
      });
    } catch (err: any) {
      console.error("Error generating playlist:", err);
      setError(
        "Something went wrong while generating the playlist. Please try again."
      );
    } finally {
      setLoading(false);
      setCurrentStep(1);
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleMoodCardClick = (moodPrompt: string) => {
    setPrompt(moodPrompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generatePlaylistFromPrompt();
    }
  };

  const handleVoiceInput = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setPrompt((prev) => prev + " " + transcript);
      };

      recognition.onerror = () => {
        setError("Voice recognition failed. Please try again.");
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } else {
      setError("Voice recognition is not supported in your browser.");
    }
  };

  const loadingSteps = [
    { step: 1, text: "Analyzing your vibe..." },
    { step: 2, text: "Finding perfect matches..." },
    { step: 3, text: "Curating your playlist..." },
    { step: 4, text: "Adding final touches..." },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>

        {/* Animated background orbs */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-emerald-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-emerald-500/20 to-purple-500/20 rounded-full blur-2xl"
          animate={{
            x: [0, -40, 60, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            delay: 5,
            ease: "easeInOut",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
                           radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-8">
        {/* Enhanced Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-6 left-6"
        >
          <Link href="/">
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all text-white shadow-lg"
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </motion.div>
          </Link>
        </motion.div>

        <div className="w-full max-w-4xl space-y-8">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <motion.div
              className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden"
              animate={{
                boxShadow: [
                  "0 0 50px rgba(168, 85, 247, 0.3)",
                  "0 0 80px rgba(236, 72, 153, 0.3)",
                  "0 0 50px rgba(168, 85, 247, 0.3)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-10 h-10 text-white relative z-10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                animate={{ x: [-80, 80] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200"></h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"></p>
            </div>
          </motion.div>

          {/* Quick Mood Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {moodCards.map((mood, index) => (
              <motion.button
                key={mood.label}
                onClick={() => handleMoodCardClick(mood.prompt)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${mood.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}
                />
                <div className="relative space-y-2">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mood.color} flex items-center justify-center mx-auto`}
                  >
                    <mood.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm font-medium">{mood.label}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Main input area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

              <div className="relative space-y-6">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="'   'Paint a picture with words... 'Birthday party mix' or 'Chill vibes for studying late at night'"
                    className="w-full bg-transparent border-none outline-none text-white text-lg placeholder-white/50 resize-none min-h-[120px] max-h-[200px] leading-relaxed"
                    disabled={loading}
                    maxLength={100}
                  />

                  {/* Voice Input Button */}
                  <motion.button
                    onClick={handleVoiceInput}
                    disabled={loading}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`absolute top-4 right-4 p-3 rounded-full transition-all ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-400"
                        : "bg-white/10 hover:bg-white/20"
                    } backdrop-blur-sm border border-white/20`}
                  >
                    {isRecording ? (
                      <MicOff className="w-5 h-5 text-white" />
                    ) : (
                      <Mic className="w-5 h-5 text-white" />
                    )}
                  </motion.button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-white/40 text-sm">
                      {prompt.length}/500
                    </div>
                    {isRecording && (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                        Listening...
                      </div>
                    )}
                  </div>

                  <motion.button
                    onClick={generatePlaylistFromPrompt}
                    disabled={loading || !prompt.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Create Playlist</span>
                        </>
                      )}
                    </span>
                    {!loading && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                        animate={{ x: [-300, 300] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Suggestions */}
          <AnimatePresence>
            {!playlist && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-white/90 text-lg font-semibold mb-2">
                    Need inspiration? Try these vibes:
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {promptSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${suggestion.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity`}
                      />
                      <div className="relative flex items-center gap-4">
                        <span className="text-2xl">{suggestion.emoji}</span>
                        <span className="text-white/80 group-hover:text-white text-left font-medium">
                          {suggestion.text}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error state */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 rounded-2xl bg-red-500/20 border border-red-500/30 backdrop-blur-xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-400 text-xl">⚠️</span>
                  </div>
                  <p className="text-red-200">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Loading state */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16 space-y-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl"
                >
                  <Music className="w-10 h-10 text-white" />
                </motion.div>

                <div className="space-y-4">
                  <h3 className="text-white text-2xl font-bold">
                    Crafting Your Perfect Playlist
                  </h3>

                  <div className="space-y-3">
                    {loadingSteps.map((step, index) => (
                      <motion.div
                        key={step.step}
                        className={`flex items-center justify-center gap-3 transition-all ${
                          currentStep >= step.step
                            ? "text-white"
                            : "text-white/40"
                        }`}
                        animate={{
                          scale: currentStep === step.step ? 1.05 : 1,
                          opacity: currentStep >= step.step ? 1 : 0.4,
                        }}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            currentStep > step.step
                              ? "bg-emerald-500"
                              : currentStep === step.step
                              ? "bg-purple-500 animate-pulse"
                              : "bg-white/20"
                          }`}
                        >
                          {currentStep > step.step ? (
                            <span className="text-white text-sm">✓</span>
                          ) : (
                            <span className="text-white text-sm">
                              {step.step}
                            </span>
                          )}
                        </div>
                        <span className="font-medium">{step.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Playlist preview */}
          <AnimatePresence>
            {playlist && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <PlaylistPreview
                  playlistUrl={playlist.playlistUrl}
                  playlistName={playlist.playlistName}
                  selectedEmojis={["🎧", "✨"]}
                  previewTracks={playlist.previewTracks}
                />

                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    onClick={() => {
                      setPlaylist(null);
                      setPrompt("");
                      setError("");
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white/80 hover:text-white transition-all backdrop-blur-xl font-medium"
                  >
                    Create Another Vibe
                  </motion.button>
                  <motion.a
                    href={playlist.playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-medium shadow-xl transition-all"
                  >
                    <Volume2 className="w-4 h-4" />
                    Listen on Spotify
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
