import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { DataModel } from "../../models";

type CircleFocusProps = {
  city: DataModel | null;
};

const CircleFocus = ({ city }: CircleFocusProps) => {
  const map = useMap();

  useEffect(() => {
    if (!city) return;

    const [lat, lng] = city.latlng;

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng) ||
      !Number.isFinite(city.affectR)
    ) {
      console.error("Invalid city data:", city);
      return;
    }

    map.flyTo([lat, lng], 11, {
      animate: true,
      duration: 0.8,
    });
  }, [city, map]);

  return null;
};

export default CircleFocus;
