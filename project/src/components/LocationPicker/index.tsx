
import { MapContainer, TileLayer } from 'react-leaflet';
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '../../config/constants';
import LocationMarker from './LocationMarker';
import 'leaflet/dist/leaflet.css';

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={DEFAULT_MAP_CENTER} // Properly typed as LatLngTuple
        zoom={DEFAULT_MAP_ZOOM}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
}
