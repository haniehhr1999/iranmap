import { Circle, CircleMarker } from "react-leaflet";
import type { DataModel } from "../../models";

type Props = {
  city: DataModel;
};

const MapCircle = ({ city }: Props) => {
  return (
    <>
      <Circle
        center={city.latlng}
        radius={city.affectR}
        pathOptions={{
          color: "#ff2d2d",
          weight: 4,
          fillColor: "#ff7da8",
          fillOpacity: 0.5,
        }}
      />

      <CircleMarker
        center={city.latlng}
        radius={5}
        pathOptions={{
          color: "#ff2d2d",
          fillColor: "#ff2d2d",
          fillOpacity: 1,
        }}
      />
    </>
  );
};

export default MapCircle;
