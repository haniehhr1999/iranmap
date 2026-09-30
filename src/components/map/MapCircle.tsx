import { Circle, CircleMarker } from "react-leaflet";

import type { DataModel } from "../../models";

// نوع props کامپوننت
type Props = {
  // اطلاعات شهر انتخاب‌شده
  city: DataModel;
};

// کامپوننت مسئول رسم محدوده دایره‌ای و نقطه مرکز شهر
const MapCircle = ({ city }: Props) => {
  return (
    <>
      {/* رسم محدوده دایره‌ای اطراف شهر */}
      <Circle
        // مختصات مرکز دایره
        center={city.latlng}
        // شعاع دایره بر حسب متر
        radius={city.affectR}
        // استایل دایره
        pathOptions={{
          // رنگ خط دور دایره
          color: "#ff2d2d",

          // ضخامت خط دور دایره
          weight: 4,

          // رنگ داخل دایره
          fillColor: "#ff7da8",

          // شفافیت رنگ داخل دایره
          fillOpacity: 0.5,
        }}
      />

      {/* نمایش نقطه دقیق مرکز شهر */}
      <CircleMarker
        // مختصات مرکز شهر
        center={city.latlng}
        // اندازه نقطه بر حسب پیکسل
        radius={5}
        // استایل نقطه مرکزی
        pathOptions={{
          // رنگ خط دور نقطه
          color: "#ff2d2d",

          // رنگ داخل نقطه
          fillColor: "#ff2d2d",

          // نقطه کاملاً پر باشد
          fillOpacity: 1,
        }}
      />
    </>
  );
};

export default MapCircle;
