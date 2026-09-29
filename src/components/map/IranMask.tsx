import { Polygon } from "react-leaflet";

import type {
  FeatureCollection,
  Position,
} from "geojson";

import type {
  LatLngExpression,
} from "leaflet";

type Props = {
  data: FeatureCollection;
};

/*
 * حداکثر Latitude قابل نمایش در Web Mercator
 * حدود 85.0511 درجه است.
 *
 * در نتیجه Mask کل جهان را می‌پوشاند.
 */
const WORLD_MASK: LatLngExpression[] = [
  [-85.05112878, -179.9999],
  [-85.05112878, 179.9999],
  [85.05112878, 179.9999],
  [85.05112878, -179.9999],
  [-85.05112878, -179.9999],
];

const convertRing = (
  ring: Position[]
): LatLngExpression[] => {
  return ring.map(([lng, lat]) => [
    lat,
    lng,
  ] as [number, number]);
};

const getIranRings = (
  data: FeatureCollection
): LatLngExpression[][] => {
  const rings: LatLngExpression[][] = [];

  data.features.forEach((feature) => {
    const geometry = feature.geometry;

    if (!geometry) return;

    // Polygon
    if (geometry.type === "Polygon") {
      const outerRing =
        geometry.coordinates[0];

      rings.push(
        convertRing(outerRing)
      );

      return;
    }

    // MultiPolygon
    if (geometry.type === "MultiPolygon") {
      geometry.coordinates.forEach(
        (polygon) => {
          const outerRing = polygon[0];

          rings.push(
            convertRing(outerRing)
          );
        }
      );
    }
  });

  return rings;
};

const IranMask = ({ data }: Props) => {
  const iranRings =
    getIranRings(data);

  if (!iranRings.length) {
    console.error(
      "No Polygon/MultiPolygon found"
    );

    return null;
  }

  return (
    <Polygon
      positions={[
        WORLD_MASK,
        ...iranRings,
      ]}
      interactive={false}
      pathOptions={{
        stroke: false,

        fill: true,
        fillColor: "#e5e7eb",
        fillOpacity: 1,

        fillRule: "evenodd",
      }}
    />
  );
};

export default IranMask;