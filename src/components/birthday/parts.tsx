import { useEffect, useRef, useState, type ReactNode } from "react";
import { birthday } from "@/config/birthday";
import { confetti, heartBurst } from "./effects";

/* ---------- Scroll reveal wrapper ---------- */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (el.classList.add("in"), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

/* ---------- Typing text ---------- */
export function Typing({ text, className = "" }: { text: string; className?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), 70);
    return () => clearTimeout(t);
  }, [n, text]);
  return <span className={`${className} ${n < text.length ? "caret" : ""}`}>{Array.from(text).slice(0, n).join("")}</span>;
}

/* ---------- Floating hearts background ---------- */
export function FloatingBits() {
  const [items, setItems] = useState<{ l: number; d: number; s: number; delay: number; c: string }[]>([]);
  useEffect(() => {
    const sym = ["💗", "🌸", "✨", "💕", "🎀", "⭐"];
    setItems(Array.from({ length: 16 }, () => ({ l: Math.random() * 100, d: 12 + Math.random() * 14, s: 14 + Math.random() * 16, delay: -Math.random() * 20, c: sym[Math.floor(Math.random() * sym.length)]! })));
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((it, i) => (
        <span key={i} className="float-item" style={{ left: `${it.l}%`, fontSize: it.s, animationDuration: `${it.d}s`, animationDelay: `${it.delay}s` }}>{it.c}</span>
      ))}
    </div>
  );
}

/* ---------- Gift unwrapping intro ---------- */
export function GiftIntro({ onOpen }: { onOpen: () => void }) {
  const [taps, setTaps] = useState(0);
  const [opened, setOpened] = useState(false);
  const needed = 3;
  const tap = () => {
    if (opened) return;
    const next = taps + 1;
    setTaps(next);
    if (next >= needed) {
      setOpened(true);
      confetti(160);
      setTimeout(onOpen, 1400);
    }
  };
  const hints = ["Tap the gift 🎁", "Again… it's wiggling!", "One more tap! 💗", "Opening…"];
  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-soft px-6 text-center transition-opacity duration-700 ${opened ? "opacity-0 delay-700" : ""}`}>
      <p className="font-script text-2xl text-primary md:text-3xl">A little surprise for</p>
      <h1 className="font-script text-6xl text-rose-gradient md:text-8xl">{birthday.name}</h1>
      <p className="mb-10 text-lg text-muted-foreground">{birthday.nameTamil}</p>
      <button onClick={tap} aria-label="Open your gift" className={`relative h-48 w-48 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-ring rounded-2xl ${taps > 0 && !opened ? "wiggle" : ""}`}>
        {/* lid */}
        <div className={`absolute left-[-8%] top-6 z-10 h-12 w-[116%] rounded-xl bg-rose shadow-soft transition-all duration-700 ${opened ? "-translate-y-40 rotate-[-25deg] opacity-0" : ""}`}>
          <div className="absolute left-1/2 top-0 h-full w-6 -translate-x-1/2 bg-lavender" />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl">🎀</div>
        </div>
        {/* box */}
        <div className="absolute bottom-0 h-32 w-full rounded-xl bg-blush shadow-soft">
          <div className="absolute left-1/2 top-0 h-full w-6 -translate-x-1/2 bg-lavender" />
        </div>
        {opened && <div className="absolute inset-x-0 top-10 animate-in zoom-in text-6xl">💖</div>}
      </button>
      <p className="mt-10 text-lg font-medium text-foreground" aria-live="polite">{hints[Math.min(taps, 3)]}</p>
      <div className="mt-3 flex gap-2">{Array.from({ length: needed }, (_, i) => <span key={i} className={`h-2 w-8 rounded-full transition-colors ${i < taps ? "bg-primary" : "bg-border"}`} />)}</div>
    </div>
  );
}

/* ---------- Yes / runaway No ---------- */
export function YesNo({ onYes }: { onYes: () => void }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [tries, setTries] = useState(0);
  const [answered, setAnswered] = useState(false);
  const run = () => {
    setTries((t) => t + 1);
    setPos({ x: (Math.random() - 0.5) * 240, y: (Math.random() - 0.5) * 160 });
  };
  const noLabels = ["No", "Nope?", "Are you sure?", "Try again 😜", "Can't catch me!", "Just say yes 💗"];
  if (answered)
    return <p className="animate-in fade-in zoom-in font-script text-3xl text-primary">Of course you are! The most special 💖</p>;
  return (
    <div className="relative flex min-h-40 items-center justify-center gap-6">
      <button
        onClick={(e) => { setAnswered(true); confetti(); heartBurst(e.clientX, e.clientY); onYes(); }}
        className="rounded-full bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-110 active:scale-95"
        style={{ transform: `scale(${1 + Math.min(tries, 6) * 0.08})` }}
      >Yes! 💗</button>
      <button
        onMouseEnter={run}
        onTouchStart={(e) => { e.preventDefault(); run(); }}
        onFocus={run}
        onClick={run}
        className="rounded-full border-2 border-border bg-card px-6 py-3 font-semibold text-muted-foreground transition-transform duration-300"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >{noLabels[Math.min(tries, noLabels.length - 1)]}</button>
    </div>
  );
}

/* ---------- Music toggle ---------- */
export function MusicToggle() {
  const ref = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  const [msg, setMsg] = useState("");
  const toggle = async () => {
    if (!birthday.musicSrc) { setMsg("Add a song in the config 🎵"); setTimeout(() => setMsg(""), 2500); return; }
    const a = ref.current!;
    if (on) { a.pause(); setOn(false); } else { await a.play().catch(() => {}); setOn(true); }
  };
  return (
    <div className="fixed right-4 top-4 z-40 flex flex-row-reverse items-center gap-2 md:bottom-4 md:left-4 md:right-auto md:top-auto md:flex-row">
      {birthday.musicSrc && <audio ref={ref} src={birthday.musicSrc} loop preload="none" />}
      <button onClick={toggle} aria-label={on ? "Pause music" : "Play music"} className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-xl shadow-soft transition-transform hover:scale-110">
        {on ? <span className="flex items-end gap-0.5 h-5">{[0, 1, 2].map((i) => <span key={i} className="w-1 rounded bg-primary animate-pulse" style={{ height: `${8 + i * 5}px`, animationDelay: `${i * 0.2}s` }} />)}</span> : "🎵"}
      </button>
      {msg && <span className="rounded-full bg-card px-3 py-1 text-sm shadow-soft">{msg}</span>}
    </div>
  );
}
