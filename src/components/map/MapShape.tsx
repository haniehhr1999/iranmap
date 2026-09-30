import { Polygon } from "react-leaflet";

// نوع props کامپوننت
type MapShapeProps = {
  // لیست مختصات نقاطی که باید به هم وصل شوند
  points: [number, number][];
};

// کامپوننت مسئول رسم چندضلعی روی نقشه
const MapShape = ({ points }: MapShapeProps) => {
  // برای رسم Polygon حداقل 3 نقطه لازم است
  if (points.length < 3) {
    return null;
  }

  return (
    <Polygon
      // مختصات رأس‌های چندضلعی
      positions={points}
      // استایل چندضلعی
      pathOptions={{
        // رنگ خط دور Shape
        color: "#a10000",

        // ضخامت خط دور
        weight: 1.5,

        // فعال بودن رنگ داخلی
        fill: true,

        // رنگ داخل Shape
        fillColor: "#f63b3b",

        // شفافیت رنگ داخل
        fillOpacity: 0.4,
      }}
    />
  );
};

export default MapShape;
