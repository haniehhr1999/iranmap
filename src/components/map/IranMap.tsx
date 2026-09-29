import { useEffect, useState } from "react";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import type { FeatureCollection } from "geojson";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import IranMask from "./IranMask";
import IranBorder from "./IranBorder";
import MapShapeButton from "./MapShapeButton";
import MapCircleButton from "./MapCircleButton";



const iranBounds = L.latLngBounds([24.5, 43.5], [40, 63.5]);

const IranMap = () => {
  const [iranData, setIranData] = useState<FeatureCollection | null>(null);

  const [shapePoints, setShapePoints] = useState<[number, number][]>([]);

  useEffect(() => {
    const loadIranGeoJson = async () => {
      try {
        const response = await fetch("/data/iran.geojson");

        if (!response.ok) {
          throw new Error("Could not load iran.geojson");
        }

        const data = (await response.json()) as FeatureCollection;

        setIranData(data);
      } catch (error) {
        console.error("Iran GeoJSON error:", error);
      }
    };

    loadIranGeoJson();
  }, []);

  return (
    <div
      style={{
        position: "relative",

        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Shape button */}
      <MapShapeButton onCreateShape={setShapePoints} />

      {/* Circle button */}
      <MapCircleButton />

      {/* Map */}
      <MapContainer
        bounds={iranBounds}
        boundsOptions={{
          padding: [30, 30],
        }}
        maxBounds={[
          [22, 41],
          [42, 67],
        ]}
        maxBoundsViscosity={1}
        minZoom={5}
        maxZoom={18}
        style={{
          width: "100%",
          height: "100%",

          backgroundColor: "#e5e7eb",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap
        />

        {/* Iran mask + border */}
        {iranData && (
          <>
            <IranMask data={iranData} />

            <IranBorder data={iranData} />
          </>
        )}

        {/* User selected shape */}
        {shapePoints.length >= 3 && (
          <Polygon
            positions={shapePoints}
            pathOptions={{
              color: "#2563eb",
              weight: 3,
              fill: true,
              fillColor: "#3b82f6",
              fillOpacity: 0.4,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default IranMap;
