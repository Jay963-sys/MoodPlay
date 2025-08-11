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
  Wand2,
  MessageCircle,
  X,
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
  const [isFocused, setIsFocused] = useState(false);

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

  const clearPrompt = () => {
    setPrompt("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const loadingSteps = [
    { step: 1, text: "Analyzing your vibe...", icon: Sparkles },
    { step: 2, text: "Finding perfect matches...", icon: Music },
    { step: 3, text: "Curating your playlist...", icon: Wand2 },
    { step: 4, text: "Adding final touches...", icon: Heart },
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
          className="fixed top-6 left-6 z-50"
        >
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all text-white shadow-lg font-medium"
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </motion.div>
          </Link>
        </motion.div>

        <div className="w-full max-w-5xl space-y-12">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <motion.div
              className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 60px rgba(168, 85, 247, 0.4)",
                  "0 0 100px rgba(236, 72, 153, 0.4)",
                  "0 0 60px rgba(168, 85, 247, 0.4)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-12 h-12 text-white relative z-10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                animate={{ x: [-100, 100] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 leading-tight drop-shadow-sm">
                Prompt Your Vibe
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
                Describe your perfect moment and let the app craft the
                soundtrack to match your mood
              </p>
            </div>
          </motion.div>

          {/* Quick Mood Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {moodCards.map((mood, index) => (
              <motion.button
                key={mood.label}
                onClick={() => handleMoodCardClick(mood.prompt)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative p-6 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${mood.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-300`}
                />
                <div className="relative space-y-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mood.color} flex items-center justify-center mx-auto shadow-lg`}
                  >
                    <mood.icon className="w-6 h-6 text-white drop-shadow-sm" />
                  </div>
                  <p className="text-white font-semibold text-sm">
                    {mood.label}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Main input area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-4xl mx-auto"
          >
            <div
              className={`relative bg-gradient-to-br from-white/12 to-white/8 backdrop-blur-xl rounded-3xl border transition-all duration-300 shadow-2xl ${
                isFocused
                  ? "border-purple-400/60 shadow-purple-500/20"
                  : "border-white/20"
              }`}
            >
              {/* Glowing border effect on focus */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-xl transition-opacity duration-300 ${
                  isFocused ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="relative p-8 space-y-6">
                {/* Input header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90 font-semibold">
                    Describe Your Vibe
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder=""
                    className="w-full bg-transparent border-none outline-none text-white text-lg placeholder-white/40 resize-none min-h-[140px] max-h-[300px] leading-relaxed font-medium"
                    disabled={loading}
                    maxLength={500}
                  />

                  {/* Enhanced control buttons */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    {prompt.length > 0 && (
                      <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={clearPrompt}
                        disabled={loading}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all"
                      >
                        <X className="w-4 h-4 text-white/70" />
                      </motion.button>
                    )}

                    {/* Voice Input Button */}
                    <motion.button
                      onClick={handleVoiceInput}
                      disabled={loading}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-full transition-all duration-300 backdrop-blur-sm border ${
                        isRecording
                          ? "bg-red-500/20 hover:bg-red-500/30 border-red-400/50 text-red-300"
                          : "bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30 text-white/70"
                      }`}
                    >
                      {isRecording ? (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <MicOff className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <Mic className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Enhanced bottom section */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`text-sm font-medium ${
                          prompt.length > 450
                            ? "text-amber-400"
                            : prompt.length > 400
                            ? "text-yellow-400"
                            : "text-white/40"
                        }`}
                      >
                        {prompt.length}/500
                      </div>
                      {prompt.length > 450 && (
                        <span className="text-xs text-amber-400">
                          Almost there!
                        </span>
                      )}
                    </div>

                    {isRecording && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm font-medium"
                      >
                        <motion.div
                          className="w-2 h-2 bg-red-400 rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        Listening...
                      </motion.div>
                    )}
                  </div>

                  <motion.button
                    onClick={generatePlaylistFromPrompt}
                    disabled={loading || !prompt.trim()}
                    whileHover={
                      !loading && prompt.trim() ? { scale: 1.05, y: -2 } : {}
                    }
                    whileTap={!loading && prompt.trim() ? { scale: 0.95 } : {}}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold shadow-2xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden"
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
                    {!loading && prompt.trim() && (
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
                className="space-y-8 max-w-4xl mx-auto"
              >
                <div className="text-center space-y-3">
                  <h3 className="text-white font-bold text-xl">
                    Need inspiration? Try these vibes:
                  </h3>
                  <p className="text-white/60 text-sm">
                    Click any suggestion to get started, or create your own
                    unique prompt
                  </p>
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
                      className="group relative p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm shadow-lg"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${suggestion.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-300`}
                      />
                      <div className="relative flex items-center gap-4">
                        <span className="text-3xl">{suggestion.emoji}</span>
                        <div className="text-left">
                          <span className="text-white/80 group-hover:text-white font-medium leading-relaxed">
                            {suggestion.text}
                          </span>
                        </div>
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
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="max-w-2xl mx-auto p-6 rounded-2xl bg-red-500/10 border border-red-500/30 backdrop-blur-xl shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-xl">⚠️</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-red-200 font-semibold">
                      Oops! Something went wrong
                    </h4>
                    <p className="text-red-200/80 text-sm">{error}</p>
                  </div>
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
                className="text-center py-20 space-y-12 max-w-2xl mx-auto"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/30"
                >
                  <Music className="w-12 h-12 text-white" />
                </motion.div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-white text-3xl font-black">
                      Crafting Your Perfect Playlist
                    </h3>
                    <p className="text-white/70 text-lg">
                      Our AI is carefully selecting tracks that match your vibe
                    </p>
                  </div>

                  <div className="space-y-4">
                    {loadingSteps.map((step, index) => (
                      <motion.div
                        key={step.step}
                        className={`flex items-center justify-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                          currentStep >= step.step
                            ? "text-white bg-white/10 backdrop-blur-sm border border-white/20"
                            : "text-white/40"
                        }`}
                        animate={{
                          scale: currentStep === step.step ? 1.05 : 1,
                          opacity: currentStep >= step.step ? 1 : 0.4,
                        }}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            currentStep > step.step
                              ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                              : currentStep === step.step
                              ? "bg-purple-500 shadow-lg shadow-purple-500/30"
                              : "bg-white/20"
                          }`}
                        >
                          {currentStep > step.step ? (
                            <motion.span
                              className="text-white text-sm font-bold"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              ✓
                            </motion.span>
                          ) : currentStep === step.step ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <step.icon className="w-5 h-5 text-white" />
                            </motion.div>
                          ) : (
                            <span className="text-white text-sm font-bold">
                              {step.step}
                            </span>
                          )}
                        </div>
                        <span className="font-semibold text-lg">
                          {step.text}
                        </span>
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
                className="space-y-8 max-w-4xl mx-auto"
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
