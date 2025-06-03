import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Minus, Plus, Trash2 } from 'lucide-react';
import * as THREE from 'three';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ProductCard3DProps {
  item: CartItem;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
  position?: [number, number, number];
}
import { Group } from 'three';

export default function ProductCard3D({ item, onQuantityChange, onRemove, position = [0, 0, 0] }: ProductCard3DProps) {
  const meshRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  // Local state for scale/rotation
  const [scale, setScale] = useState(1);
  const [rotY, setRotY] = useState(0);

  // Try to safely use R3F hooks by handling errors
  try {
    useFrame(() => {
      // Subtle floating effect
      if (meshRef.current) {
        meshRef.current.position.y = 0.1 * Math.sin(Date.now() / 800 + position[0]);
        // Animate scale/rotation
        meshRef.current.scale.setScalar(scale);
        meshRef.current.rotation.y = rotY;
      }
    });
  } catch (error) {
    // Fallback for when not in a Canvas context
    useEffect(() => {
      let frameId: number;
      
      const animate = () => {
        if (meshRef.current) {
          meshRef.current.position.y = 0.1 * Math.sin(Date.now() / 800 + position[0]);
          meshRef.current.scale.setScalar(scale);
          meshRef.current.rotation.y = rotY;
        }
        frameId = requestAnimationFrame(animate);
      };
      
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }, [scale, rotY, position]);
  }

  // Handlers for hover/active
  const handlePointerOver = () => {
    setHovered(true);
    setScale(1.05);
    setRotY(0.2);
  };
  const handlePointerOut = () => {
    setHovered(false);
    setScale(1);
    setRotY(0);
  };
  const handleClick = () => {
    setActive((a) => !a);
    setScale((s) => (s === 1.1 ? 1.05 : 1.1));
  };

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      castShadow
      receiveShadow
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 0.2]} />
        <meshPhysicalMaterial color={hovered ? '#fff8e1' : '#fff'} roughness={0.3} metalness={0.1} clearcoat={0.7} />
      </mesh>
      {/* Product image as HTML overlay */}
      <Html position={[0, 0, 0.12]} center distanceFactor={2} className="pointer-events-auto">
        <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg bg-white/80 flex flex-col items-center justify-center">
          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mb-1" />
          <div className="font-bold text-sm text-gray-900">{item.name}</div>
          <div className="flex items-center gap-2 mt-1">
            <button onClick={() => onQuantityChange(item.id, item.quantity - 1)} className="p-1 rounded hover:bg-gray-100"><Minus size={14} /></button>
            <span className="font-mono text-base">{item.quantity}</span>
            <button onClick={() => onQuantityChange(item.id, item.quantity + 1)} className="p-1 rounded hover:bg-gray-100"><Plus size={14} /></button>
          </div>
          <div className="text-xs text-gray-500 mt-1">${item.price.toFixed(2)}</div>
          <button onClick={() => onRemove(item.id)} className="mt-1 p-1 rounded hover:bg-red-100 text-red-500"><Trash2 size={14} /></button>
        </div>
      </Html>
    </group>
  );
} 