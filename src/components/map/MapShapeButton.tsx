import { useState } from "react";

import Select, { type MultiValue } from "react-select";

import { dataCollection, type DataModel } from "../../models";

import { showToast } from "../../utils/toast";
import { sortPointsAroundCenter } from "../../utils/geometry";

// نوع props کامپوننت
type MapShapeButtonProps = {
  // ارسال نقاط مرتب‌شده برای رسم Shape
  onCreateShape: (points: [number, number][]) => void;

  // پاک کردن Shape از روی نقشه
  onResetShape: () => void;
};

// ساختار هر گزینه داخل Multi Select
type CityOption = {
  // نامی که به کاربر نمایش داده می‌شود
  label: string;

  // مقدار داخلی گزینه
  value: string;

  // اطلاعات کامل شهر
  data: DataModel;
};

// تبدیل داده شهرها به فرمت قابل استفاده در react-select
const cityOptions: CityOption[] = dataCollection.map((item) => ({
  label: item.city,
  value: item.city,
  data: item,
}));

// کامپوننت انتخاب چند شهر برای رسم Shape
const MapShapeButton = ({
  onCreateShape,
  onResetShape,
}: MapShapeButtonProps) => {
  // کنترل باز یا بسته بودن پنل
  const [isOpen, setIsOpen] = useState(false);

  // نگهداری شهرهای انتخاب‌شده
  const [selectedCities, setSelectedCities] = useState<CityOption[]>([]);

  // مدیریت تغییر انتخاب‌ها در Multi Select
  const handleChange = (newValue: MultiValue<CityOption>) => {
    // تبدیل مقدار readonly به آرایه معمولی
    setSelectedCities([...newValue]);
  };

  // ساخت Shape بعد از زدن دکمه OK
  const handleSubmit = () => {
    // برای ساخت Polygon حداقل 3 نقطه لازم است
    if (selectedCities.length < 3) {
      showToast("حداقل باید سه استان انتخاب کنید", "error");

      return;
    }

    // استخراج مختصات شهرهای انتخاب‌شده
    const points: [number, number][] = selectedCities.map(
      (item) => item.data.latlng,
    );

    // مرتب کردن نقاط برای جلوگیری از تداخل خطوط
    const sortedPoints = sortPointsAroundCenter(points);

    // ارسال نقاط نهایی به کامپوننت والد
    onCreateShape(sortedPoints);

    // بستن پنل بعد از ساخت Shape
    setIsOpen(false);
  };

  // ریست انتخاب‌ها و Shape
  const handleReset = () => {
    // پاک کردن انتخاب‌های Multi Select
    setSelectedCities([]);

    // پاک کردن Shape روی نقشه
    onResetShape();
  };

  return (
    <>
      {/* دکمه باز و بسته کردن پنل Shape */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          position: "absolute",

          top: "20px",

          right: "20px",

          // قرار گرفتن روی لایه‌های نقشه
          zIndex: 10000,

          minWidth: "120px",

          padding: "12px 20px",

          backgroundColor: "#111827",

          color: "#ffffff",

          border: "none",

          borderRadius: "8px",

          cursor: "pointer",

          fontSize: "14px",

          fontWeight: 600,

          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        Map Shape
      </button>

      {/* نمایش پنل فقط در حالت باز */}
      {isOpen && (
        <div
          style={{
            position: "absolute",

            top: "70px",

            right: "20px",

            width: "350px",

            zIndex: 10001,

            padding: "16px",

            backgroundColor: "#ffffff",

            borderRadius: "10px",

            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",

            // راست‌چین برای متن فارسی
            direction: "rtl",
          }}
        >
          {/* عنوان پنل */}
          <div
            style={{
              marginBottom: "12px",

              fontSize: "14px",

              fontWeight: 600,
            }}
          >
            مراکز استان‌ها را انتخاب کنید
          </div>

          {/* Multi Select انتخاب شهرها */}
          <Select<CityOption, true>
            isMulti
            options={cityOptions}
            value={selectedCities}
            onChange={handleChange}
            placeholder="انتخاب کنید..."
            closeMenuOnSelect={false}
            noOptionsMessage={() => "موردی پیدا نشد"}
            // نمایش منوی Select خارج از لایه Leaflet
            menuPortalTarget={document.body}
            styles={{
              // راست‌چین کردن Select
              container: (base) => ({
                ...base,

                direction: "rtl",
              }),

              // جلوگیری از افتادن منو پشت نقشه
              menuPortal: (base) => ({
                ...base,

                zIndex: 99999,
              }),
            }}
          />

          {/* دکمه‌های عملیات */}
          <div
            style={{
              display: "flex",

              gap: "10px",

              marginTop: "14px",
            }}
          >
            {/* دکمه ساخت Shape */}
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                flex: 1,

                padding: "10px",

                backgroundColor: "#111827",

                color: "#ffffff",

                border: "none",

                borderRadius: "7px",

                cursor: "pointer",

                fontSize: "14px",

                fontWeight: 600,
              }}
            >
              OK
            </button>

            {/* دکمه ریست انتخاب‌ها */}
            <button
              type="button"
              onClick={handleReset}
              style={{
                flex: 1,

                padding: "10px",

                backgroundColor: "#ef4444",

                color: "#ffffff",

                border: "none",

                borderRadius: "7px",

                cursor: "pointer",

                fontSize: "14px",

                fontWeight: 600,
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MapShapeButton;
