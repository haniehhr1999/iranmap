import { useState } from "react";
import Select, { type SingleValue } from "react-select";
import { dataCollection, type DataModel } from "../../models";

type MapCircleButtonProps = {
  onSelectCity: (city: DataModel | null) => void;
};

type CityOption = {
  label: string;
  value: string;
  data: DataModel;
};

const cityOptions: CityOption[] = dataCollection.map((item) => ({
  label: item.city,
  value: item.city,
  data: item,
}));

const MapCircleButton = ({ onSelectCity }: MapCircleButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

  const handleChange = (option: SingleValue<CityOption>) => {
    setSelectedCity(option);

    if (!option) {
      onSelectCity(null);
      return;
    }

    onSelectCity(option.data);

    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          position: "absolute",
          top: "75px",
          right: "20px",
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

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "125px",
            right: "20px",
            width: "320px",
            zIndex: 10001,
            padding: "16px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            direction: "rtl",
          }}
        >
          <div
            style={{
              marginBottom: "10px",

              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            مرکز استان را انتخاب کنید
          </div>

          <Select<CityOption, false>
            options={cityOptions}
            value={selectedCity}
            onChange={handleChange}
            placeholder="انتخاب مرکز استان..."
            isClearable
            noOptionsMessage={() => "موردی پیدا نشد"}
            menuPortalTarget={document.body}
            styles={{
              container: (base) => ({
                ...base,
                direction: "rtl",
              }),

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
