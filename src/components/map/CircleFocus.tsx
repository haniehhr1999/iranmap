import { useEffect } from "react";
import { useMap } from "react-leaflet";

import type { DataModel } from "../../models";

// نوع props کامپوننت
type CircleFocusProps = {
  // شهر انتخاب‌شده برای فوکوس روی نقشه
  city: DataModel | null;
};

// کامپوننت مسئول زوم و فوکوس روی شهر انتخاب‌شده
const CircleFocus = ({ city }: CircleFocusProps) => {
  // گرفتن instance اصلی نقشه Leaflet
  const map = useMap();

  useEffect(() => {
    // اگر شهری انتخاب نشده باشد، کاری انجام نمی‌دهیم
    if (!city) return;

    // جدا کردن latitude و longitude شهر
    const [lat, lng] = city.latlng;

    // بررسی معتبر بودن مختصات و شعاع
    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng) ||
      !Number.isFinite(city.affectR)
    ) {
      console.error("Invalid city data:", city);

      return;
    }

    // حرکت نرم نقشه به سمت شهر انتخاب‌شده
    map.flyTo([lat, lng], 11, {
      // فعال کردن انیمیشن حرکت
      animate: true,

      // مدت زمان انیمیشن بر حسب ثانیه
      duration: 0.8,
    });
  }, [
    // با تغییر شهر، effect دوباره اجرا می‌شود
    city,

    // instance نقشه
    map,
  ]);

  // این کامپوننت UI ندارد و فقط رفتار نقشه را کنترل می‌کند
  return null;
};

export default CircleFocus;
