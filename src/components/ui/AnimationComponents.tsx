import React from "react";
import { motion } from "framer-motion";

interface YogurtSwirlProps {
  color: string;
}

export const YogurtSwirl: React.FC<YogurtSwirlProps> = ({ color }) => (
  <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
    <div 
      className="yogurt-swirl"
      style={{ 
        backgroundImage: `conic-gradient(from 0deg at 50% 50%, ${color}00, ${color}, ${color}00)`
      }}
    ></div>
  </div>
);

export const ProbioticBubbles: React.FC<{ count?: number }> = ({ count = 20 }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {Array.from({ length: count }).map((_, i) => (
      <div 
        key={i}
        className="probiotic-bubble absolute rounded-full"
        style={{
          width: `${Math.random() * 20 + 5}px`,
          height: `${Math.random() * 20 + 5}px`,
          left: `${Math.random() * 100}%`,
          bottom: `-${Math.random() * 20 + 5}px`,
          backgroundColor: i % 3 === 0 ? 'var(--color-primary)' : i % 3 === 1 ? 'var(--color-accent)' : 'var(--color-tertiary)',
          opacity: Math.random() * 0.5 + 0.1,
          animationDuration: `${Math.random() * 10 + 5}s`,
          animationDelay: `${Math.random() * 5}s`
        }}
      ></div>
    ))}
  </div>
);

export const MilkSplash: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="milk-splash"></div>
  </div>
);

export const WaveDivider: React.FC<{ color?: string; flipY?: boolean }> = ({ color = 'white', flipY = false }) => (
  <div className={`wave-divider ${flipY ? 'transform rotate-180' : ''}`}>
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path 
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
        style={{ fill: color }}
      ></path>
    </svg>
  </div>
); 