import {
  MapContainer,
  TileLayer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const iranBounds: [[number, number], [number, number]] = [
  [24.0, 44.0], // جنوب غربی
  [40.0, 64.0], // شمال شرقی
];

const Map = () => {
  return (
    <MapContainer
      center={[32.4279, 53.688]}
      zoom={5}
      minZoom={5}
      maxZoom={18}
      maxBounds={iranBounds}
      maxBoundsViscosity={1}
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}
      />
    </MapContainer>
  );
};

export default Map;