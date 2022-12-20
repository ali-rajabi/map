import { useMapEvents } from 'react-leaflet';

interface LatLngProps {
  lat: number;
  lng: number;
}

const MapEvents: React.FC<LatLngProps> = ({ lat, lng }) => {
  const getAddress = async (lat: number, lng: number): Promise<void> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/get-address?lat=${lat}&lng=${lng}`
      );
      const { address } = await response.json();
      const [city, street] = address;

      console.table({
        city,
        street,
        lat,
        lng,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const map = useMapEvents({
    click: (e) => {
      map.panTo(e?.latlng);
      const { lat, lng } = e?.latlng;
      getAddress(lat, lng);
    },
    dragend: () => {
      const { lat, lng } = map.getCenter();
      getAddress(lat, lng);
    },
  });

  map.panTo({ lat, lng }, { animate: true });
  return null;
};

export default MapEvents;
