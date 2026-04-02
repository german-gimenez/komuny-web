'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

export interface GlobeMarker {
  lat: number;
  lng: number;
  src: string;
  label: string;
}

interface GlobeConfig {
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  bumpScale?: number;
  autoRotateSpeed?: number;
}

interface Globe3DProps {
  markers?: GlobeMarker[];
  config?: GlobeConfig;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
  className?: string;
}

const RADIUS = 1.5;

function latLngTo3D(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

const ATM_VERT = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATM_FRAG = `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.75 - dot(vNormal, vec3(0.0, 0.0, 1.0)), uIntensity);
    gl_FragColor = vec4(uColor, 1.0) * intensity;
  }
`;

function Earth({ bumpScale = 5 }: { bumpScale?: number }) {
  const [colorMap, bumpMap] = useLoader(THREE.TextureLoader, [
    '/textures/earth.jpg',
    '/textures/earth-bump.jpg',
  ]);

  return (
    <mesh>
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <meshPhongMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={bumpScale * 0.0008}
        shininess={10}
        specular={new THREE.Color(0x222222)}
      />
    </mesh>
  );
}

function Atmosphere({
  color = '#4da6ff',
  intensity = 20,
}: {
  color?: string;
  intensity?: number;
}) {
  return (
    <mesh>
      <sphereGeometry args={[RADIUS * 1.18, 32, 32]} />
      <shaderMaterial
        vertexShader={ATM_VERT}
        fragmentShader={ATM_FRAG}
        uniforms={{
          uColor: { value: new THREE.Color(color) },
          uIntensity: { value: Math.max(0.5, intensity * 0.1) },
        }}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function MarkerPoint({
  marker,
  onClick,
  onHover,
}: {
  marker: GlobeMarker;
  onClick?: (m: GlobeMarker) => void;
  onHover?: (m: GlobeMarker | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const pos = latLngTo3D(marker.lat, marker.lng, RADIUS + 0.02);

  return (
    <group position={[pos.x, pos.y, pos.z]}>
      <Html center distanceFactor={6} zIndexRange={[100, 0]} style={{ pointerEvents: 'auto' }}>
        <div
          onClick={() => onClick?.(marker)}
          onMouseEnter={() => { setHovered(true); onHover?.(marker); }}
          onMouseLeave={() => { setHovered(false); onHover?.(null); }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            gap: '0',
          }}
        >
          {/* Avatar */}
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            border: `2px solid ${hovered ? '#fff' : 'rgba(255,255,255,0.75)'}`,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.55)',
            transition: 'transform 0.18s ease',
            transform: hovered ? 'scale(1.22)' : 'scale(1)',
            background: '#1a1a2e',
            flexShrink: 0,
          }}>
            <img
              src={marker.src}
              alt={marker.label}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          {/* Spike */}
          <div style={{
            width: '1.5px',
            height: '12px',
            background: 'rgba(255,255,255,0.55)',
          }} />
          {/* Tooltip */}
          {hovered && (
            <div style={{
              position: 'absolute',
              top: '-28px',
              background: 'rgba(0,0,0,0.85)',
              color: '#fff',
              fontSize: '10px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              padding: '2px 7px',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}>
              {marker.label}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

function GlobeScene({
  markers = [],
  config = {},
  onMarkerClick,
  onMarkerHover,
}: {
  markers?: GlobeMarker[];
  config?: GlobeConfig;
  onMarkerClick?: (m: GlobeMarker) => void;
  onMarkerHover?: (m: GlobeMarker | null) => void;
}) {
  const {
    atmosphereColor = '#4da6ff',
    atmosphereIntensity = 20,
    bumpScale = 5,
    autoRotateSpeed = 0.3,
  } = config;

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.8} />
      <directionalLight position={[-3, -1, -3]} intensity={0.12} color="#aaccff" />
      <Suspense fallback={null}>
        <Earth bumpScale={bumpScale} />
        <Atmosphere color={atmosphereColor} intensity={atmosphereIntensity} />
        {markers.map((marker, i) => (
          <MarkerPoint
            key={i}
            marker={marker}
            onClick={onMarkerClick}
            onHover={onMarkerHover}
          />
        ))}
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={autoRotateSpeed}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
      />
    </>
  );
}

export function Globe3D({
  markers,
  config,
  onMarkerClick,
  onMarkerHover,
  className,
}: Globe3DProps) {
  return (
    <div className={cn('w-full h-full', className)} style={{ background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0.3, 4.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); }}
        style={{ background: 'transparent' }}
      >
        <GlobeScene
          markers={markers}
          config={config}
          onMarkerClick={onMarkerClick}
          onMarkerHover={onMarkerHover}
        />
      </Canvas>
    </div>
  );
}
