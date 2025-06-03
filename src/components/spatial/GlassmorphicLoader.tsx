import { motion } from 'framer-motion';

interface GlassmorphicLoaderProps {
  text?: string;
}

export default function GlassmorphicLoader({ text = "Preparing Your Cart" }: GlassmorphicLoaderProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-white/60 via-cream/60 to-berry/20 dark:from-dark-surface dark:via-dark-surface dark:to-dark-accent">
      <div className="glass-card relative flex flex-col items-center p-10 rounded-3xl shadow-2xl">
        <motion.div 
          className="loader-cube"
          animate={{
            rotateX: [0, 90, 180, 270, 360],
            rotateY: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ width: 64, height: 64, position: 'relative' }}
        >
          <div className="cube-face front absolute inset-0 bg-white/40 rounded-2xl shadow-lg" />
          <div className="cube-face back absolute inset-0 bg-berry/30 rounded-2xl" />
          <div className="cube-face left absolute inset-0 bg-yogurt-red/30 rounded-2xl" />
          <div className="cube-face right absolute inset-0 bg-cream/30 rounded-2xl" />
          <div className="cube-face top absolute inset-0 bg-white/20 rounded-2xl" />
          <div className="cube-face bottom absolute inset-0 bg-dark-surface/20 rounded-2xl" />
        </motion.div>
        <div className="loader-platform mt-6 w-32 h-3 bg-white/30 rounded-full blur-sm" />
        <div className="loader-text mt-6 text-lg font-bold text-yogurt-red dark:text-dark-accent tracking-wide">{text}</div>
      </div>
    </div>
  );
} 