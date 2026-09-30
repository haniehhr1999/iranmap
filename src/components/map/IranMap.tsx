import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import type { FeatureCollection } from "geojson";
import type { DataModel } from "../../models";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import IranMask from "./IranMask";
import IranBorder from "./IranBorder";
import MapShapeButton from "./MapShapeButton";
import MapCircleButton from "./MapCircleButton";
import CircleFocus from "./CircleFocus";
import MapCircle from "./MapCircle";
import MapShape from "./MapShape";

const iranBounds = L.latLngBounds([24.5, 43.5], [40, 63.5]);

const IranMap = () => {
  const [iranData, setIranData] = useState<FeatureCollection | null>(null);
  const [shapePoints, setShapePoints] = useState<[number, number][]>([]);
  const [selectedCircleCity, setSelectedCircleCity] =
    useState<DataModel | null>(null);

  const handleResetShape = () => {
    setShapePoints([]);
  };

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
      <MapShapeButton
        onCreateShape={setShapePoints}
        onResetShape={handleResetShape}
      />

      {/* Circle button */}
      <MapCircleButton onSelectCity={setSelectedCircleCity} />

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
        <MapShape points={shapePoints} />

        {/* User selected circle */}
        {selectedCircleCity && (
          <>
            <MapCircle city={selectedCircleCity} />
            <CircleFocus city={selectedCircleCity} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default IranMap;
