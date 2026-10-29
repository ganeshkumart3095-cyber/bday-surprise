import { useEffect } from "react";
import { confetti } from "./effects";

interface Props {
  show: boolean;
  duration?: number;
}

export function ConfettiEffect({ show, duration = 5000 }: Props) {
  useEffect(() => {
    if (!show) return;
    confetti(140);
    const interval = setInterval(() => {
      confetti(60);
    }, 2000);
    const timer = setTimeout(() => {
      clearInterval(interval);
    }, duration);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [show, duration]);

  return null;
}
