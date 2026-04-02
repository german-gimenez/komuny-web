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
  const meshRef = useRef<THREE.Mesh>(null);
  const [colorMap, bumpMap] = useLoader(THREE.TextureLoader, [
    'https://unpkg.com/three-globe@2.33.0/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe@2.33.0/example/img/earth-topology.png',
  ]);

  return (
    <mesh ref={meshRef} renderOrder={0}>
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <meshPhongMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={bumpScale * 0.001}
        shininess={12}
        specular={new THREE.Color(0x333333)}
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
    <mesh renderOrder={1}>
      <sphereGeometry args={[RADIUS * 1.18, 32, 32]} />
      <shaderMaterial
        vertexShader={ATM_VERT}
        fragmentShader={ATM_FRAG}
        uniforms={{
          uColor: { value: new THREE.Color(color) },
          uIntensity: { value: Math.max(1, intensity * 0.1) },
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
      <Html center distanceFactor={8} zIndexRange={[10, 0]} style={{ pointerEvents: 'auto' }}>
        <div
          onClick={() => onClick?.(marker)}
          onMouseEnter={() => { setHovered(true); onHover?.(marker); }}
          onMouseLeave={() => { setHovered(false); onHover?.(null); }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            cursor: 'pointer',
            transform: 'translateY(-50%)',
          }}
        >
          {/* Spike line */}
          <div style={{
            width: '1px',
            height: '14px',
            background: 'rgba(255,255,255,0.6)',
            marginBottom: '1px',
          }} />
          {/* Avatar */}
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: `2px solid ${hovered ? '#fff' : 'rgba(255,255,255,0.7)'}`,
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
            transition: 'transform 0.18s ease, border-color 0.18s ease',
            transform: hovered ? 'scale(1.25)' : 'scale(1)',
            background: 'rgba(0,0,0,0.3)',
            flexShrink: 0,
          }}>
            <img
              src={marker.src}
              alt={marker.label}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          {/* Tooltip */}
          {hovered && (
            <div style={{
              background: 'rgba(0,0,0,0.82)',
              color: '#fff',
              fontSize: '10px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              padding: '3px 7px',
              borderRadius: '5px',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.12)',
              marginTop: '2px',
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
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.8} />
      <directionalLight position={[-5, -2, -3]} intensity={0.15} color="#aaddff" />
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
        camera={{ position: [0, 0.5, 4], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
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
