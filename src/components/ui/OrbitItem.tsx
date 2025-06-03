import React, { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface OrbitItemProps {
  link: {
    name: string;
    path: string;
  };
  index: number;
  total: number;
  isActive: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function OrbitItem({ 
  link, 
  index, 
  total, 
  isActive, 
  isHovered, 
  onHover, 
  onLeave 
}: OrbitItemProps) {
  const navigate = useNavigate();
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Spring animation for hover state
  const springConfig = { stiffness: 300, damping: 20 };
  const scale = useSpring(1, springConfig);
  const y = useSpring(0, springConfig);
  const glowOpacity = useSpring(0, springConfig);
  
  useEffect(() => {
    scale.set(isHovered || isActive ? 1.2 : 1);
    y.set(isHovered || isActive ? -8 : 0);
    glowOpacity.set(isHovered || isActive ? 0.8 : 0);
  }, [isHovered, isActive, scale, y, glowOpacity]);
  
  const handleClick = () => {
    navigate(link.path);
  };
  
  return (
    <motion.div
      ref={itemRef}
      className={`orbit-item ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
      style={{
        left: `${(index / (total - 1)) * 100}%`,
        scale,
        y
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <motion.div 
        className="orbit-glow"
        style={{ opacity: glowOpacity }}
      />
      
      {/* Orbit sphere */}
      <motion.div 
        className="orbit-sphere"
        initial={{
          backgroundColor: "var(--color-surface)",
          border: "2px solid var(--color-border)"
        }}
        animate={{
          backgroundColor: isActive 
            ? "var(--color-primary)" 
            : "var(--color-surface)",
          border: isActive 
            ? "2px solid var(--color-primary)" 
            : "2px solid var(--color-border)",
          boxShadow: isHovered && !isActive
            ? "0 0 8px rgba(0, 0, 0, 0.1)"
            : "none"
        }}
      />
      
      {/* Label */}
      <motion.span 
        className="orbit-label"
        style={{ 
          fontFamily: "var(--font-display)",
          fontSize: "0.9rem"
        }}
        initial={{
          color: "var(--color-text)",
          fontWeight: 400
        }}
        animate={{
          color: isActive 
            ? "var(--color-primary)" 
            : isHovered
              ? "var(--color-primary)"
              : "var(--color-text)",
          fontWeight: isActive ? 600 : 400,
          y: isHovered && !isActive ? -2 : 0
        }}
      >
        {link.name}
      </motion.span>
    </motion.div>
  );
}

export default OrbitItem; 