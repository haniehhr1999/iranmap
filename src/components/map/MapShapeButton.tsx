import { useState } from "react";
import Select, { type MultiValue } from "react-select";

import { dataCollection, type DataModel } from "../../models";

import { showToast } from "../../utils/toast";
import { sortPointsAroundCenter } from "../../utils/geometry";

type MapShapeButtonProps = {
  onCreateShape: (points: [number, number][]) => void;
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

const MapShapeButton = ({ onCreateShape }: MapShapeButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedCities, setSelectedCities] = useState<CityOption[]>([]);

  const handleChange = (newValue: MultiValue<CityOption>) => {
    setSelectedCities([...newValue]);
  };

  const handleSubmit = () => {
    if (selectedCities.length < 3) {
      showToast("حداقل باید سه استان انتخاب کنید", "error");

      return;
    }

    const points: [number, number][] = selectedCities.map(
      (item) => item.data.latlng,
    );

    const sortedPoints = sortPointsAroundCenter(points);

    console.log("Original:", points);
    console.log("Sorted:", sortedPoints);

    onCreateShape(sortedPoints);

    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 10000,

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
        Map Shape
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "70px",
            right: "20px",

            width: "320px",

            zIndex: 10001,

            padding: "16px",

            backgroundColor: "#ffffff",

            borderRadius: "10px",

            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
          }}
        >
          <div
            style={{
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: 600,
              direction: "rtl",
            }}
          >
            مراکز استان‌ها را انتخاب کنید
          </div>

          <Select<CityOption, true>
            isMulti
            options={cityOptions}
            value={selectedCities}
            onChange={handleChange}
            placeholder="انتخاب مرکز استان..."
            closeMenuOnSelect={false}
            noOptionsMessage={() => "موردی پیدا نشد"}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 99999,
              }),
            }}
          />

          <button
            type="button"
            onClick={handleSubmit}
            style={{
              width: "100%",
              marginTop: "12px",
              padding: "10px",

              backgroundColor: "#111827",
              color: "#ffffff",

              border: "none",
              borderRadius: "6px",

              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            OK
          </button>
        </div>
      )}
    </>
  );
};

export default MapShapeButton;
