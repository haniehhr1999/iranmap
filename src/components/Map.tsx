import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const position: [number, number] = [35.6892, 51.389];

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>Tehran</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;