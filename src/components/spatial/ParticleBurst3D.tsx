import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleBurst3DProps {
  position: [number, number, number];
  color?: string;
  count?: number;
  duration?: number; // ms
  onComplete?: () => void;
  containerClassName?: string;
  standalone?: boolean; // Whether to include Canvas wrapper
}

// This is the core component that must be used inside a Canvas
function ParticleBurstCore({ position, color = '#ff5252', count = 32, duration = 700, onComplete }: Omit<ParticleBurst3DProps, 'containerClassName' | 'standalone'>) {
  const pointsRef = useRef<THREE.Points>(null);
  // Generate random directions for each particle
  const directions = Array.from({ length: count }, () => {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.random() * Math.PI;
    const r = 1 + Math.random() * 0.5;
    return [
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    ];
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);
    return () => clearTimeout(timeout);
  }, [duration, onComplete]);

  // Animate particles outward using useFrame instead of requestAnimationFrame
  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = (performance.now() % duration) / duration;
    
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = directions[i][0] * time;
      positions[i * 3 + 1] = directions[i][1] * time;
      positions[i * 3 + 2] = directions[i][2] * time;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Initial positions at the origin
  const positions = new Float32Array(count * 3);
  positions.fill(0);

  return (
    <group position={position}>
      <Points ref={pointsRef} positions={positions} frustumCulled={false}>
        <PointMaterial color={color} size={0.15} sizeAttenuation depthWrite={false} transparent opacity={0.8} />
      </Points>
    </group>
  );
}

// This is the wrapper component that can be used anywhere
export default function ParticleBurst3D({ position, color, count, duration, onComplete, containerClassName = '', standalone = true }: ParticleBurst3DProps) {
  // If standalone is true, wrap in Canvas; otherwise just return the core component
  if (standalone) {
    return (
      <div className={`w-full h-full ${containerClassName}`}>
        <Canvas>
          <ParticleBurstCore 
            position={position} 
            color={color} 
            count={count} 
            duration={duration} 
            onComplete={onComplete} 
          />
        </Canvas>
      </div>
    );
  }
  
  // Return just the core component for use inside existing Canvas
  return (
    <ParticleBurstCore 
      position={position} 
      color={color} 
      count={count} 
      duration={duration} 
      onComplete={onComplete} 
    />
  );
} 