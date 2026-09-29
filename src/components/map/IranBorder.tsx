import { GeoJSON } from "react-leaflet";

import type {
  FeatureCollection,
} from "geojson";

type Props = {
  data: FeatureCollection;
};

const IranBorder = ({ data }: Props) => {
  return (
    <GeoJSON
      data={data}
      interactive={false}
      style={{
        color: "#374151",
        weight: 2,
        opacity: 1,

        fill: false,
        fillOpacity: 0,
      }}
    />
  );
};

export default IranBorder;