import { useEffect, useRef, useState } from "react";
import { birthday } from "@/config/birthday";
import { confetti, heartBurst } from "./effects";
import { Reveal } from "./parts";

export function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal className="mb-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rosegold">{kicker}</p>
      <h2 className="font-script text-5xl text-primary md:text-6xl">{title}</h2>
    </Reveal>
  );
}

/* ---------- Gallery: polaroids + swipeable lightbox ---------- */
export function Gallery() {
  const photos = birthday.photos;
  const [open, setOpen] = useState<number | null>(null);
  const touch = useRef(0);
  const go = (d: number) => setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length));
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);
  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {photos.map((p, i) => (
          <Reveal key={i} delay={(i % 4) * 80} className="mb-4 break-inside-avoid">
            <button
              onClick={() => setOpen(i)}
              className="block w-full rounded-lg bg-card p-2 pb-3 text-left shadow-soft transition-transform duration-300 hover:z-10 hover:scale-105 hover:rotate-0 focus-visible:ring-4 focus-visible:ring-ring focus:outline-none"
              style={{ transform: `rotate(${((i * 37) % 7) - 3}deg)` }}
            >
              <img src={p.src} alt={p.alt} loading="lazy" className="w-full rounded-md object-cover" />
              <p className="mt-2 px-1 font-script text-lg leading-tight text-foreground">{p.caption}</p>
            </button>
          </Reveal>
        ))}
      </div>
      {open !== null && (
        <div
          role="dialog" aria-modal="true" aria-label="Photo viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm animate-in fade-in"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touch.current = e.touches[0]?.clientX ?? 0)}
          onTouchEnd={(e) => { const dx = (e.changedTouches[0]?.clientX ?? 0) - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); }}
        >
          <figure key={open} className="max-w-lg rounded-xl bg-card p-3 pb-5 shadow-soft animate-in zoom-in-95 slide-in-from-right-8" onClick={(e) => e.stopPropagation()}>
            <img src={photos[open]!.src} alt={photos[open]!.alt} className="max-h-[65vh] w-full rounded-lg object-contain" />
            <figcaption className="mt-3 text-center font-script text-2xl text-foreground">{photos[open]!.caption}</figcaption>
            <p className="text-center text-sm text-muted-foreground">{open + 1} / {photos.length} · swipe or use arrows</p>
          </figure>
          <button aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-card text-2xl shadow-soft">‹</button>
          <button aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-card text-2xl shadow-soft">›</button>
          <button aria-label="Close" onClick={() => setOpen(null)} className="absolute right-4 top-4 h-10 w-10 rounded-full bg-card text-xl shadow-soft">✕</button>
        </div>
      )}
    </>
  );
}

/* ---------- Videos ---------- */
export function Videos() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {birthday.videos.map((v, i) => (
        <Reveal key={i} delay={i * 120}>
          <div className="overflow-hidden rounded-2xl bg-card shadow-soft">
            {v.src ? (
              <video src={v.src} poster={v.poster || undefined} controls playsInline preload="metadata" className="aspect-video w-full bg-muted" />
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center bg-soft text-center">
                <span className="text-5xl">🎬</span>
                <p className="mt-2 text-sm text-muted-foreground">Video coming soon</p>
              </div>
            )}
            <div className="p-5">
              <h3 className="font-script text-3xl text-primary">{v.title}</h3>
              <p className="text-muted-foreground">{v.caption}</p>
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
          <button onClick={(e) => { setOpen(true); heartBurst(e.clientX, e.clientY); }} aria-label="Open the letter" className="group relative h-52 w-80 rounded-xl bg-peach shadow-soft transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring">
            <div className="absolute inset-x-0 top-0 h-28 origin-top bg-blush transition-transform duration-500 group-hover:[transform:rotateX(25deg)]" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-petal" style={{ clipPath: "polygon(0 100%, 50% 15%, 100% 100%)" }} />
            <span className="absolute left-1/2 top-24 -translate-x-1/2 text-4xl transition-transform group-hover:scale-125">💌</span>
          </button>
          <p className="mt-6 font-script text-2xl text-muted-foreground">For {birthday.name}, from {birthday.from} — tap to open</p>
        </Reveal>
      ) : (
        <article className="animate-in fade-in slide-in-from-bottom-10 duration-1000 rounded-2xl border bg-cream p-8 shadow-soft md:p-12">
          {birthday.letter.map((p, i) => (
            <p key={i} className={`animate-in fade-in fill-mode-both duration-700 ${i === 0 ? "font-script text-4xl text-primary mb-6" : "mb-5 text-lg leading-8"}`} style={{ animationDelay: `${i * 400}ms` }}>{p}</p>
          ))}
          <p className="animate-in fade-in fill-mode-both mt-8 text-right font-script text-3xl text-rosegold" style={{ animationDelay: `${birthday.letter.length * 400}ms` }}>{birthday.signature}</p>
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
            onClick={() => setFlipped((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; })}
            aria-label={`Reason ${i + 1}: ${r.title}`}
            className={`flip block h-48 w-full md:h-56 ${flipped.has(i) ? "on" : ""}`}
          >
            <div className="flip-inner h-full">
              <div className={`flip-face flex flex-col items-center justify-center rounded-2xl ${bgs[i % 4]} shadow-soft`}>
                <span className="text-5xl">{r.emoji}</span>
                <span className="mt-2 text-sm font-semibold text-muted-foreground">Reason #{i + 1} · tap</span>
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

/* ---------- Final: make a wish candle ---------- */
export function FinalWish() {
  const [blown, setBlown] = useState(false);
  return (
    <div className="flex flex-col items-center text-center">
      <Reveal>
        <div className="relative mx-auto mb-6 flex h-56 w-56 flex-col items-center justify-end">
          <div className="relative mb-[-2px] flex flex-col items-center">
            {!blown ? <span className="flame text-4xl">🔥</span> : <span className="animate-in fade-in text-2xl opacity-60">💨</span>}
            <div className="h-16 w-4 rounded-sm bg-lavender" />
          </div>
          <div className="h-20 w-48 rounded-t-3xl bg-petal shadow-soft" />
          <div className="h-6 w-56 rounded-b-xl bg-blush" />
        </div>
      </Reveal>
      {!blown ? (
        <button onClick={() => { setBlown(true); confetti(220); }} className="rounded-full bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105">
          Close your eyes, make a wish & blow 🌬️
        </button>
      ) : (
        <div className="animate-in fade-in zoom-in duration-700">
          <p className="font-script text-4xl text-primary md:text-5xl">Your wish is on its way ✨</p>
        </div>
      )}
      <Reveal className="mt-12">
        <h2 className="font-script text-5xl text-rose-gradient md:text-7xl">{birthday.finalMessage}</h2>
        <p className="mt-4 text-lg text-muted-foreground">Happy Birthday, {birthday.nameTamil} 💗 — {birthday.from}</p>
      </Reveal>
    </div>
  );
}
