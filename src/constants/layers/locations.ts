import type { CustomLayer } from "@/types/map.types";
import type { ThemeScheme } from "@/types/map.theme.types";
import {INC , location_zoom} from  '@/constants/zoom'
import type { FilterSpecification } from "maplibre-gl";

export function getLocations(scheme: ThemeScheme): CustomLayer[] {
  const locations = [
    {
      id: "locations-symbol",
      type: "symbol",
      "source-layer": "locations",
      minzoom: location_zoom.min,
      maxzoom: location_zoom.max,
      filter: ["has", "name"] as FilterSpecification,// really could casted somewhere else
      layout: {
        "icon-image": "gp_889",
        "icon-size": 1,
        "icon-allow-overlap": false,
        "text-field": ["upcase", ["get", "name"]],
        "text-justify": "center",
        "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          4,
          11,
          20 + INC,
          12,
        ],
        "symbol-placement": "point",
        "text-anchor": "right",
        "text-offset": [-2, 0],
        "symbol-spacing": 500,
        "text-allow-overlap": false,
      },
      paint: {
        "text-color": scheme.locations["text-color"],
        "text-halo-color": scheme.locations["text-halo-color"],
        "text-halo-width": 2.5,
        "text-halo-blur": 1,
        "text-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          4,
          1,
          4 + 0.01,
          1,
        ],
      },
    },
  ];
  return locations as CustomLayer[];
}
