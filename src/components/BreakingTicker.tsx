import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { breakingHeadlines } from '../data/mockNews';

export function BreakingTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingHeadlines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 md:py-3 flex items-center gap-3 md:gap-4">
        <span className="flex-shrink-0 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="font-mono text-[10px] md:text-xs font-bold tracking-wider hidden sm:inline">LIVE</span>
        </span>

        <div className="relative flex-grow overflow-hidden h-4 md:h-5">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 font-mono text-[10px] md:text-xs tracking-wide whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {breakingHeadlines[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex-shrink-0 flex gap-1">
          {breakingHeadlines.map((_, idx) => (
            <span
              key={idx}
              className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full transition-all ${
                idx === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
