import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

interface Props {
  show: boolean;
  duration?: number;
}

export function ConfettiEffect({ show, duration = 5000 }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (show) {
      setIsActive(true);
      const timer = setTimeout(() => setIsActive(false), duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isActive) return null;

  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      numberOfPieces={200}
      recycle={false}
      colors={['#FFB7C5', '#FFC9D4', '#E6E6FA', '#B2E6D4', '#FFE5D9', '#E8B4A0']}
      gravity={0.3}
    />
  );
}
