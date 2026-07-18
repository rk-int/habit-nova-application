'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// An animated node that auto-rotates and reacts to the mouse
function FloatingNode({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    // Auto-rotation
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.008;
    
    // Parallax movement based on mouse
    const targetX = mouse.current[0] * 1.5;
    const targetY = mouse.current[1] * 1.5;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.3, 120, 16]} />
      <meshStandardMaterial 
        color="#6366f1" 
        roughness={0.15} 
        metalness={0.9} 
        wireframe
      />
    </mesh>
  );
}

// Background particle cloud
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120;
  
  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 12;
    }
    return arr;
  });

  useFrame(() => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x += 0.0005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.07} 
        color="#0d9488" 
        sizeAttenuation 
        transparent 
        opacity={0.6} 
      />
    </points>
  );
}

export default function ThreeScene() {
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 h-full w-full opacity-60">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#0d9488" />
        <directionalLight position={[0, 5, 2]} intensity={0.5} />
        <FloatingNode mouse={mouse} />
        <Particles />
      </Canvas>
    </div>
  );
}
