import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { birthday } from "@/config/birthday";
import {
  FloatingBits,
  GiftIntro,
  MusicToggle,
  Reveal,
  Typing,
  YesNo,
} from "@/components/birthday/parts";
import { FinalWish, Gallery, Letter, SectionTitle, Videos } from "@/components/birthday/sections";
import { CakeCuttingInteraction } from "@/components/birthday/CakeCuttingInteraction";
import { PhotoRevealModal } from "@/components/birthday/PhotoRevealModal";
import { heartBurst } from "@/components/birthday/effects";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bday Surprise 💗" },
      {
        name: "description",
        content: "A little birthday surprise from Anna — memories, a letter, and lots of love.",
      },
      { property: "og:title", content: "Bday Surprise 💗" },
      {
        property: "og:description",
        content: "A birthday surprise from Anna, full of memories and love.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Story chapters — used by the side navigation (Special/Reasons removed as requested)
const CHAPTERS = [
  { id: "welcome", label: "Welcome", icon: "🎉" },
  { id: "memories", label: "Memories", icon: "📸" },
  { id: "moments", label: "Moments", icon: "🎬" },
  { id: "letter", label: "Letter", icon: "💌" },
  { id: "wish", label: "Wish", icon: "🎂" },
];

type Stage = "question" | "cake" | "reveal" | "mainStory";

function Index() {
  const [unlocked, setUnlocked] = useState(false);
  const [stage, setStage] = useState<Stage>("question");
  const [active, setActive] = useState("welcome");
  const [progress, setProgress] = useState(0);
  const [eggs, setEggs] = useState(0);

  useEffect(() => {
    if (!unlocked || stage !== "mainStory") return;
    const onScroll = () => {
      const h = document.documentElement;
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
      for (const c of [...CHAPTERS].reverse()) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) {
          setActive(c.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [unlocked, stage]);

  // Easter egg: tapping anywhere sprinkles tiny hearts
  const sprinkle = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button,a,video,input")) return;
    heartBurst(e.clientX, e.clientY);
  };

  const handleProceedToMain = () => {
    setStage("mainStory");
    setTimeout(() => {
      const el = document.getElementById("memories");
      el?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  const secrets = [
    "You're my favourite human 💗",
    "Anna will always buy you ice cream 🍦",
    "Secret: you were right that one time 😄",
    "You found every secret! Love you endlessly ✨",
  ];

  return (
    <main className="relative min-h-screen bg-soft" onClick={sprinkle}>
      {!unlocked && <GiftIntro onOpen={() => setUnlocked(true)} />}
      <FloatingBits />

      {/* Funny Photo + Birthday Song Modal */}
      <PhotoRevealModal isOpen={stage === "reveal"} onProceed={handleProceedToMain} />

      {unlocked && (
        <>
          {/* Progress bar (active during main story) */}
          {stage === "mainStory" && (
            <div className="fixed inset-x-0 top-0 z-40 h-1.5 bg-border/50">
              <div
                className="h-full bg-rose transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Chapter Navigation (visible during main story) */}
          {stage === "mainStory" && (
            <nav
              aria-label="Chapters"
              className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 flex -translate-x-1/2 gap-1 rounded-full bg-card/95 p-1.5 shadow-soft backdrop-blur-md border border-border/50 md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:flex-col"
            >
              {CHAPTERS.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  aria-label={c.label}
                  aria-current={active === c.id ? "step" : undefined}
                  className={`group relative flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all ${
                    active === c.id ? "bg-petal scale-110" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {c.icon}
                  <span className="pointer-events-none absolute right-12 hidden whitespace-nowrap rounded-full bg-card px-3 py-1 text-xs font-semibold shadow-soft group-hover:md:block">
                    {c.label}
                  </span>
                </a>
              ))}
            </nav>
          )}

          {/* Main Journey Music Player (starts automatically in main story) */}
          {stage === "mainStory" && <MusicToggle autoPlay />}

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pb-32">
            {/* Chapter 0: Welcome, Question, & Interactive Cake Cutting */}
            <section
              id="welcome"
              className="flex min-h-screen flex-col items-center justify-center text-center py-16"
            >
              <p className="text-lg text-muted-foreground">
                {birthday.nameTamil} · {birthday.fromTamil}
              </p>
              <h1 className="mt-2 min-h-[2.5em] font-script text-5xl leading-tight text-primary md:text-7xl">
                <Typing text={birthday.welcomeMessage} />
              </h1>

              <AnimatePresence mode="wait">
                {stage === "question" && (
                  <motion.div
                    key="question-box"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 w-full max-w-md rounded-3xl bg-card/85 p-6 sm:p-8 shadow-soft backdrop-blur border border-border/40"
                  >
                    <p className="mb-4 text-xl font-semibold">{birthday.question}</p>
                    <YesNo onYes={() => setStage("cake")} />
                  </motion.div>
                )}

                {(stage === "cake" || stage === "reveal") && (
                  <motion.div
                    key="cake-cutting"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 w-full max-w-lg"
                  >
                    <CakeCuttingInteraction onComplete={() => setStage("reveal")} />
                  </motion.div>
                )}
              </AnimatePresence>

              {stage === "mainStory" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10"
                >
                  <p className="animate-bounce text-muted-foreground font-medium">
                    Scroll down for your memories ↓
                  </p>
                </motion.div>
              )}
            </section>

            {/* Main Journey Content (revealed after cake cutting & funny photo) */}
            {stage === "mainStory" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Chapter One: Our Memory Book */}
                <section id="memories" className="py-24 sm:py-32">
                  <SectionTitle kicker="Chapter one" title="Our Memory Book" />
                  <Gallery />
                </section>

                {/* Chapter Two: Little Moments (Videos) */}
                <section id="moments" className="py-24 sm:py-32">
                  <SectionTitle kicker="Chapter two" title="Little Moments" />
                  <Videos />
                </section>

                {/* Chapter Three: A Letter From Anna */}
                <section id="letter" className="py-24 sm:py-32">
                  <SectionTitle kicker="Chapter three" title="A Letter From Anna" />
                  <Letter />

                  {/* Secret Easter Egg Gift */}
                  <div className="mt-16 text-center">
                    <button
                      onClick={(e) => {
                        setEggs((n) => Math.min(n + 1, secrets.length));
                        heartBurst(e.clientX, e.clientY, ["🎁", "💝", "⭐"]);
                      }}
                      className="wiggle text-4xl transition-transform hover:scale-125"
                      aria-label="A secret gift from Anna"
                    >
                      🎁
                    </button>
                    {eggs > 0 && (
                      <p
                        key={eggs}
                        className="mt-3 animate-in fade-in slide-in-from-bottom-2 font-script text-2xl text-primary"
                      >
                        {secrets[eggs - 1]}
                      </p>
                    )}
                  </div>
                </section>

                {/* Chapter Four: Make a Wish & Final Celebration */}
                <section id="wish" className="flex min-h-screen flex-col justify-center py-24">
                  <SectionTitle kicker="The last page" title="Make a Wish" />
                  <FinalWish />
                </section>
              </motion.div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
