import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { birthday } from "@/config/birthday";
import { FloatingBits, GiftIntro, MusicToggle, Reveal, Typing, YesNo } from "@/components/birthday/parts";
import { FinalWish, Gallery, Letter, Reasons, SectionTitle, Videos } from "@/components/birthday/sections";
import { heartBurst } from "@/components/birthday/effects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Thangachii 💗" },
      { name: "description", content: "A little birthday surprise from Anna — memories, a letter, and lots of love." },
      { property: "og:title", content: "Happy Birthday, Thangachii 💗" },
      { property: "og:description", content: "A birthday surprise from Anna, full of memories and love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Story chapters — used by the side navigation.
const CHAPTERS = [
  { id: "welcome", label: "Welcome", icon: "🎉" },
  { id: "memories", label: "Memories", icon: "📸" },
  { id: "moments", label: "Moments", icon: "🎬" },
  { id: "letter", label: "Letter", icon: "💌" },
  { id: "special", label: "Special", icon: "🌸" },
  { id: "wish", label: "Wish", icon: "🎂" },
];

function Index() {
  const [unlocked, setUnlocked] = useState(false);
  const [active, setActive] = useState("welcome");
  const [progress, setProgress] = useState(0);
  const [eggs, setEggs] = useState(0);

  useEffect(() => {
    if (!unlocked) return;
    const onScroll = () => {
      const h = document.documentElement;
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
      for (const c of [...CHAPTERS].reverse()) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) { setActive(c.id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [unlocked]);

  // Easter egg: tapping anywhere sprinkles tiny hearts.
  const sprinkle = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button,a,video")) return;
    heartBurst(e.clientX, e.clientY);
  };

  const secrets = ["You're my favourite human 💗", "Anna will always buy you ice cream 🍦", "Secret: you were right that one time 😄", "You found every secret! Love you endlessly ✨"];

  return (
    <main className="relative min-h-screen bg-soft" onClick={sprinkle}>
      {!unlocked && <GiftIntro onOpen={() => setUnlocked(true)} />}
      <FloatingBits />

      {unlocked && (
        <>
          {/* progress bar */}
          <div className="fixed inset-x-0 top-0 z-40 h-1.5 bg-border/50">
            <div className="h-full bg-rose transition-[width] duration-150" style={{ width: `${progress}%` }} />
          </div>

          {/* chapter navigation */}
          <nav aria-label="Chapters" className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-1 rounded-full bg-card/90 p-1.5 shadow-soft backdrop-blur md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:flex-col">
            {CHAPTERS.map((c) => (
              <a key={c.id} href={`#${c.id}`} aria-label={c.label} aria-current={active === c.id ? "step" : undefined}
                className={`group relative flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all ${active === c.id ? "bg-petal scale-110" : "opacity-60 hover:opacity-100"}`}>
                {c.icon}
                <span className="pointer-events-none absolute right-12 hidden whitespace-nowrap rounded-full bg-card px-3 py-1 text-xs font-semibold shadow-soft group-hover:md:block">{c.label}</span>
              </a>
            ))}
          </nav>

          <MusicToggle />

          <div className="relative z-10 mx-auto max-w-6xl px-5 pb-32">
            <section id="welcome" className="flex min-h-screen flex-col items-center justify-center text-center">
              <p className="text-lg text-muted-foreground">{birthday.nameTamil} · {birthday.fromTamil}</p>
              <h1 className="mt-2 min-h-[2.5em] font-script text-5xl leading-tight text-primary md:text-7xl">
                <Typing text={birthday.welcomeMessage} />
              </h1>
              <Reveal delay={400} className="mt-10 w-full max-w-md rounded-3xl bg-card/80 p-8 shadow-soft backdrop-blur">
                <p className="mb-4 text-xl font-semibold">{birthday.question}</p>
                <YesNo onYes={() => {}} />
              </Reveal>
              <p className="mt-10 animate-bounce text-muted-foreground">Scroll down for your memories ↓</p>
            </section>

            <section id="memories" className="py-24">
              <SectionTitle kicker="Chapter one" title="Our Memory Book" />
              <Gallery />
            </section>

            <section id="moments" className="py-24">
              <SectionTitle kicker="Chapter two" title="Little Moments" />
              <Videos />
            </section>

            <section id="letter" className="py-24">
              <SectionTitle kicker="Chapter three" title="A Letter From Anna" />
              <Letter />
            </section>

            <section id="special" className="py-24">
              <SectionTitle kicker="Chapter four" title="Why You're Special" />
              <Reasons />
              {/* hidden easter egg */}
              <div className="mt-12 text-center">
                <button onClick={(e) => { setEggs((n) => Math.min(n + 1, secrets.length)); heartBurst(e.clientX, e.clientY, ["🎁", "💝", "⭐"]); }}
                  className="wiggle text-4xl transition-transform hover:scale-125" aria-label="A secret gift">🎁</button>
                {eggs > 0 && <p key={eggs} className="mt-3 animate-in fade-in slide-in-from-bottom-2 font-script text-2xl text-primary">{secrets[eggs - 1]}</p>}
              </div>
            </section>

            <section id="wish" className="flex min-h-screen flex-col justify-center py-24">
              <SectionTitle kicker="The last page" title="Make a Wish" />
              <FinalWish />
            </section>
          </div>
        </>
      )}
    </main>
  );
}
