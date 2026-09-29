import {
  useEffect,
  useState,
} from "react";

import {
  MapContainer,
  TileLayer,
} from "react-leaflet";

import type {
  FeatureCollection,
} from "geojson";

import "leaflet/dist/leaflet.css";

import IranMask from "./IranMask";
import IranBorder from "./IranBorder";

const IranMap = () => {
  const [iranData, setIranData] =
    useState<FeatureCollection | null>(null);

  useEffect(() => {
    const loadIranMap = async () => {
      try {
        const response = await fetch(
          "/data/iran.geojson"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load iran.geojson"
          );
        }

        const data =
          (await response.json()) as FeatureCollection;

        console.log(
          "Iran GeoJSON:",
          data
        );

        console.log(
          "Geometry:",
          data.features[0]?.geometry?.type
        );

        setIranData(data);
      } catch (error) {
        console.error(
          "GeoJSON loading error:",
          error
        );
      }
    };

    loadIranMap();
  }, []);

  const iranBounds: [
    [number, number],
    [number, number]
  ] = [
    [24.5, 43.5],
    [40, 63.5],
  ];

  return (
    <MapContainer
      bounds={iranBounds}
      boundsOptions={{
        padding: [20, 20],
      }}

      maxBounds={[
        [22, 41],
        [42, 67],
      ]}

      maxBoundsViscosity={1}

      minZoom={5}
      maxZoom={18}

      style={{
        width: "100vw",
        height: "100vh",

        // همین رنگ بیرون ایران دیده می‌شود
        backgroundColor: "#e5e7eb",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap
      />

      {iranData && (
        <>
          {/* اول Mask */}
          <IranMask
            data={iranData}
          />

          {/* بعد Border تا روی Mask قرار بگیرد */}
          <IranBorder
            data={iranData}
          />
        </>
      )}
    </MapContainer>
  );
};

export default IranMap;