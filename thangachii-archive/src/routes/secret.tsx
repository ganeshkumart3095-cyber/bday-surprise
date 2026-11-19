import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { birthday } from "@/config/birthday";
import { assetUrl } from "@/lib/utils";
import { FloatingBits, MusicToggle } from "@/components/birthday/parts";
import { heartBurst } from "@/components/birthday/effects";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Lock,
  ArrowLeft,
  Mail,
  Flame,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/secret")({
  head: () => ({
    meta: [
      { title: "Our Secret Memories 🔒🤍 — From Maddy" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SecretPage,
});

function SecretPage() {
  const photos = birthday.secretPhotos || [];
  const vault = birthday.secretVault;
  const [open, setOpen] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [loaded, setLoaded] = useState<Set<number>>(new Set());
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [secretPromiseIndex, setSecretPromiseIndex] = useState(0);
  const [letterOpen, setLetterOpen] = useState(true);
  const touchX = useRef(0);
  const touchY = useRef(0);

  const promises = [
    "I promise to never let go of your hand, through every season of life 🤍",
    "You are my today, my tomorrow, and every dream I want to live ✨",
    "No matter where life takes us, my heart will always be your home 🫂",
    "I loved you yesterday, I love you still, I always have, I always will ❤️💍",
  ];

  const go = (delta: number) => {
    setDirection(delta > 0 ? "next" : "prev");
    setOpen((curr) => (curr === null ? null : (curr + delta + photos.length) % photos.length));
  };

  useEffect(() => {
    if (open === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const toggleLike = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
        heartBurst(e.clientX, e.clientY, ["❤️", "💖", "💍", "✨", "🤍", "🌹"]);
      }
      return next;
    });
  };

  const triggerPromise = (e: React.MouseEvent) => {
    setSecretPromiseIndex((prev) => (prev + 1) % promises.length);
    heartBurst(e.clientX, e.clientY, ["💍", "❤️", "✨", "💖", "🕊️"]);
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#1a0f14] via-[#24121b] to-[#140b10] text-rose-50 py-12 px-4 sm:px-6">
      <FloatingBits />
      <MusicToggle autoPlay />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Navigation & Back Action */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-xs sm:text-sm font-semibold text-rose-200 shadow-soft hover:scale-105 active:scale-95 transition-all border border-white/15 backdrop-blur-md"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Celebration</span>
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-3.5 py-1 text-xs font-semibold text-rose-300 border border-rose-500/30 backdrop-blur-md">
            <Lock className="h-3 w-3 text-rose-400" />
            <span>{vault.badge}</span>
          </span>
        </div>

        {/* Romantic Lover Header Banner */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-rose-950/60 px-4 py-1.5 shadow-soft border border-rose-500/30 text-xs font-semibold uppercase tracking-widest text-rose-300 mb-4 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Written With Love By Maddy 🤍</span>
          </motion.div>
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-300 leading-tight">
            {vault.title}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-rose-200/80 max-w-xl mx-auto font-sans leading-relaxed">
            {vault.subtitle}
          </p>
        </div>

        {/* 4 Intimate Couple Memories Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 px-1">
            <Heart className="h-4 w-4 text-rose-400 fill-current" />
            <h2 className="font-script text-2xl sm:text-3xl text-rose-200">
              Our Unspoken Moments 🤍
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {photos.map((p, i) => {
              const isLoved = liked.has(i);

              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  aria-label={`View memory: ${p.caption}`}
                  onClick={() => setOpen(i)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(i)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-rose-500/20 bg-rose-950/40 shadow-2xl transition-all duration-300 hover:shadow-rose-900/40 hover:-translate-y-1.5 hover:border-rose-400/50 focus-visible:ring-4 focus-visible:ring-ring focus:outline-none cursor-pointer h-[420px] sm:h-[460px] backdrop-blur-md"
                >
                  {/* Ambient Blurred Backdrop */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-cover bg-center blur-2xl opacity-25 scale-125 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundImage: `url(${p.src})` }}
                  />

                  {/* Card Header */}
                  <div className="relative z-20 flex items-center justify-between p-4 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold tracking-wider text-rose-200 uppercase backdrop-blur-md border border-white/10 shadow-sm">
                      <Lock className="h-3 w-3 text-rose-400" />
                      MEM #{0}
                      {i + 1}
                    </span>

                    {/* Heart Reaction Button */}
                    <button
                      type="button"
                      aria-label={isLoved ? "Remove like" : "Like this memory"}
                      onClick={(e) => toggleLike(e, i)}
                      className={`pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md shadow-xs transition-transform duration-300 active:scale-125 hover:scale-115 focus:outline-none cursor-pointer ${
                        isLoved
                          ? "bg-rose-500 text-white shadow-rose-500/50 shadow-md"
                          : "bg-black/60 text-rose-200/80 hover:text-rose-400 hover:bg-black/80 border border-white/15"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isLoved ? "fill-current" : "stroke-current"}`} />
                    </button>
                  </div>

                  {/* Image Display (GUARANTEED ZERO CROPPING) */}
                  <div className="relative z-10 flex flex-1 min-h-0 w-full items-center justify-center px-4 py-2 overflow-hidden">
                    {!loaded.has(i) && (
                      <div className="flex h-full w-full items-center justify-center animate-pulse">
                        <span className="text-3xl">🤍</span>
                      </div>
                    )}
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                      onLoad={() => setLoaded((prev) => new Set(prev).add(i))}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = assetUrl("/images/photo1.jpg");
                        setLoaded((prev) => new Set(prev).add(i));
                      }}
                      className={`max-h-full max-w-full w-auto h-auto object-contain rounded-2xl drop-shadow-md select-none transition-all duration-500 group-hover:scale-[1.03] ${
                        loaded.has(i) ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>

                  {/* Romantic Caption Bar */}
                  <div className="relative z-20 w-full bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 pt-4 rounded-b-3xl border-t border-white/5">
                    <p className="font-script text-xl sm:text-2xl text-rose-100 font-medium leading-snug line-clamp-2">
                      {p.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lover's Heartfelt Romantic Love Letter */}
        <div className="mb-16 overflow-hidden rounded-3xl bg-gradient-to-b from-[#2a1320] via-[#200e18] to-[#180912] border border-rose-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6 border-b border-rose-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Mail className="h-5 w-5 text-rose-400" />
              <h2 className="font-script text-3xl sm:text-4xl text-rose-100">
                A Letter From Maddy 💌
              </h2>
            </div>
            <button
              onClick={() => setLetterOpen((prev) => !prev)}
              className="text-xs font-semibold text-rose-300 hover:text-white transition-colors cursor-pointer"
            >
              {letterOpen ? "Collapse" : "Open"}
            </button>
          </div>

          <AnimatePresence>
            {letterOpen && (
              <motion.article
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4 text-rose-100/90 leading-relaxed font-sans text-sm sm:text-base"
              >
                {vault.letter.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={`${
                      idx === 0
                        ? "font-script text-3xl sm:text-4xl text-rose-300 font-semibold mb-3"
                        : "leading-relaxed"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
                <div className="pt-6 border-t border-rose-500/20 text-right">
                  <p className="font-script text-2xl sm:text-3xl text-rose-300 font-semibold">
                    {vault.signature}
                  </p>
                  <p className="text-xs text-rose-400 mt-1 uppercase tracking-widest font-mono">
                    En Uyire · Forever Yours, Maddy 🤍💍
                  </p>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive Secret Promise Card */}
        <div className="text-center rounded-3xl bg-rose-950/40 p-8 shadow-2xl border border-rose-500/30 backdrop-blur-md">
          <button
            type="button"
            onClick={triggerPromise}
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-7 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Flame className="h-4 w-4 animate-bounce" />
            <span>Tap for a Secret Promise 💍</span>
          </button>
          <div className="mt-5 min-h-[44px] flex items-center justify-center">
            <motion.p
              key={secretPromiseIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-script text-2xl sm:text-3xl text-rose-200"
            >
              "{promises[secretPromiseIndex]}"
            </motion.p>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-6 py-2.5 text-xs sm:text-sm font-semibold text-rose-200 transition-all hover:scale-105 active:scale-95 border border-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Anna's Birthday Story 🌸</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Res Lightbox Modal */}
      {open !== null && photos[open] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Secret memory viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 md:p-6 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0]?.clientX ?? 0;
            touchY.current = e.touches[0]?.clientY ?? 0;
          }}
          onTouchEnd={(e) => {
            const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
            const dy = (e.changedTouches[0]?.clientY ?? 0) - touchY.current;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
              go(dx < 0 ? 1 : -1);
            }
            if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
              setOpen(null);
            }
          }}
        >
          <div
            key={open}
            onClick={(e) => e.stopPropagation()}
            className={`relative max-h-[92vh] max-w-xl w-full flex flex-col items-center rounded-3xl bg-[#1e0e17] border border-rose-500/30 p-4 sm:p-5 shadow-2xl animate-in zoom-in-95 duration-300 ${
              direction === "next" ? "slide-in-from-right-8" : "slide-in-from-left-8"
            }`}
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute right-3.5 top-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-rose-200 shadow-soft transition-transform hover:scale-110 active:scale-95 focus:outline-none cursor-pointer border border-white/20"
            >
              <X className="h-4 w-4" />
            </button>

            {/* High-Res Photo Container (Zero Cropping) */}
            <div className="relative flex max-h-[64vh] w-full items-center justify-center overflow-hidden rounded-2xl bg-black/40 p-2">
              <img
                src={photos[open].src}
                alt={photos[open].alt}
                className="max-h-[62vh] w-auto max-w-full rounded-xl object-contain shadow-sm"
              />
            </div>

            {/* Caption & Interaction */}
            <div className="mt-4 flex w-full flex-col items-center px-4 text-center">
              <figcaption className="font-script text-2xl text-rose-200 sm:text-3xl">
                {photos[open].caption}
              </figcaption>
              <div className="mt-1.5 flex items-center gap-4 text-xs sm:text-sm text-rose-300/70">
                <span className="font-medium">
                  {open + 1} of {photos.length}
                </span>
                <span>•</span>
                <button
                  type="button"
                  onClick={(e) => toggleLike(e, open)}
                  className={`flex items-center gap-1.5 transition-transform active:scale-125 focus:outline-none cursor-pointer ${
                    liked.has(open) ? "text-rose-400 font-semibold" : "hover:text-rose-300"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${liked.has(open) ? "fill-rose-500 stroke-rose-500" : "stroke-current"}`}
                  />
                  <span>{liked.has(open) ? "Loved 💖" : "Love this"}</span>
                </button>
              </div>
            </div>

            {/* Navigation Arrows */}
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/80 text-white shadow-soft transition-transform hover:scale-110 active:scale-95 focus:outline-none border border-white/20 cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/80 text-white shadow-soft transition-transform hover:scale-110 active:scale-95 focus:outline-none border border-white/20 cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
