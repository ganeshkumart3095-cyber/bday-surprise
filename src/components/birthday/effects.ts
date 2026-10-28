// Tiny DOM effects (CSS-animated) — confetti rain and heart bursts.
const COLORS = ["#FFB7C5", "#FFC9D4", "#E6D5F5", "#C8F0DD", "#FFDAB9", "#E8B4A0"];

export function confetti(count = 120) {
  if (typeof document === "undefined") return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "confetti";
    el.style.left = Math.random() * 100 + "vw";
    el.style.background = COLORS[i % COLORS.length];
    el.style.setProperty("--dx", (Math.random() - 0.5) * 200 + "px");
    el.style.animationDelay = Math.random() * 0.8 + "s";
    el.style.animationDuration = 2.5 + Math.random() * 2 + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5500);
  }
}

export function heartBurst(x: number, y: number, symbols = ["💗", "💖", "✨", "🌸"]) {
  for (let i = 0; i < 10; i++) {
    const el = document.createElement("span");
    el.className = "burst";
    el.textContent = symbols[i % symbols.length];
    el.style.left = x + "px";
    el.style.top = y + "px";
    const a = (Math.PI * 2 * i) / 10;
    el.style.setProperty("--dx", Math.cos(a) * 80 + "px");
    el.style.setProperty("--dy", Math.sin(a) * 80 + "px");
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
}
