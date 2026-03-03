import { motion } from 'framer-motion';

interface SourceTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  color: string;
}

export function SourceTab({ label, isActive, onClick, color }: SourceTabProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative px-4 md:px-6 py-2.5 md:py-3 font-mono text-[10px] md:text-xs font-bold tracking-wider
        transition-all duration-300 min-h-[44px]
        ${isActive
          ? 'text-black'
          : 'text-white/60 hover:text-white border border-white/20 hover:border-white/40'
        }
      `}
      style={{
        backgroundColor: isActive ? color : 'transparent'
      }}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute -bottom-1 left-1/2 w-2 h-2 -translate-x-1/2 rotate-45"
          style={{ backgroundColor: color }}
        />
      )}
    </motion.button>
  );
}
