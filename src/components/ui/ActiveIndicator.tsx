import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ActiveIndicatorProps {
  activeItem: string | null;
  navLinks: Array<{ name: string; path: string }>;
}

export default function ActiveIndicator({ activeItem, navLinks }: ActiveIndicatorProps) {
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!activeItem) return;
    
    const activeIndex = navLinks.findIndex(link => link.name === activeItem);
    if (activeIndex < 0) return;
    
    // Calculate position along the orbit track
    const x = (activeIndex / (navLinks.length - 1)) * 100;
    setTargetPosition({ x, y: 0 });
  }, [activeItem, navLinks]);
  
  if (!activeItem) return null;
  
  return (
    <motion.div 
      className="active-indicator"
      initial={{ left: `${targetPosition.x}%`, y: targetPosition.y, opacity: 0, scale: 0.5 }}
      animate={{ 
        left: `${targetPosition.x}%`,
        y: targetPosition.y,
        opacity: 1, 
        scale: 1 
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
    >
      <svg width="20" height="20" viewBox="0 0 30 30">
        <motion.path 
          d="M15 0 L30 15 L15 30 L0 15 Z"
          fill="var(--color-primary)"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatType: "loop",
            ease: "easeInOut" 
          }}
        />
      </svg>
    </motion.div>
  );
} 