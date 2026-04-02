'use client';

import { Globe3D } from '@/components/ui/3d-globe';

const LATAM_MARKERS = [
  { lat: -34.6037, lng: -58.3816, src: 'https://assets.aceternity.com/avatars/11.webp', label: 'Buenos Aires' },
  { lat: -23.5505, lng: -46.6333, src: 'https://assets.aceternity.com/avatars/8.webp', label: 'São Paulo' },
  { lat: 19.4326, lng: -99.1332, src: 'https://assets.aceternity.com/avatars/1.webp', label: 'Ciudad de México' },
  { lat: 4.7110, lng: -74.0721, src: 'https://assets.aceternity.com/avatars/2.webp', label: 'Bogotá' },
  { lat: -33.4489, lng: -70.6693, src: 'https://assets.aceternity.com/avatars/3.webp', label: 'Santiago' },
  { lat: -12.0464, lng: -77.0428, src: 'https://assets.aceternity.com/avatars/4.webp', label: 'Lima' },
  { lat: -34.9011, lng: -56.1645, src: 'https://assets.aceternity.com/avatars/5.webp', label: 'Montevideo' },
  { lat: 10.4806, lng: -66.9036, src: 'https://assets.aceternity.com/avatars/6.webp', label: 'Caracas' },
  { lat: 40.7128, lng: -74.006, src: 'https://assets.aceternity.com/avatars/7.webp', label: 'New York' },
  { lat: 48.8566, lng: 2.3522, src: 'https://assets.aceternity.com/avatars/9.webp', label: 'Paris' },
  { lat: 35.6762, lng: 139.6503, src: 'https://assets.aceternity.com/avatars/10.webp', label: 'Tokyo' },
];

export default function GlobeWrapper() {
  return (
    <Globe3D
      markers={LATAM_MARKERS}
      config={{
        atmosphereColor: '#4da6ff',
        atmosphereIntensity: 18,
        bumpScale: 5,
        autoRotateSpeed: 0.4,
      }}
    />
  );
}
