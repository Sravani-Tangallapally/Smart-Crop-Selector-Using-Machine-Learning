import React from 'react';
import { Marker, useMapEvents } from 'react-leaflet';

interface LocationMarkerProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

export default function LocationMarker({ onLocationSelect }: LocationMarkerProps) {
  const [position, setPosition] = React.useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const newPosition: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(newPosition);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}
