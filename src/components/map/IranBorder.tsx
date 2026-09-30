import { GeoJSON } from "react-leaflet";

import type { FeatureCollection } from "geojson";

// نوع props کامپوننت
type Props = {
  // داده GeoJSON مربوط به مرز ایران
  data: FeatureCollection;
};

// کامپوننت مسئول نمایش خط مرزی ایران
const IranBorder = ({ data }: Props) => {
  return (
    <GeoJSON
      // داده GeoJSON که باید روی نقشه رسم شود
      data={data}
      // مرز ایران قابل کلیک نباشد
      interactive={false}
      // استایل نمایش مرز
      style={{
        // رنگ خط مرزی
        color: "#00167a",

        // ضخامت خط مرزی
        weight: 1,

        // میزان شفافیت خط
        opacity: 1,

        // داخل محدوده ایران پر نشود
        fill: false,

        // شفافیت رنگ داخلی صفر باشد
        fillOpacity: 0,
      }}
    />
  );
};

export default IranBorder;
