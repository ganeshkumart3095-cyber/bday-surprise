import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { confetti, heartBurst } from "./effects";
import { Sparkles, Cake } from "lucide-react";

interface CakeCuttingProps {
  onComplete: () => void;
}

export function CakeCuttingInteraction({ onComplete }: CakeCuttingProps) {
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isCut, setIsCut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const maxDrag = 140;

  const handleDrag = (
    _: unknown,
    info: { point: { x: number; y: number }; offset: { y: number } },
  ) => {
    if (isCut) return;
    const currentY = Math.max(0, Math.min(info.offset.y, maxDrag));
    const currentProgress = Math.round((currentY / maxDrag) * 100);
    setProgress(currentProgress);

    // Responsive trigger threshold
    if (currentProgress >= 35 || info.offset.y >= 40) {
      triggerCutSuccess();
    }
  };

  const triggerCutSuccess = () => {
    if (isCut) return;
    setIsCut(true);
    setProgress(100);

    // Haptic feedback if supported on mobile
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate([40, 60, 100]);
      } catch {
        // Ignore vibration errors
      }
    }

    confetti(160);
    setTimeout(() => {
      onComplete();
    }, 900);
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-3xl bg-card/90 p-6 sm:p-8 shadow-soft border border-border/60 backdrop-blur-md select-none text-center"
      style={{ touchAction: "none" }}
    >
      {/* Title */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-petal px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Special Moment
        </span>
        <h3 className="mt-2 font-script text-3xl sm:text-4xl text-primary">
          {isCut ? "Happy Birthday, Thangachii! 🎂🎉" : "Make a Wish & Cut the Cake!"}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          {isCut
            ? "Revealing your birthday surprise... ✨"
            : "Swipe the ceremonial knife down across the cake ↓"}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-5 w-full max-w-xs">
        <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1">
          <span>{isCut ? "Sliced!" : "Cutting Progress"}</span>
          <span className="font-bold text-primary">{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-petal">
          <div
            className="h-full bg-gradient-to-r from-rose-400 to-primary transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Cake Stage */}
      <div
        className="relative flex h-64 w-72 items-center justify-center cursor-pointer"
        onClick={() => {
          if (!isCut) triggerCutSuccess();
        }}
      >
        {/* Glow behind cake */}
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />

        {/* The Tiered Cake (Splits when isCut is true) */}
        <div className="relative flex items-center justify-center">
          {/* Left Cake Half */}
          <motion.div
            animate={
              isCut ? { x: -34, rotate: -4, opacity: 0.95 } : { x: 0, rotate: 0, opacity: 1 }
            }
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="relative overflow-hidden w-28 h-52 flex flex-col items-end justify-end pr-[1px]"
          >
            {/* Candles Top */}
            <div className="flex gap-3 pr-2 mb-1">
              <div className="flex flex-col items-center">
                <div
                  className={`h-4 w-2 rounded-full bg-amber-400 blur-[1px] ${isCut ? "opacity-20" : "animate-pulse"}`}
                />
                <div className="h-5 w-1.5 bg-gradient-to-b from-rose-300 to-rose-400 rounded-t" />
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`h-5 w-2.5 rounded-full bg-amber-300 blur-[1px] ${isCut ? "opacity-20" : "animate-pulse"}`}
                />
                <div className="h-7 w-2 bg-gradient-to-b from-rose-200 to-rose-400 rounded-t" />
              </div>
            </div>

            {/* Top Tier */}
            <div className="w-20 h-12 bg-gradient-to-r from-rose-200 via-rose-100 to-rose-50 rounded-tl-xl border-l border-t border-rose-300/60 shadow-inner relative">
              <div className="absolute top-0 right-0 w-full h-3 bg-white/70 rounded-tl-xl" />
              <div className="absolute top-2 left-2 text-xs">🍓</div>
            </div>

            {/* Middle Tier */}
            <div className="w-24 h-16 bg-gradient-to-r from-rose-300 via-rose-200 to-rose-100 rounded-tl-2xl border-l border-t border-rose-400/50 shadow-inner relative">
              <div className="absolute top-0 right-0 w-full h-4 bg-white/80 rounded-tl-2xl" />
              <div className="absolute top-3 left-3 text-xs">✨</div>
              <div className="absolute bottom-2 left-4 text-xs">🌸</div>
            </div>

            {/* Bottom Tier */}
            <div className="w-28 h-20 bg-gradient-to-r from-rose-400 via-rose-300 to-rose-200 rounded-tl-3xl border-l border-t border-rose-500/50 shadow-inner relative">
              <div className="absolute top-0 right-0 w-full h-5 bg-white/80 rounded-tl-3xl" />
              <div className="absolute bottom-3 left-6 text-xs">💖</div>
            </div>

            {/* Stand Base */}
            <div className="w-32 h-3 bg-amber-100/90 rounded-l-full border border-amber-200/60 shadow-sm" />
          </motion.div>

          {/* Sliced Cut Gap Indicator */}
          <div className="relative w-1 h-52 flex flex-col justify-end items-center z-10">
            {!isCut && (
              <div
                className="w-0.5 bg-dashed border-l border-dashed border-primary/60 transition-all duration-75"
                style={{ height: `${Math.max(10, progress)}%` }}
              />
            )}
          </div>

          {/* Right Cake Half */}
          <motion.div
            animate={isCut ? { x: 34, rotate: 4, opacity: 0.95 } : { x: 0, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="relative overflow-hidden w-28 h-52 flex flex-col items-start justify-end pl-[1px]"
          >
            {/* Candles Top */}
            <div className="flex gap-3 pl-2 mb-1">
              <div className="flex flex-col items-center">
                <div
                  className={`h-5 w-2.5 rounded-full bg-amber-300 blur-[1px] ${isCut ? "opacity-20" : "animate-pulse"}`}
                />
                <div className="h-7 w-2 bg-gradient-to-b from-rose-200 to-rose-400 rounded-t" />
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`h-4 w-2 rounded-full bg-amber-400 blur-[1px] ${isCut ? "opacity-20" : "animate-pulse"}`}
                />
                <div className="h-5 w-1.5 bg-gradient-to-b from-rose-300 to-rose-400 rounded-t" />
              </div>
            </div>

            {/* Top Tier */}
            <div className="w-20 h-12 bg-gradient-to-l from-rose-200 via-rose-100 to-rose-50 rounded-tr-xl border-r border-t border-rose-300/60 shadow-inner relative">
              <div className="absolute top-0 left-0 w-full h-3 bg-white/70 rounded-tr-xl" />
              <div className="absolute top-2 right-2 text-xs">🍓</div>
            </div>

            {/* Middle Tier */}
            <div className="w-24 h-16 bg-gradient-to-l from-rose-300 via-rose-200 to-rose-100 rounded-tr-2xl border-r border-t border-rose-400/50 shadow-inner relative">
              <div className="absolute top-0 left-0 w-full h-4 bg-white/80 rounded-tr-2xl" />
              <div className="absolute top-3 right-3 text-xs">✨</div>
              <div className="absolute bottom-2 right-4 text-xs">🌸</div>
            </div>

            {/* Bottom Tier */}
            <div className="w-28 h-20 bg-gradient-to-l from-rose-400 via-rose-300 to-rose-200 rounded-tr-3xl border-r border-t border-rose-500/50 shadow-inner relative">
              <div className="absolute top-0 left-0 w-full h-5 bg-white/80 rounded-tr-3xl" />
              <div className="absolute bottom-3 right-6 text-xs">💖</div>
            </div>

            {/* Stand Base */}
            <div className="w-32 h-3 bg-amber-100/90 rounded-r-full border border-amber-200/60 shadow-sm" />
          </motion.div>
        </div>

        {/* Draggable Ceremonial Knife */}
        <AnimatePresence>
          {!isCut && (
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: maxDrag }}
              dragElastic={0.05}
              onDrag={handleDrag}
              onDragEnd={(_: unknown, info: { offset: { y: number } }) => {
                if (info.offset.y > 20 || progress > 20) {
                  triggerCutSuccess();
                }
              }}
              style={{ touchAction: "none" }}
              className="absolute top-2 z-30 flex cursor-grab active:cursor-grabbing flex-col items-center filter drop-shadow-xl"
            >
              {/* Knife Blade & Sparkle */}
              <div className="relative flex flex-col items-center">
                {/* Knife Handle */}
                <div className="h-10 w-4 rounded-t-md bg-gradient-to-b from-amber-600 via-amber-500 to-amber-700 border border-amber-300 shadow-md flex items-center justify-center">
                  <span className="text-[10px]">✨</span>
                </div>
                {/* Knife Guard */}
                <div className="h-2 w-7 rounded-sm bg-amber-400 shadow-sm" />
                {/* Knife Blade */}
                <div className="h-20 w-3 rounded-b-md bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 border-x border-b border-slate-300 shadow-lg relative flex justify-center">
                  <div className="w-0.5 h-full bg-white/80" />
                </div>
                {/* Glowing Drag Tip Prompt */}
                <div className="mt-1 flex items-center gap-1 rounded-full bg-primary/95 px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-md animate-bounce">
                  <span>Swipe Down 🔪</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Celebratory message when cut */}
      {isCut && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 font-script text-2xl text-primary animate-pulse"
        >
          🎉 Cake sliced! Loading your surprise... 🎁
        </motion.p>
      )}

      {/* Alternative Tap Action (Ensures 100% accessibility on any screen) */}
      {!isCut && (
        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={(e) => {
              heartBurst(e.clientX, e.clientY);
              triggerCutSuccess();
            }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-primary px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Cake className="h-4 w-4" /> Tap to Slice the Cake
          </button>
          <span className="mt-1 text-[11px] text-muted-foreground">
            (You can swipe the knife or simply tap above)
          </span>
        </div>
      )}
    </div>
  );
}
