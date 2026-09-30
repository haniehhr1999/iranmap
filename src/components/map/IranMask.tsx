import { Polygon } from "react-leaflet";

import type { FeatureCollection, Position } from "geojson";

import type { LatLngExpression } from "leaflet";

// نوع props کامپوننت
type Props = {
  // داده GeoJSON مربوط به مرز ایران
  data: FeatureCollection;
};

// یک Polygon بسیار بزرگ برای پوشاندن کل نقشه جهان
const WORLD_MASK: LatLngExpression[] = [
  [-85.05112878, -179.9999],
  [-85.05112878, 179.9999],
  [85.05112878, 179.9999],
  [85.05112878, -179.9999],

  // بستن Polygon با تکرار نقطه اول
  [-85.05112878, -179.9999],
];

// تبدیل مختصات GeoJSON به فرمت قابل استفاده در Leaflet
const convertRing = (ring: Position[]): LatLngExpression[] => {
  return ring.map(([lng, lat]) => [lat, lng] as [number, number]);
};

// استخراج مرزهای ایران از GeoJSON
const getIranRings = (data: FeatureCollection): LatLngExpression[][] => {
  const rings: LatLngExpression[][] = [];

  // بررسی تمام Featureهای فایل GeoJSON
  data.features.forEach((feature) => {
    const geometry = feature.geometry;

    // اگر geometry وجود نداشت، این Feature را رد می‌کنیم
    if (!geometry) return;

    // اگر داده از نوع Polygon باشد
    if (geometry.type === "Polygon") {
      // اولین حلقه، مرز بیرونی Polygon است
      const outerRing = geometry.coordinates[0];

      // تبدیل مختصات و اضافه کردن به لیست مرزها
      rings.push(convertRing(outerRing));

      return;
    }

    // اگر داده از نوع MultiPolygon باشد
    if (geometry.type === "MultiPolygon") {
      geometry.coordinates.forEach((polygon) => {
        // مرز بیرونی هر Polygon
        const outerRing = polygon[0];

        // اضافه کردن هر بخش به لیست مرزها
        rings.push(convertRing(outerRing));
      });
    }
  });

  return rings;
};

// کامپوننت مسئول مخفی کردن تمام نقاط خارج از ایران
const IranMask = ({ data }: Props) => {
  // گرفتن تمام مرزهای ایران
  const iranRings = getIranRings(data);

  // اگر مرزی پیدا نشد چیزی نمایش نمی‌دهیم
  if (!iranRings.length) {
    console.error("No Polygon/MultiPolygon found");

    return null;
  }

  return (
    <Polygon
      // Polygon اول کل جهان است
      // Ringهای بعدی مرز ایران هستند
      positions={[WORLD_MASK, ...iranRings]}
      // Mask قابل کلیک نیست
      interactive={false}
      pathOptions={{
        // خط دور Mask نمایش داده نشود
        stroke: false,

        // فضای خارج ایران پر شود
        fill: true,

        // رنگ Mask
        fillColor: "#e5e7eb",

        // Mask کاملاً مات باشد
        fillOpacity: 1,

        // ایران به عنوان حفره داخل Mask باقی بماند
        fillRule: "evenodd",
      }}
    />
  );
};

export default IranMask;
