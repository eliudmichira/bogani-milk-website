import React, { useRef, useState } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  model3D?: string;
}

// 3D Product Model Component using R3F
const ProductModel = ({
  item,
  isActive,
  onClick,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  isRemoving = false
}: {
  item: CartItem;
  isActive: boolean;
  onClick: (id: string) => void;
  position?: [number, number, number];
  scale?: [number, number, number];
  isRemoving?: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3 * (isActive ? 2 : 1);
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * (isActive ? 1.5 : 1)) * 0.1 + position[1];
      
      // Handle removing animation
      if (isRemoving && groupRef.current.scale.x > 0.1) {
        groupRef.current.scale.x -= delta * 2;
        groupRef.current.scale.y -= delta * 2;
        groupRef.current.scale.z -= delta * 2;
        groupRef.current.position.y += delta * 5;
      }
    }
  });
  
  const activeScale = hovered || isActive ? 
    [scale[0] * 1.15, scale[1] * 1.15, scale[2] * 1.15] as [number, number, number] : 
    scale;
  
  return (
    <group 
      ref={groupRef}
      position={position}
      scale={activeScale}
      onClick={(e: ThreeEvent<MouseEvent>) => { 
        e.stopPropagation(); 
        if (!isRemoving) onClick(item.id); 
      }}
      onPointerOver={(e: ThreeEvent<MouseEvent>) => { 
        e.stopPropagation(); 
        if (!isRemoving) setHovered(true); 
      }}
      onPointerOut={(e: ThreeEvent<MouseEvent>) => { 
        e.stopPropagation(); 
        if (!isRemoving) setHovered(false); 
      }}
    >
      {item.id === '1' ? (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 1.2, 1]} />
          <meshPhysicalMaterial color={item.color} roughness={0.4} metalness={0.1} />
        </mesh>
      ) : (
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.6, 1.2, 32]} />
          <meshPhysicalMaterial color={item.color} roughness={0.4} metalness={0.1} />
        </mesh>
      )}
      
      {isActive && (
        <mesh scale={[1.5, 1.5, 1.5]} position={[0, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="white" transparent opacity={0.5} wireframe />
        </mesh>
      )}
    </group>
  );
};

// Main Scene Component
const ProductScene3D: React.FC<{
  items: CartItem[];
  activeItemId: string | null;
  onItemClick: (id: string) => void;
  removingIds: string[];
}> = ({ items, activeItemId, onItemClick, removingIds }) => {
  return (
    <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }} style={{ touchAction: 'none' }}>
      <ProductSceneContent 
        items={items} 
        activeItemId={activeItemId} 
        onItemClick={onItemClick} 
        removingIds={removingIds} 
      />
    </Canvas>
  );
};

// Scene Content - Separated for better performance
const ProductSceneContent: React.FC<{
  items: CartItem[];
  activeItemId: string | null;
  onItemClick: (id: string) => void;
  removingIds: string[];
}> = ({ items, activeItemId, onItemClick, removingIds }) => {
  const isExpanded = items.length > 1;
  
  return (
    <>
      <ambientLight intensity={0.7} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
      <Environment preset="sunset" />
      
      <mesh receiveShadow position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
      
      <group position={[0, 0, 0]}>
        {items.map((item, index) => {
          const angle = (index / (items.length || 1)) * Math.PI * 2;
          const x = Math.cos(angle) * (isExpanded ? 2.5 : 0);
          const z = Math.sin(angle) * (isExpanded ? 2.5 : 0);
          const y = isExpanded ? Math.sin(index * 0.5) * 0.5 : 0;

          const isActive = item.id === activeItemId;
          const isRemoving = removingIds.includes(item.id);
          
          return (
            <ProductModel 
              key={item.id}
              item={item} 
              isActive={isActive} 
              onClick={onItemClick} 
              position={[x, y, z]} 
              isRemoving={isRemoving}
            />
          );
        })}
      </group>
      
      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        minDistance={3} 
        maxDistance={15} 
        autoRotate={!activeItemId} 
        autoRotateSpeed={0.5}
      />
    </>
  );
};

export default ProductScene3D; 