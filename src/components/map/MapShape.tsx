import { Polygon } from "react-leaflet";

type MapShapeProps = {
  points: [number, number][];
};

const MapShape = ({ points }: MapShapeProps) => {
  if (points.length < 3) {
    return null;
  }

  return (
    <Polygon
      positions={points}
      pathOptions={{
        color: "#a10000",
        weight: 1.5,
        fill: true,
        fillColor: "#f63b3b",
        fillOpacity: 0.4,
      }}
    />
  );
};

export default MapShape;