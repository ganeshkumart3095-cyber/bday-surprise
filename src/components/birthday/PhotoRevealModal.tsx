import { useEffect, useRef, useState } from "react";
import { ConfettiEffect } from "./ConfettiEffect";
import { birthday } from "@/config/birthday";
import { Volume2, VolumeX, Sparkles, ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface PhotoRevealModalProps {
  isOpen: boolean;
  onProceed: () => void;
}

export function PhotoRevealModal({ isOpen, onProceed }: PhotoRevealModalProps) {
  const [countdown, setCountdown] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play the Happy Birthday song safely when modal opens
  useEffect(() => {
    if (!isOpen) return;

    setCountdown(15);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      try {
        const playPromise = audio.play();
        if (playPromise && typeof playPromise.then === "function") {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // Autoplay policy prevented playback, user can tap to play
              setIsPlaying(false);
            });
        } else {
          setIsPlaying(true);
        }
      } catch {
        setIsPlaying(false);
      }
    }

    // 10-second countdown timer before continuing
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleProceed();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      if (audio) {
        audio.pause();
      }
    };
  }, [isOpen]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        const playPromise = audio.play();
        if (playPromise && typeof playPromise.then === "function") {
          playPromise.then(() => setIsPlaying(true)).catch(() => {});
        } else {
          setIsPlaying(true);
        }
      } catch {
        // ignore play errors
      }
    }
  };

  const handleProceed = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onProceed();
  };

  return (
    <>
      <ConfettiEffect show={isOpen} duration={12000} />
      {birthday.happyBirthdayMusicSrc && (
        <audio ref={audioRef} src={birthday.happyBirthdayMusicSrc} loop preload="auto" />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            style={{ touchAction: "auto" }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 18, stiffness: 240 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-rose-200/80 bg-card/95 p-5 sm:p-6 shadow-2xl backdrop-blur-xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleProceed}
                className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-petal hover:text-primary cursor-pointer"
                aria-label="Close surprise"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-petal px-3 py-1 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> SURPRISE REVEAL 📸
                </span>
                <h2 className="mt-2 font-script text-3xl sm:text-4xl text-primary leading-tight">
                  Caught in 4K, Thangachii! 🤪💖
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  The purest, funniest & most joyful sister in the world!
                </p>
              </div>

              {/* Funny Photo Display with Framer Motion bounce */}
              <motion.div
                initial={{ scale: 0.85, rotate: -3 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 14, stiffness: 200, delay: 0.1 }}
                className="relative mx-auto my-4 overflow-hidden rounded-2xl bg-white p-3 shadow-xl border border-rose-200 max-w-[280px] sm:max-w-[310px]"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-muted shadow-inner">
                  <img
                    src={birthday.funnyPhoto}
                    alt="Funny moment with Thangachii"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <p className="mt-2.5 text-center font-script text-xl sm:text-2xl text-primary">
                  Pure Happiness & Laughter ✨
                </p>
              </motion.div>

              {/* Audio Controls */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
                <button
                  onClick={toggleAudio}
                  className="inline-flex items-center gap-1.5 rounded-full bg-petal/80 px-3.5 py-1.5 font-medium text-primary transition-all hover:bg-petal active:scale-95 cursor-pointer"
                  aria-label={isPlaying ? "Mute birthday song" : "Play birthday song"}
                >
                  {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  <span>{isPlaying ? "Birthday Music Playing 🎵" : "Tap to Play Song 🎵"}</span>
                </button>
              </div>

              {/* Action Button & Countdown */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={handleProceed}
                  className="group relative flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-primary px-6 py-3.5 text-base font-semibold text-white shadow-soft transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  <span>Explore Your Story & Memories</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-[11px] text-muted-foreground">
                  Automatically continuing in{" "}
                  <span className="font-bold text-primary">{countdown}s</span>...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
