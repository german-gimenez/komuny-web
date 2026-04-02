'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.0018;
    if (wireRef.current) wireRef.current.rotation.y += 0.0018;
  });

  return (
    <group>
      {/* Main sphere */}
      <Sphere ref={meshRef} args={[1.52, 64, 64]}>
        <meshStandardMaterial
          color="#C85A26"
          roughness={0.75}
          metalness={0.05}
        />
      </Sphere>

      {/* Wireframe latitude/longitude overlay */}
      <Sphere ref={wireRef} args={[1.55, 24, 24]}>
        <meshBasicMaterial
          color="#1A1208"
          wireframe
          transparent
          opacity={0.08}
        />
      </Sphere>

      {/* Subtle glow rim */}
      <Sphere args={[1.65, 32, 32]}>
        <meshBasicMaterial
          color="#D4622A"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

export default function Globe3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.6], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 4]} intensity={1.2} />
      <directionalLight position={[-4, -2, -3]} intensity={0.2} color="#FBE9DF" />
      <GlobeMesh />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </Canvas>
  );
}
