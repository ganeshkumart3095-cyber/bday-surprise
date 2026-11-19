import { useEffect, useMemo, useRef, useState } from "react";
import { birthday } from "@/config/birthday";
import { assetUrl } from "@/lib/utils";
import { confetti, heartBurst } from "./effects";
import { Reveal } from "./parts";
import { ConfettiEffect } from "./ConfettiEffect";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Cake,
  RotateCcw,
  Play,
  Film,
} from "lucide-react";

export function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal className="mb-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rosegold">{kicker}</p>
      <h2 className="font-script text-5xl text-primary md:text-6xl">{title}</h2>
    </Reveal>
  );
}

/* ---------- Realistic SVG Candle Flame Component ---------- */
function CandleFlame({ blown }: { blown: boolean }) {
  if (blown) {
    return (
      <div className="relative flex flex-col items-center">
        <span className="smoke-anim pointer-events-none text-base">💨</span>
        <div className="h-1.5 w-0.5 rounded-full bg-muted-foreground/60" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center flame-anim">
      {/* Warm ambient flame glow */}
      <div className="absolute -inset-2 rounded-full bg-amber-400/30 blur-xs pointer-events-none" />
      <svg width="18" height="26" viewBox="0 0 18 26" fill="none" className="drop-shadow-sm">
        {/* Outer Orange/Gold Flame */}
        <path
          d="M9 0C9 0 16 7.5 16 15C16 19.5 12.8 24 9 24C5.2 24 2 19.5 2 15C2 7.5 9 0 9 0Z"
          fill="url(#outerFlame)"
        />
        {/* Inner Yellow Core */}
        <path
          d="M9 6C9 6 13.5 11 13.5 16C13.5 19 11.5 22 9 22C6.5 22 4.5 19 4.5 16C4.5 11 9 6 9 6Z"
          fill="url(#innerFlame)"
        />
        {/* Hot White-Yellow Center */}
        <path
          d="M9 13C9 13 11 15.5 11 18C11 19.5 10 21 9 21C8 21 7 19.5 7 18C7 15.5 9 13 9 13Z"
          fill="#FFFFFF"
        />
        <defs>
          <linearGradient
            id="outerFlame"
            x1="9"
            y1="0"
            x2="9"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF7A00" />
            <stop offset="0.6" stopColor="#FFAE00" />
            <stop offset="1" stopColor="#FF4500" />
          </linearGradient>
          <linearGradient
            id="innerFlame"
            x1="9"
            y1="6"
            x2="9"
            y2="22"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFF275" />
            <stop offset="1" stopColor="#FFBA08" />
          </linearGradient>
        </defs>
      </svg>
      {/* Candle Wick */}
      <div className="h-2 w-0.5 rounded-full bg-foreground/70" />
    </div>
  );
}

/* ---------- Exquisite Tiered Celebration Cake Component ---------- */
export function CelebrationCake({
  blown,
  onBlow,
  onRelight,
}: {
  blown: boolean;
  onBlow: (e: React.MouseEvent) => void;
  onRelight: () => void;
}) {
  return (
    <div className="relative mx-auto flex flex-col items-center select-none">
      {/* 3 Striped Birthday Candles */}
      <div className="relative z-20 flex items-end justify-center gap-7 pb-1">
        {/* Left Candle */}
        <div
          onClick={!blown ? onBlow : undefined}
          className={`flex flex-col items-center cursor-pointer transition-transform ${!blown ? "hover:scale-110" : ""}`}
        >
          <CandleFlame blown={blown} />
          <div className="h-10 w-3 rounded-t-sm bg-linear-to-b from-lavender via-pink-200 to-lavender shadow-xs border-x border-t border-rose/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(255,255,255,0.7)_3px,rgba(255,255,255,0.7)_6px)]" />
          </div>
        </div>

        {/* Center Tall Candle */}
        <div
          onClick={!blown ? onBlow : undefined}
          className={`flex flex-col items-center cursor-pointer transition-transform ${!blown ? "hover:scale-110" : ""}`}
        >
          <CandleFlame blown={blown} />
          <div className="h-13 w-3.5 rounded-t-sm bg-linear-to-b from-peach via-amber-100 to-peach shadow-xs border-x border-t border-amber-300/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(255,255,255,0.7)_3px,rgba(255,255,255,0.7)_6px)]" />
          </div>
        </div>

        {/* Right Candle */}
        <div
          onClick={!blown ? onBlow : undefined}
          className={`flex flex-col items-center cursor-pointer transition-transform ${!blown ? "hover:scale-110" : ""}`}
        >
          <CandleFlame blown={blown} />
          <div className="h-10 w-3 rounded-t-sm bg-linear-to-b from-mint via-teal-100 to-mint shadow-xs border-x border-t border-emerald-300/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(255,255,255,0.7)_3px,rgba(255,255,255,0.7)_6px)]" />
          </div>
        </div>
      </div>

      {/* Top Tier: Creamy Rose-Vanilla Cake */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Piped Cream Rosettes & Strawberries on Top Rim */}
        <div className="relative -mb-2 flex w-44 justify-between px-2 z-20">
          <span className="text-xl -mt-1 drop-shadow-xs">🍓</span>
          <div className="flex gap-2.5">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="h-3.5 w-3.5 rounded-full bg-white shadow-xs border border-pink-100"
              />
            ))}
          </div>
          <span className="text-xl -mt-1 drop-shadow-xs">🍓</span>
        </div>

        {/* Top Tier Body */}
        <div className="relative h-18 w-44 rounded-t-2xl bg-linear-to-b from-[#fff5f7] via-[#ffdbe3] to-[#ffb8c7] shadow-md border-x border-t border-rose/30 overflow-hidden">
          {/* Frosting Drips from Top */}
          <div className="flex justify-around">
            {[14, 20, 12, 22, 16, 18, 12].map((h, i) => (
              <div
                key={i}
                className="w-5 bg-white/95 rounded-b-full shadow-xs"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
          {/* Colorful Sugar Sprinkles */}
          <div className="absolute bottom-2 inset-x-2 flex justify-around">
            <span className="h-1 w-2 rounded-full sprinkle-yellow rotate-12" />
            <span className="h-1.5 w-1.5 rounded-full sprinkle-mint -rotate-45" />
            <span className="h-1 w-2.5 rounded-full sprinkle-blue rotate-45" />
            <span className="h-1.5 w-1.5 rounded-full sprinkle-pink rotate-12" />
            <span className="h-1 w-2 rounded-full sprinkle-yellow -rotate-30" />
            <span className="h-1.5 w-1.5 rounded-full sprinkle-mint rotate-60" />
          </div>
        </div>
      </div>

      {/* Bottom Tier: Strawberry-Peach Celebration Sponge */}
      <div className="relative -mt-1 z-0 flex flex-col items-center">
        {/* Whipped Cream Ribbon between Tiers */}
        <div className="flex w-64 justify-around px-2 relative z-10 -mb-2">
          {[...Array(9)].map((_, i) => (
            <span
              key={i}
              className="h-4 w-5 rounded-full bg-white shadow-xs border border-rose/20"
            />
          ))}
        </div>

        {/* Bottom Tier Body */}
        <div className="relative h-22 w-64 rounded-t-2xl bg-linear-to-b from-[#ffd3dc] via-[#fba9bc] to-[#f47f9b] shadow-lg border-x border-t border-rose/40 overflow-hidden">
          {/* White Chocolate Dripping Icing */}
          <div className="flex justify-around">
            {[18, 26, 15, 28, 20, 24, 16, 26, 18].map((h, i) => (
              <div
                key={i}
                className="w-6 bg-white/95 rounded-b-full shadow-xs"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>

          {/* Pearl Accents and Sprinkles */}
          <div className="absolute bottom-2.5 inset-x-3 flex justify-around items-center">
            <span className="h-2 w-2 rounded-full bg-white shadow-xs" />
            <span className="h-1.5 w-3 rounded-full sprinkle-yellow rotate-30" />
            <span className="h-2 w-2 rounded-full bg-white shadow-xs" />
            <span className="h-1.5 w-2.5 rounded-full sprinkle-blue -rotate-12" />
            <span className="h-2 w-2 rounded-full bg-white shadow-xs" />
            <span className="h-1.5 w-3 rounded-full sprinkle-mint rotate-45" />
            <span className="h-2 w-2 rounded-full bg-white shadow-xs" />
          </div>
        </div>
      </div>

      {/* Scalloped Cake Pedestal Plate */}
      <div className="relative -mt-1 flex flex-col items-center z-10">
        <div className="h-5 w-76 md:w-84 rounded-full bg-linear-to-r from-cream via-white to-cream shadow-md border border-rosegold/30 flex items-center justify-around px-4">
          {[...Array(14)].map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-rosegold/30" />
          ))}
        </div>
        {/* Stand Base */}
        <div className="h-6 w-28 bg-linear-to-b from-cream to-peach/50 rounded-b-2xl shadow-inner border-x border-b border-rosegold/20" />
      </div>

      {/* Interactive Controls */}
      <div className="mt-8 flex flex-col items-center gap-3">
        {!blown ? (
          <button
            onClick={onBlow}
            className="group flex items-center gap-2.5 rounded-full bg-linear-to-r from-primary to-rose px-8 py-3.5 text-lg font-semibold text-white shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 cursor-pointer"
          >
            <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
            <span>Close your eyes, make a wish & blow 🌬️</span>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-500">
            <div className="rounded-full bg-card/90 px-6 py-2 shadow-soft border border-border/60">
              <p className="font-script text-3xl md:text-4xl text-primary">
                Your wish is on its way to the stars ✨
              </p>
            </div>
            <button
              onClick={onRelight}
              className="flex items-center gap-2 rounded-full bg-card px-5 py-2 text-sm font-semibold text-foreground shadow-soft border border-border/50 transition-all hover:bg-muted/80 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4 text-primary" />
              <span>Relight candles & wish again 🕯️</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Gallery: Modern Bento Grid + Zero Cropping + Next-Gen Lightbox ---------- */
type BentoType = "big" | "tall" | "normal";

const getBentoType = (i: number): BentoType => {
  // Featured BIG cards (2 cols, 2 rows):
  // 0: photo1 - "The day it all began 💕" (BIG 1)
  // 3: photo5 - 1080x1080 square "Festival vibes ✨" (BIG)
  // 8: photo10 - "The best cake thief 🎂"
  // 11: photo13 - "Family photo — you stole the show"
  // 16: photo20 - "College days & golden friendships 💕"
  // 21: photo25 - "Forever proud of you, Princess 👑💯"
  // 24: photo28 - "Thumbs up with Pookie bows"
  // 29: photo33 - "Floral grace & golden hour glow"
  // 33: photo37 - "Saree elegance <3"
  // 34: photo38 - "Peacock rangoli celebration with school squad"
  // 36: photo40 - "Sunny beach day with best friends"
  // 39: photo43 - "Iconic golden sunset silhouette"
  if ([0, 3, 8, 11, 16, 21, 24, 29, 33, 34, 36, 39].includes(i)) {
    return "big";
  }

  // TALL cards (1 col, 2 rows for tall phone screenshots & portraits):
  // 1: photo2 (1080x2340)
  // 2: photo4 (963x1280)
  // 5: photo7 (720x1561)
  // 13: photo15 (900x1600 proud Anna)
  // 14: photo16 (720x1561 late night talks)
  // 15: photo17 (720x1600 graduation glow)
  // 27: photo31 (899x1599 panda filter)
  // 28: photo32 (899x1599 classroom)
  // 30: photo34 (899x1599 pretty in pink)
  // 31: photo35 (1080x1920 flower in hair)
  // 41: photo45 (720x1600 purple gown with teddy bear)
  // 42: photo46 (519x1152 pure innocence)
  if ([1, 2, 5, 13, 14, 15, 27, 28, 30, 31, 41, 42].includes(i)) {
    return "tall";
  }

  // STANDARD cards (1 col, 1 row):
  return "normal";
};

const getBentoSpan = (type: BentoType) => {
  switch (type) {
    case "big":
      return "col-span-2 row-span-2";
    case "tall":
      return "col-span-1 row-span-2";
    case "normal":
    default:
      return "col-span-1 row-span-1";
  }
};

export function Gallery() {
  const photos = birthday.photos;
  const [open, setOpen] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [loaded, setLoaded] = useState<Set<number>>(new Set());
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const touchX = useRef(0);
  const touchY = useRef(0);

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
        heartBurst(e.clientX, e.clientY, ["💖", "💗", "✨", "🌸"]);
      }
      return next;
    });
  };

  return (
    <>
      {/* Modern Bento Grid with dense packing and zero image cropping */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 auto-rows-[190px] sm:auto-rows-[220px] md:auto-rows-[250px] lg:auto-rows-[260px] grid-flow-dense">
        {photos.map((p, i) => {
          const bentoType = getBentoType(i);
          const isLoved = liked.has(i);

          return (
            <div
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => setOpen(i)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(i)}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl md:rounded-3xl border border-border/50 bg-card/85 shadow-soft transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/40 focus-visible:ring-4 focus-visible:ring-ring focus:outline-none cursor-pointer ${getBentoSpan(
                bentoType,
              )}`}
            >
              {/* Ambient Blurred Backdrop using the exact photo's color tones */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center blur-2xl opacity-25 scale-125 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                style={{ backgroundImage: `url(${p.src})` }}
              />

              {/* Card Header: Memory tag badge + Featured label + Quick Heart Button */}
              <div className="relative z-20 flex items-center justify-between p-3 sm:p-3.5 pointer-events-none">
                <div className="flex items-center gap-1.5 pointer-events-auto">
                  <span className="inline-flex items-center gap-1 rounded-full bg-background/85 px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold tracking-wider text-muted-foreground uppercase backdrop-blur-md border border-border/50 shadow-2xs">
                    {bentoType === "big" && (
                      <Sparkles className="h-3 w-3 text-amber-500 fill-amber-400" />
                    )}
                    MEM #{(i + 1).toString().padStart(2, "0")}
                  </span>
                  {bentoType === "big" && (
                    <span className="hidden sm:inline-flex items-center rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-semibold tracking-wide backdrop-blur-md border border-primary/20">
                      Featured
                    </span>
                  )}
                </div>

                {/* Direct Quick Heart Reaction Button */}
                <button
                  type="button"
                  aria-label={isLoved ? "Remove like" : "Like this photo"}
                  onClick={(e) => toggleLike(e, i)}
                  className={`pointer-events-auto flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full backdrop-blur-md shadow-xs transition-transform duration-300 active:scale-125 hover:scale-115 focus:outline-none cursor-pointer ${
                    isLoved
                      ? "bg-rose-500 text-white shadow-rose-500/30 shadow-sm"
                      : "bg-background/85 text-foreground/60 hover:text-rose-500 hover:bg-background border border-border/50"
                  }`}
                >
                  <Heart
                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isLoved ? "fill-current" : "stroke-current"}`}
                  />
                </button>
              </div>

              {/* Photo Display: GUARANTEED ZERO CROPPING (entire photo 100% visible) */}
              <div className="relative z-10 flex flex-1 min-h-0 w-full items-center justify-center px-2.5 py-1 overflow-hidden">
                {!loaded.has(i) && (
                  <div className="flex h-full w-full items-center justify-center animate-pulse">
                    <span className="text-3xl">🌸</span>
                  </div>
                )}
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  onLoad={() => setLoaded((prev) => new Set(prev).add(i))}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = assetUrl("/images/photo.jpg");
                    setLoaded((prev) => new Set(prev).add(i));
                  }}
                  className={`max-h-full max-w-full w-auto h-auto object-contain rounded-xl drop-shadow-md select-none transition-all duration-500 group-hover:scale-[1.03] ${
                    loaded.has(i) ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Sleek Frosted Glass Caption Chin */}
              <div className="relative z-20 w-full bg-gradient-to-t from-background/95 via-background/80 to-transparent p-3 pt-3 sm:p-3.5 sm:pt-4 rounded-b-2xl md:rounded-b-3xl">
                <p className="font-script text-lg sm:text-xl text-foreground font-medium leading-snug line-clamp-1 group-hover:line-clamp-2 transition-all">
                  {p.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cinematic Responsive Lightbox with Thumbnail Filmstrip */}
      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/85 p-3 md:p-4 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0]?.clientX ?? 0;
            touchY.current = e.touches[0]?.clientY ?? 0;
          }}
          onTouchEnd={(e) => {
            const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
            const dy = (e.changedTouches[0]?.clientY ?? 0) - touchY.current;
            // Horizontal swipe changes photo
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
              go(dx < 0 ? 1 : -1);
            }
            // Vertical swipe-down dismisses modal
            if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
              setOpen(null);
            }
          }}
        >
          {/* Card Presentation with Direction-Aware Transition */}
          <div
            key={open}
            onClick={(e) => e.stopPropagation()}
            className={`relative max-h-[94vh] max-w-xl w-full flex flex-col items-center rounded-2xl bg-card p-3 md:p-4 pb-4 shadow-2xl animate-in zoom-in-95 duration-300 ${
              direction === "next" ? "slide-in-from-right-8" : "slide-in-from-left-8"
            }`}
          >
            {/* High-Res Photo Container */}
            <div className="relative flex max-h-[64vh] w-full items-center justify-center overflow-hidden rounded-xl bg-black/5">
              <img
                src={photos[open]!.src}
                alt={photos[open]!.alt}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = assetUrl("/images/photo.jpg");
                }}
                className="max-h-[64vh] w-auto max-w-full rounded-lg object-contain shadow-sm"
              />
            </div>

            {/* Caption & Interactive Loved Reaction */}
            <div className="mt-3 flex w-full flex-col items-center px-4 text-center">
              <figcaption className="font-script text-2xl text-primary md:text-3xl">
                {photos[open]!.caption}
              </figcaption>
              <div className="mt-1 flex items-center gap-4 text-xs md:text-sm text-muted-foreground">
                <span className="font-medium">
                  {open + 1} of {photos.length}
                </span>
                <span>•</span>
                <button
                  type="button"
                  onClick={(e) => toggleLike(e, open)}
                  className={`flex items-center gap-1.5 transition-transform active:scale-125 focus:outline-none cursor-pointer ${
                    liked.has(open) ? "text-primary font-semibold" : "hover:text-primary"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${liked.has(open) ? "fill-primary stroke-primary" : "stroke-current"}`}
                  />
                  <span>{liked.has(open) ? "Loved" : "Love this"}</span>
                </button>
              </div>
            </div>

            {/* Thumbnail Filmstrip: Jump directly to any memory */}
            <div className="mt-3 flex w-full max-w-md items-center gap-2 overflow-x-auto py-1 px-2 no-scrollbar justify-start sm:justify-center">
              {photos.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection(idx > open ? "next" : "prev");
                    setOpen(idx);
                  }}
                  className={`relative flex-shrink-0 h-10 w-8 md:h-12 md:w-9 overflow-hidden rounded-md transition-all duration-200 cursor-pointer ${
                    idx === open
                      ? "ring-2 ring-primary ring-offset-1 scale-105 opacity-100"
                      : "opacity-40 hover:opacity-80"
                  }`}
                >
                  <img src={thumb.src} alt="" className="h-full w-full object-cover" />
                  {liked.has(idx) && (
                    <span className="absolute bottom-0 right-0 text-[8px] bg-card/90 rounded-full px-0.5">
                      💖
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Floating Desktop Navigation Controls */}
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute -left-5 top-1/2 -translate-y-1/2 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-card/95 text-foreground shadow-soft transition-transform hover:scale-110 active:scale-95 focus:outline-none border border-border/40 cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute -right-5 top-1/2 -translate-y-1/2 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-card/95 text-foreground shadow-soft transition-transform hover:scale-110 active:scale-95 focus:outline-none border border-border/40 cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 text-foreground/80 shadow-soft transition-transform hover:scale-110 hover:bg-card focus:outline-none cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Film Strip Helpers & Perforations ---------- */
function ContainerFilmPerforations() {
  return (
    <div
      aria-hidden="true"
      className="w-full h-8 sm:h-9 bg-[#111113] border-y border-white/10 flex items-center overflow-hidden px-3 select-none pointer-events-none"
    >
      <div className="flex w-full items-center justify-between gap-3 shrink-0">
        {Array.from({ length: 42 }).map((_, idx) => (
          <div
            key={idx}
            className="h-3.5 sm:h-4 w-5 sm:w-6 shrink-0 rounded-[3px] bg-white/20 shadow-inner border border-black/80"
          />
        ))}
      </div>
    </div>
  );
}

function CardFilmPerforations({ label }: { label?: string }) {
  return (
    <div
      aria-hidden="true"
      className="bg-[#141416] px-3 py-1.5 flex items-center justify-between border-y border-black/40 select-none pointer-events-none"
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-2.5 w-3.5 rounded-[2px] bg-white/20 shadow-inner border border-black/60"
          />
        ))}
      </div>
      {label ? (
        <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
          {label}
        </span>
      ) : (
        <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase">
          35MM FILM
        </span>
      )}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-2.5 w-3.5 rounded-[2px] bg-white/20 shadow-inner border border-black/60"
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Videos: Infinite-Scrolling Film Strip Carousel + Fullscreen Player ---------- */
export function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter only videos with valid src
  const validVideos = useMemo(() => {
    return (birthday.videos || []).filter(
      (v) => v && typeof v.src === "string" && v.src.trim() !== "",
    );
  }, []);

  // Ensure base array has at least 4 items so it spans wide screens before tripling
  const baseVideos = useMemo(() => {
    if (validVideos.length === 0) return [];
    let base = [...validVideos];
    while (base.length < 4) {
      base = [...base, ...validVideos];
    }
    return base;
  }, [validVideos]);

  // Tripled array for mathematically seamless infinite loop: [base, base, base]
  const displayVideos = useMemo(() => {
    return [...baseVideos, ...baseVideos, ...baseVideos];
  }, [baseVideos]);

  // Scroll duration: 5 seconds per item in base array (minimum 12s)
  const duration = Math.max(12, baseVideos.length * 5);

  // IntersectionObserver to pause animation when scrolled out of view (saves battery/GPU)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Fullscreen modal navigation
  const navigateVideo = (delta: number) => {
    setSelectedVideo((curr) => {
      if (curr === null) return null;
      return (curr + delta + validVideos.length) % validVideos.length;
    });
  };

  // Keyboard navigation for modal (Escape, Left, Right)
  useEffect(() => {
    if (selectedVideo === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
      if (e.key === "ArrowRight") navigateVideo(1);
      if (e.key === "ArrowLeft") navigateVideo(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVideo, validVideos.length]);

  // Auto-pause background music while video modal is active
  useEffect(() => {
    if (selectedVideo !== null) {
      const audioElements = document.querySelectorAll("audio");
      audioElements.forEach((audio) => {
        try {
          audio.pause();
        } catch {
          // ignore
        }
      });
    }
  }, [selectedVideo]);

  // Empty state handling
  if (validVideos.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#18181b] via-[#232328] to-[#18181b] border border-white/10 shadow-2xl p-6 sm:p-10 text-center text-white">
        <ContainerFilmPerforations />
        <div className="py-12 flex flex-col items-center justify-center">
          <Film className="h-16 w-16 text-rose-300 animate-pulse mb-4" />
          <h3 className="font-script text-3xl sm:text-4xl text-rose-200">Our Video Memories</h3>
          <p className="mt-2 text-sm text-gray-400 max-w-md mx-auto">
            Special video clips are being developed in the studio 🎬 Check back soon!
          </p>
        </div>
        <ContainerFilmPerforations />
      </div>
    );
  }

  const isAnimationPaused = !isInView || isHovered || isTouched || selectedVideo !== null;

  return (
    <>
      {/* Component-scoped CSS for infinite scroll keyframes & pause rules */}
      <style>{`
        @keyframes filmScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
        .film-carousel-track:hover {
          animation-play-state: paused !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .film-carousel-track {
            animation: none !important;
            overflow-x: auto;
          }
        }
      `}</style>

      {/* Film Strip Aesthetic Container */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsTouched((prev) => !prev)}
        className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-b from-[#18181b] via-[#232328] to-[#18181b] border border-white/10 shadow-2xl py-6 sm:py-8 my-6"
      >
        {/* Top Film Perforation Border */}
        <ContainerFilmPerforations />

        {/* Film Reel Section Header */}
        <div className="text-center pt-8 pb-6 px-4">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-rosegold mb-2">
            Special Footage
          </p>
          <h3 className="font-script text-3xl sm:text-4xl md:text-5xl text-white flex items-center justify-center gap-2 sm:gap-3">
            <span>🎬</span>
            <span className="bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 bg-clip-text text-transparent">
              Our Video Memories
            </span>
            <span>🎬</span>
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 font-medium flex items-center justify-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Hover to pause • Click to watch
          </p>
        </div>

        {/* Carousel Viewport (Overflow Hidden) */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Edge Fade Gradients for Cinematic Vignette */}
          <div
            aria-hidden="true"
            className="absolute left-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-r from-[#18181b] to-transparent z-20 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-[#18181b] to-transparent z-20 pointer-events-none"
          />

          {/* Infinite Track with seamless CSS translateX translation */}
          <div
            className="film-carousel-track flex gap-5 w-max will-change-transform px-4"
            style={{
              animation: `filmScroll ${duration}s linear infinite`,
              animationPlayState: isAnimationPaused ? "paused" : "running",
            }}
          >
            {displayVideos.map((v, i) => {
              // Find the original index in validVideos for modal selection
              const originalIndex = validVideos.findIndex(
                (original) => original.src === v.src && original.title === v.title,
              );
              const activeIndex = originalIndex >= 0 ? originalIndex : 0;

              return (
                <div
                  key={`${v.src}-${i}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play video: ${v.title}`}
                  onClick={() => setSelectedVideo(activeIndex)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && setSelectedVideo(activeIndex)
                  }
                  className="group relative flex flex-col w-[280px] sm:w-[300px] md:w-[320px] h-[400px] sm:h-[430px] shrink-0 rounded-2xl bg-card border border-white/10 shadow-xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-2xl hover:border-primary/40 focus-visible:ring-4 focus-visible:ring-ring focus:outline-none"
                >
                  {/* Top Film Perforation Strip */}
                  <CardFilmPerforations
                    label={`REEL #${(activeIndex + 1).toString().padStart(2, "0")}`}
                  />

                  {/* Video Thumbnail Container with Hover Play Button */}
                  <div className="relative flex-1 min-h-[200px] w-full bg-black/90 overflow-hidden flex items-center justify-center">
                    <video
                      src={`${v.src}#t=0.001`}
                      poster={v.poster ? assetUrl(v.poster) : undefined}
                      preload="metadata"
                      muted
                      playsInline
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
                    />

                    {/* Dark Hover Overlay + Glowing Play Button */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/55 transition-all duration-300 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/90 text-white shadow-lg backdrop-blur-xs transition-all duration-300 group-hover:scale-115 group-hover:bg-rose-500 group-hover:shadow-rose-500/50">
                        <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                      </div>
                    </div>

                    {/* Film Clip Tag */}
                    <div className="absolute top-2.5 left-2.5 rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white/90 uppercase border border-white/20">
                      ▶ Video
                    </div>
                  </div>

                  {/* Title & Caption */}
                  <div className="p-4 bg-card flex flex-col justify-center min-h-[88px] border-t border-border/30">
                    <h4 className="font-script text-2xl text-primary font-semibold truncate group-hover:text-rose-500 transition-colors">
                      {v.title}
                    </h4>
                    <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {v.caption}
                    </p>
                  </div>

                  {/* Bottom Film Perforation Strip */}
                  <CardFilmPerforations />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Film Perforation Border */}
        <ContainerFilmPerforations />
      </div>

      {/* Fullscreen Video Modal */}
      {selectedVideo !== null && validVideos[selectedVideo] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Playing video: ${validVideos[selectedVideo].title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 md:p-6 animate-in fade-in duration-300"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full flex flex-col items-center rounded-2xl md:rounded-3xl bg-[#18181b] border border-white/15 shadow-2xl p-4 sm:p-6 overflow-hidden animate-in zoom-in-95 duration-300"
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close video player"
              onClick={() => setSelectedVideo(null)}
              className="absolute right-3.5 top-3.5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/25 hover:scale-110 active:scale-95 focus:outline-none cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Video Player Container */}
            <div className="relative w-full flex items-center justify-center rounded-xl overflow-hidden bg-black max-h-[68vh]">
              <video
                key={validVideos[selectedVideo].src}
                src={validVideos[selectedVideo].src}
                poster={
                  validVideos[selectedVideo].poster
                    ? assetUrl(validVideos[selectedVideo].poster)
                    : undefined
                }
                controls
                autoPlay
                playsInline
                className="max-h-[68vh] w-auto max-w-full rounded-xl object-contain shadow-lg"
              />
            </div>

            {/* Title & Caption Bar */}
            <div className="mt-4 flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1 text-left">
              <div>
                <h4 className="font-script text-2xl sm:text-3xl text-rose-300 font-semibold">
                  {validVideos[selectedVideo].title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                  {validVideos[selectedVideo].caption}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400 shrink-0">
                <span className="rounded-full bg-white/10 px-2.5 py-1 border border-white/10">
                  CLIP {selectedVideo + 1} OF {validVideos.length}
                </span>
              </div>
            </div>

            {/* Floating Navigation Arrows */}
            {validVideos.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous video"
                  onClick={() => navigateVideo(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-sm shadow-lg transition-transform hover:scale-110 active:scale-95 focus:outline-none cursor-pointer"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  aria-label="Next video"
                  onClick={() => navigateVideo(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-sm shadow-lg transition-transform hover:scale-110 active:scale-95 focus:outline-none cursor-pointer"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Letter: envelope opening ---------- */
export function Letter() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mx-auto max-w-2xl">
      {!open ? (
        <Reveal className="flex flex-col items-center">
          <button
            onClick={(e) => {
              setOpen(true);
              heartBurst(e.clientX, e.clientY);
            }}
            aria-label="Open the letter"
            className="group relative h-52 w-80 rounded-xl bg-peach shadow-soft transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring cursor-pointer"
          >
            <div
              className="absolute inset-x-0 top-0 h-28 origin-top bg-blush transition-transform duration-500 group-hover:[transform:rotateX(25deg)]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-32 bg-petal"
              style={{ clipPath: "polygon(0 100%, 50% 15%, 100% 100%)" }}
            />
            <span className="absolute left-1/2 top-24 -translate-x-1/2 text-4xl transition-transform group-hover:scale-125">
              💌
            </span>
          </button>
          <p className="mt-6 font-script text-2xl text-muted-foreground">
            For {birthday.name}, from {birthday.from} — tap to open
          </p>
        </Reveal>
      ) : (
        <article className="animate-in fade-in slide-in-from-bottom-10 duration-1000 rounded-2xl border bg-cream p-8 shadow-soft md:p-12">
          {birthday.letter.map((p, i) => (
            <p
              key={i}
              className={`animate-in fade-in fill-mode-both duration-700 ${
                i === 0 ? "font-script text-4xl text-primary mb-6" : "mb-5 text-lg leading-8"
              }`}
              style={{ animationDelay: `${i * 250}ms` }}
            >
              {p}
            </p>
          ))}
          <p
            className="animate-in fade-in fill-mode-both mt-8 text-right font-script text-3xl text-rosegold"
            style={{ animationDelay: `${birthday.letter.length * 250}ms` }}
          >
            {birthday.signature}
          </p>
          <p className="text-right text-sm text-muted-foreground">{birthday.fromTamil}</p>
        </article>
      )}
    </div>
  );
}

/* ---------- Final: Make a Wish with the Layered Celebration Cake ---------- */
export function FinalWish() {
  const [blown, setBlown] = useState(false);
  const [showFinaleModal, setShowFinaleModal] = useState(false);

  const handleBlow = (e: React.MouseEvent) => {
    setBlown(true);
    setShowFinaleModal(true);
    confetti(260);
    heartBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, [
      "⭐",
      "💖",
      "✨",
      "🎉",
      "🎂",
      "🤪",
    ]);
  };

  const handleRelight = () => {
    setBlown(false);
    setShowFinaleModal(false);
  };

  return (
    <>
      {/* Celebration Confetti Blast when modal opens */}
      <ConfettiEffect show={showFinaleModal} duration={12000} />

      {/* Grand Finale Funny Photo Modal */}
      <AnimatePresence>
        {showFinaleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowFinaleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 18, stiffness: 220 }}
              className="relative my-8 w-full max-w-lg overflow-hidden rounded-3xl border border-rose-200/80 bg-card/95 p-5 sm:p-7 shadow-2xl backdrop-blur-xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowFinaleModal(false)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-petal hover:text-primary cursor-pointer"
                aria-label="Close finale surprise"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Badge & Title */}
              <div className="flex flex-col items-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-petal px-3.5 py-1 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> 👑 SURPRISE GRAND FINALE 🤪
                </span>
                <h3 className="mt-2.5 font-script text-3xl sm:text-4xl text-primary leading-tight">
                  Caught in 4K, Princess! 😂👑
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Pure happiness & laughter after all those emotions!
                </p>
              </div>

              {/* Funny Fisheye Photo Card */}
              <motion.div
                initial={{ scale: 0.85, rotate: -3 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 14, stiffness: 200, delay: 0.15 }}
                className="relative mx-auto my-4 overflow-hidden rounded-2xl bg-white p-3 shadow-xl border border-rose-200 max-w-[270px] sm:max-w-[300px]"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-muted shadow-inner">
                  <img
                    src={birthday.funnyPhoto}
                    alt="Caught in 4K Princess"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <p className="mt-2.5 text-center font-script text-xl sm:text-2xl text-primary">
                  The One & Only Birthday Princess 👑✨
                </p>
              </motion.div>

              {/* Anna's Heartfelt Concluding Message */}
              <div className="mt-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 p-4 sm:p-5 border border-rose-200/60 text-left">
                <p className="font-script text-2xl sm:text-3xl text-primary text-center">
                  "This is the happiness after all those emotions! 🥹💖"
                </p>
                <p className="mt-2.5 text-xs sm:text-sm text-foreground/90 leading-relaxed text-center">
                  I want you to be happy like this forever and ever, Princess. Laughing out loud
                  without holding back, smiling freely without a single worry in the world. Whatever
                  comes in life, no matter where we are, your Anna will always be right here behind
                  you to protect your smile and cheer for every dream of yours.
                </p>
                <p className="mt-3 text-center font-script text-xl sm:text-2xl text-rose-500 font-semibold">
                  Stay blessed, stay crazy, stay this happy forever, Princess! 👑🤍🫂
                </p>
              </div>

              {/* Interactive Modal Buttons */}
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={handleRelight}
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-card px-5 py-2.5 text-xs sm:text-sm font-semibold text-foreground shadow-soft border border-border/60 transition-all hover:bg-muted/80 active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4 text-primary" />
                  <span>Relight Candles 🕯️</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowFinaleModal(false)}
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-primary px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-soft transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Cherish Every Moment 💖</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center text-center">
        <Reveal>
          <div className="mb-6">
            <CelebrationCake blown={blown} onBlow={handleBlow} onRelight={handleRelight} />
          </div>
        </Reveal>

        {/* Action button to re-open the funny surprise popup if closed */}
        {blown && (
          <Reveal className="mt-4">
            <button
              type="button"
              onClick={() => {
                setShowFinaleModal(true);
                confetti(150);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-petal px-5 py-2 text-sm font-semibold text-primary border border-primary/20 shadow-soft transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>View Surprise Photo & Anna's Message 📸👑</span>
            </button>
          </Reveal>
        )}

        <Reveal className="mt-14 max-w-2xl">
          <h2 className="font-script text-5xl text-rose-gradient md:text-7xl leading-tight">
            {birthday.finalMessage}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Happy Birthday, {birthday.nameTamil} 💗 — {birthday.from}
          </p>
        </Reveal>
      </div>
    </>
  );
}
