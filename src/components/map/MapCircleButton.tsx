import { useState } from "react";

import Select, { type SingleValue } from "react-select";

import { dataCollection, type DataModel } from "../../models";

// نوع props کامپوننت
type MapCircleButtonProps = {
  // ارسال شهر انتخاب‌شده به کامپوننت والد
  onSelectCity: (city: DataModel | null) => void;
};

// ساختار هر گزینه داخل Select
type CityOption = {
  // متنی که به کاربر نمایش داده می‌شود
  label: string;

  // مقدار داخلی هر گزینه
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

// کامپوننت دکمه انتخاب شهر برای رسم Circle
const MapCircleButton = ({ onSelectCity }: MapCircleButtonProps) => {
  // کنترل باز یا بسته بودن پنل انتخاب شهر
  const [isOpen, setIsOpen] = useState(false);

  // نگهداری شهر انتخاب‌شده در Select
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

  // مدیریت تغییر مقدار Select
  const handleChange = (option: SingleValue<CityOption>) => {
    // ذخیره گزینه انتخاب‌شده
    setSelectedCity(option);

    // اگر Select پاک شد، مقدار null به والد ارسال می‌شود
    if (!option) {
      onSelectCity(null);

      return;
    }

    // ارسال اطلاعات کامل شهر به کامپوننت والد
    onSelectCity(option.data);

    // بستن پنل بعد از انتخاب شهر
    setIsOpen(false);
  };

  return (
    <>
      {/* دکمه باز و بسته کردن پنل */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          // قرارگیری روی نقشه
          position: "absolute",

          // فاصله از بالای صفحه
          top: "75px",

          // فاصله از سمت راست
          right: "20px",

          // نمایش روی لایه‌های Leaflet
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

          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        Map Circle
      </button>

      {/* نمایش پنل فقط در حالت باز */}
      {isOpen && (
        <div
          style={{
            // قرارگیری پنل روی نقشه
            position: "absolute",

            top: "125px",

            right: "20px",

            width: "320px",

            // بالاتر از لایه‌های نقشه
            zIndex: 10001,

            padding: "16px",

            backgroundColor: "#ffffff",

            borderRadius: "10px",

            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",

            // راست‌چین برای متن فارسی
            direction: "rtl",
          }}
        >
          {/* عنوان پنل */}
          <div
            style={{
              marginBottom: "10px",

              fontSize: "14px",

              fontWeight: 600,
            }}
          >
            مرکز استان را انتخاب کنید
          </div>

          {/* Select تک‌انتخابی */}
          <Select<CityOption, false>
            // گزینه‌های شهرها
            options={cityOptions}
            // مقدار فعلی Select
            value={selectedCity}
            // اجرای تابع هنگام انتخاب
            onChange={handleChange}
            placeholder="انتخاب مرکز استان..."
            // امکان پاک کردن انتخاب
            isClearable
            // متن زمانی که نتیجه‌ای پیدا نشد
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
        </div>
      )}
    </>
  );
};

export default MapCircleButton;
