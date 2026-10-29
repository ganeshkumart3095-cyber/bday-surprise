import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { birthday } from "@/config/birthday";
import { assetUrl } from "@/lib/utils";
import { FloatingBits, MusicToggle } from "@/components/birthday/parts";
import { heartBurst } from "@/components/birthday/effects";
import { Heart, ChevronLeft, ChevronRight, X, Sparkles, Lock, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/secret")({
  head: () => ({
    meta: [{ title: "Our Secret Memories 🔒💖" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: SecretPage,
});

function SecretPage() {
  const photos = birthday.secretPhotos || [];
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
        heartBurst(e.clientX, e.clientY, ["💖", "💗", "✨", "🤍", "🌸"]);
      }
      return next;
    });
  };

  return (
    <main className="relative min-h-screen bg-soft text-foreground py-12 px-4 sm:px-6">
      <FloatingBits />
      <MusicToggle autoPlay />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Navigation & Back Action */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-card/90 px-4 py-2 text-xs sm:text-sm font-semibold text-primary shadow-soft hover:scale-105 active:scale-95 transition-all border border-border/50 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Birthday Story</span>
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-500/20 backdrop-blur-sm">
            <Lock className="h-3 w-3" />
            <span>Private Vault</span>
          </span>
        </div>

        {/* Header Banner */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 shadow-soft border border-border/50 text-xs font-semibold uppercase tracking-wider text-rosegold mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>For Our Eyes Only</span>
          </div>
          <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-primary leading-tight">
            Our Secret Memories 🤍
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto font-sans leading-relaxed">
            Sila ninaivugal manasula mattum dhaan irukkanum... Romba special, pure & precious-aana
            moments meant only for us.
          </p>
        </div>

        {/* 4 Secret Memories Grid (Zero Cropping, High Aesthetic) */}
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
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-card/90 shadow-soft transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 hover:border-primary/50 focus-visible:ring-4 focus-visible:ring-ring focus:outline-none cursor-pointer h-[420px] sm:h-[460px]"
              >
                {/* Ambient Blurred Backdrop using the photo's exact colors */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-125 pointer-events-none transition-opacity duration-500 group-hover:opacity-45"
                  style={{ backgroundImage: `url(${p.src})` }}
                />

                {/* Card Header */}
                <div className="relative z-20 flex items-center justify-between p-4 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase backdrop-blur-md border border-border/50 shadow-2xs">
                    <Lock className="h-3 w-3 text-rose-500" />
                    SECRET #0{i + 1}
                  </span>

                  {/* Heart Reaction Button */}
                  <button
                    type="button"
                    aria-label={isLoved ? "Remove like" : "Like this memory"}
                    onClick={(e) => toggleLike(e, i)}
                    className={`pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md shadow-xs transition-transform duration-300 active:scale-125 hover:scale-115 focus:outline-none cursor-pointer ${
                      isLoved
                        ? "bg-rose-500 text-white shadow-rose-500/30 shadow-sm"
                        : "bg-background/85 text-foreground/60 hover:text-rose-500 hover:bg-background border border-border/50"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isLoved ? "fill-current" : "stroke-current"}`} />
                  </button>
                </div>

                {/* Image Display (GUARANTEED ZERO CROPPING) */}
                <div className="relative z-10 flex flex-1 min-h-0 w-full items-center justify-center px-4 py-2 overflow-hidden">
                  {!loaded.has(i) && (
                    <div className="flex h-full w-full items-center justify-center animate-pulse">
                      <span className="text-3xl">🔒</span>
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

                {/* Caption Bar */}
                <div className="relative z-20 w-full bg-gradient-to-t from-background/95 via-background/80 to-transparent p-4 pt-4 rounded-b-3xl">
                  <p className="font-script text-xl sm:text-2xl text-foreground font-medium leading-snug line-clamp-2">
                    {p.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Personal Note */}
        <div className="mt-16 text-center rounded-3xl bg-card/80 p-8 shadow-soft border border-border/50 backdrop-blur-sm">
          <p className="font-script text-3xl sm:text-4xl text-primary leading-relaxed">
            "Some memories are too precious to share with the rest of the world."
          </p>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground font-sans">
            Holding your hand, sharing laughs, and being by your side — always here for you,
            Princess 👑🤍
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:scale-105 active:scale-95"
            >
              <span>Return to Main Celebration</span>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 md:p-6 backdrop-blur-md animate-in fade-in duration-300"
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
            className={`relative max-h-[92vh] max-w-xl w-full flex flex-col items-center rounded-3xl bg-card p-4 sm:p-5 shadow-2xl animate-in zoom-in-95 duration-300 ${
              direction === "next" ? "slide-in-from-right-8" : "slide-in-from-left-8"
            }`}
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute right-3.5 top-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground/80 shadow-soft transition-transform hover:scale-110 active:scale-95 focus:outline-none cursor-pointer border border-border/50"
            >
              <X className="h-4 w-4" />
            </button>

            {/* High-Res Photo Container (Zero Cropping) */}
            <div className="relative flex max-h-[64vh] w-full items-center justify-center overflow-hidden rounded-2xl bg-black/5 p-2">
              <img
                src={photos[open].src}
                alt={photos[open].alt}
                className="max-h-[62vh] w-auto max-w-full rounded-xl object-contain shadow-sm"
              />
            </div>

            {/* Caption & Interaction */}
            <div className="mt-4 flex w-full flex-col items-center px-4 text-center">
              <figcaption className="font-script text-2xl text-primary sm:text-3xl">
                {photos[open].caption}
              </figcaption>
              <div className="mt-1.5 flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
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
                  className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-card/95 text-foreground shadow-soft transition-transform hover:scale-110 active:scale-95 focus:outline-none border border-border/50 cursor-pointer"
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
                  className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-card/95 text-foreground shadow-soft transition-transform hover:scale-110 active:scale-95 focus:outline-none border border-border/50 cursor-pointer"
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
