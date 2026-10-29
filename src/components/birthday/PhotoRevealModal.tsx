import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ConfettiEffect } from "./ConfettiEffect";
import { birthday } from "@/config/birthday";
import { Volume2, VolumeX, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface PhotoRevealModalProps {
  isOpen: boolean;
  onProceed: () => void;
}

export function PhotoRevealModal({ isOpen, onProceed }: PhotoRevealModalProps) {
  const [countdown, setCountdown] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play the Happy Birthday song when the modal opens
  useEffect(() => {
    if (!isOpen) return;

    setCountdown(10);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay policy fallback
          setIsPlaying(false);
        });
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
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
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

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) handleProceed();
        }}
      >
        <DialogContent
          className="max-w-md border-rose-200/80 bg-card/95 p-5 sm:p-6 shadow-2xl backdrop-blur-xl text-center rounded-3xl animate-in zoom-in-95 duration-300"
          style={{ touchAction: "auto" }}
        >
          <DialogHeader className="flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-petal px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> SURPRISE REVEAL 📸
            </span>
            <DialogTitle className="mt-2 font-script text-3xl sm:text-4xl text-primary">
              Caught in 4K, Thangachii! 🤪💖
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Here&apos;s to the most fun, joyful, and precious sister!
            </p>
          </DialogHeader>

          {/* Funny Photo Display with Framer Motion bounce */}
          <motion.div
            initial={{ scale: 0.7, rotate: -3, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 220 }}
            className="relative mx-auto my-3 overflow-hidden rounded-2xl bg-white p-2.5 shadow-xl border border-rose-200 max-w-[280px] sm:max-w-[320px]"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
              <img
                src={birthday.funnyPhoto}
                alt="Funny moment with Thangachii"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <p className="mt-2 text-center font-script text-lg sm:text-xl text-primary">
              Pure Happiness & Laughter ✨
            </p>
          </motion.div>

          {/* Audio State / Control */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <button
              onClick={toggleAudio}
              className="inline-flex items-center gap-1.5 rounded-full bg-petal/80 px-3 py-1 font-medium text-primary transition-colors hover:bg-petal"
              aria-label={isPlaying ? "Mute birthday song" : "Play birthday song"}
            >
              {isPlaying ? (
                <Volume2 className="h-3.5 w-3.5" />
              ) : (
                <VolumeX className="h-3.5 w-3.5" />
              )}
              <span>{isPlaying ? "Birthday Music Playing 🎵" : "Tap to Play Song 🎵"}</span>
            </button>
          </div>

          {/* Action Button & Countdown */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <button
              onClick={handleProceed}
              className="group relative flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-primary px-6 py-3.5 text-base font-semibold text-white shadow-soft transition-all hover:scale-[1.02] active:scale-98"
            >
              <span>Explore Your Story & Memories</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-[11px] text-muted-foreground">
              Automatically continuing in{" "}
              <span className="font-bold text-primary">{countdown}s</span>...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
