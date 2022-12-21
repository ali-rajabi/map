import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Image from 'next/image';

import MapSearchInput from './MapSearchInput';
import MapEvents from './MapEvents';

import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

interface Center {
  lat: number;
  lng: number;
}

const Map: React.FC = () => {
  const [center, setCenter] = useState<Center>({
    lat: 35.724544,
    lng: 51.267683,
  });
  const { lat, lng } = center;

  return (
    <div className={styles.mapWrapper}>
      <MapSearchInput setCenter={setCenter} />
      <MapContainer center={[lat, lng]} zoom={13}>
        <TileLayer url='https://raster.snappmaps.ir/styles/snapp-style/{z}/{x}/{y}{r}.png' />
        <Image
          src='/marker-icon.png'
          alt='Marker'
          width={50}
          height={50}
          className={styles.marker}
        />
        <MapEvents lat={lat} lng={lng} />
      </MapContainer>
    </div>
  );
};

export default Map;
