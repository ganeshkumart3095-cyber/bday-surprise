import { useEffect, useRef, useState } from "react";
import { birthday } from "@/config/birthday";
import { assetUrl } from "@/lib/utils";
import { confetti, heartBurst } from "./effects";
import { Reveal } from "./parts";
import { Heart, ChevronLeft, ChevronRight, X, Sparkles, Cake, RotateCcw } from "lucide-react";
import { GiBirthdayCake, FaGift, FaHeart } from "react-icons/gi";
import { IoSparkles } from "react-icons/io5";

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

/* ---------- Gallery: Handcrafted Polaroid Scrapbook Wall + Next-Gen Lightbox ---------- */
export function Gallery() {
  const photos = birthday.photos;
  const [open, setOpen] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [loaded, setLoaded] = useState<Set<number>>(new Set());
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [hovered, setHovered] = useState<number | null>(null);
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

  // Soft washi tape pastel color variants
  const washiTapes = [
    "bg-rose/40 border-rose/30 -rotate-2",
    "bg-lavender/50 border-lavender/40 rotate-1",
    "bg-mint/45 border-mint/35 rotate-3",
    "bg-peach/50 border-peach/40 -rotate-1",
  ];

  // Cute scrapbook stickers for corners
  const stickers = ["🌸", "🍓", "🎀", "🧸", "✨", "🧁", "🌟", "💐"];

  return (
    <>
      {/* Masonry Scrapbook Wall: Clean, uninterrupted polaroids with zero gaps */}
      <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-5 md:gap-6 [column-fill:_balance]">
        {photos.map((p, i) => {
          const rotation = ((i * 37) % 5) - 2; // Organic subtle tilt between -2deg and +2deg
          const hasTape = i % 3 === 0;
          const hasSticker = i % 4 === 1;
          const isCurrentHovered = hovered === i;
          const isLoved = liked.has(i);

          return (
            <div key={i} className="mb-6 break-inside-avoid">
              <Reveal delay={(i % 4) * 80}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative transition-all duration-400 ease-out hover:z-20 hover:-translate-y-2.5 hover:scale-[1.02]"
                  style={{
                    transform: `rotate(${isCurrentHovered ? 0 : rotation}deg)`,
                    transition:
                      "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
                  }}
                >
                  {/* Decorative Washi Tape Accent */}
                  {hasTape && (
                    <div
                      aria-hidden="true"
                      className={`washi-tape absolute -top-3 left-1/2 z-10 h-5 w-20 md:w-24 -translate-x-1/2 rounded-xs border backdrop-blur-xs opacity-85 pointer-events-none ${
                        washiTapes[i % washiTapes.length]
                      }`}
                    />
                  )}

                  {/* Cute Scrapbook Corner Sticker */}
                  {hasSticker && !hasTape && (
                    <span
                      aria-hidden="true"
                      className="absolute -top-2 -right-2 z-10 text-xl drop-shadow-xs pointer-events-none select-none transition-transform group-hover:scale-125 group-hover:rotate-12"
                    >
                      {stickers[i % stickers.length]}
                    </span>
                  )}

                  {/* Polaroid Card Frame */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setOpen(i)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(i)}
                    className="cursor-pointer rounded-2xl bg-card p-3 pb-4 shadow-soft transition-shadow duration-300 hover:shadow-2xl border border-border/40 focus-visible:ring-4 focus-visible:ring-ring focus:outline-none relative"
                  >
                    {/* Direct Quick Heart Button on the Polaroid */}
                    <button
                      type="button"
                      aria-label={isLoved ? "Remove like" : "Like this photo"}
                      onClick={(e) => toggleLike(e, i)}
                      className={`absolute right-4.5 top-4.5 z-20 flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-sm shadow-xs transition-transform duration-300 active:scale-125 hover:scale-115 focus:outline-none ${
                        isLoved
                          ? "bg-rose-50 text-rose-500 scale-105"
                          : "bg-white/80 text-foreground/50 hover:text-rose-500 hover:bg-white"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${isLoved ? "fill-rose-500 stroke-rose-500" : "stroke-current"}`}
                      />
                    </button>

                    {/* Image Container with Native Portrait Ratio */}
                    <div className="relative overflow-hidden rounded-xl bg-muted/50">
                      {!loaded.has(i) && (
                        <div className="flex aspect-[9/16] w-full items-center justify-center bg-muted/70 animate-pulse">
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
                        className={`w-full object-cover transition-all duration-500 group-hover:scale-105 ${
                          loaded.has(i) ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>

                    {/* Authentic Polaroid Paper Chin (Captions never cover the image) */}
                    <div className="mt-3 px-1 text-center">
                      <p className="font-script text-xl leading-snug text-foreground md:text-2xl line-clamp-2">
                        {p.caption}
                      </p>
                      <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                        <span>MEM #{(i + 1).toString().padStart(2, "0")}</span>
                        {isLoved && <span className="text-xs">💖</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
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

/* ---------- Videos: Responsive for Vertical & Horizontal Phone Clips ---------- */
export function Videos() {
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState<Set<number>>(new Set(birthday.videos.map((_, i) => i)));

  const handleVideoLoad = (index: number) => {
    setLoading((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  };

  const handleVideoError = (index: number) => {
    setErrors((prev) => new Set(prev).add(index));
    setLoading((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
      {birthday.videos.map((v, i) => (
        <Reveal key={i} delay={i * 150}>
          <div className="overflow-hidden rounded-2xl bg-card shadow-soft border border-border/40 flex flex-col">
            {v.src && !errors.has(i) ? (
              <div className="relative flex justify-center bg-black/5 overflow-hidden">
                {loading.has(i) && (
                  <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center min-h-[300px]">
                    <span className="text-5xl">🎬</span>
                  </div>
                )}
                <video
                  src={v.src}
                  poster={v.poster ? assetUrl(v.poster) : undefined}
                  controls
                  playsInline
                  preload="metadata"
                  onLoadedData={() => handleVideoLoad(i)}
                  onError={() => handleVideoError(i)}
                  className="max-h-[480px] w-auto max-w-full rounded-t-2xl object-contain bg-black/10"
                />
              </div>
            ) : (
              <div className="flex min-h-[280px] w-full flex-col items-center justify-center bg-soft text-center p-6">
                <span className="text-5xl">{errors.has(i) ? "⚠️" : "🎬"}</span>
                <p className="mt-3 text-base text-muted-foreground font-medium">
                  {errors.has(i) ? "Video unavailable" : "Video coming soon"}
                </p>
              </div>
            )}
            <div className="p-5">
              <h3 className="font-script text-3xl text-primary">{v.title}</h3>
              <p className="mt-1 text-muted-foreground">{v.caption}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
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

/* ---------- Why you're special: flip cards ---------- */
export function Reasons() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const bgs = ["bg-petal", "bg-lavender", "bg-mint", "bg-peach"];
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {birthday.reasons.map((r, i) => (
        <Reveal key={i} delay={i * 100}>
          <button
            onClick={() =>
              setFlipped((s) => {
                const n = new Set(s);
                n.has(i) ? n.delete(i) : n.add(i);
                return n;
              })
            }
            aria-label={`Reason ${i + 1}: ${r.title}`}
            className={`flip block h-48 w-full md:h-56 cursor-pointer ${flipped.has(i) ? "on" : ""}`}
          >
            <div className="flip-inner h-full">
              <div
                className={`flip-face flex flex-col items-center justify-center rounded-2xl ${bgs[i % 4]} shadow-soft`}
              >
                <span className="text-5xl">{r.emoji}</span>
                <span className="mt-2 text-sm font-semibold text-muted-foreground">
                  Reason #{i + 1} · tap
                </span>
              </div>
              <div className="flip-face flip-back flex flex-col items-center justify-center rounded-2xl bg-card p-4 text-center shadow-soft">
                <h3 className="font-script text-2xl text-primary md:text-3xl">{r.title}</h3>
                <p className="mt-1 text-sm md:text-base">{r.text}</p>
              </div>
            </div>
          </button>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- Final: Make a Wish with the Layered Celebration Cake ---------- */
export function FinalWish() {
  const [blown, setBlown] = useState(false);

  const handleBlow = (e: React.MouseEvent) => {
    setBlown(true);
    confetti(220);
    heartBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, [
      "⭐",
      "💖",
      "✨",
      "🎉",
      "🎂",
    ]);
  };

  const handleRelight = () => {
    setBlown(false);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <Reveal>
        <div className="mb-6">
          <CelebrationCake blown={blown} onBlow={handleBlow} onRelight={handleRelight} />
        </div>
      </Reveal>

      <Reveal className="mt-14 max-w-2xl">
        <h2 className="font-script text-5xl text-rose-gradient md:text-7xl leading-tight">
          {birthday.finalMessage}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Happy Birthday, {birthday.nameTamil} 💗 — {birthday.from}
        </p>
      </Reveal>
    </div>
  );
}
