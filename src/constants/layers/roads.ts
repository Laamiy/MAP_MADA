import { roads_zoom } from "../zoom";
import type {CustomLayer} from "@/types/map.types"
const INC = 2;

const roadWidth = [
  "interpolate", ["linear"], ["zoom"],
  roads_zoom.min, 0.5,
  roads_zoom.min + INC + 1,
  ["match", ["get", "class"],
    "motorway", 2,
    "major", 5,
    "minor", 1,
    "residential", 0.8,
    "service", 0.6,
    "path", 0.5,
    "track", 0.5,
    1],
  roads_zoom.min + INC + 3,
  ["match", ["get", "class"],
    "motorway", 23,
    "major", 23,
    "minor", 12,
    "residential", 10,
    "service", 5,
    "path", 3,
    "track", 3,
    6],
  roads_zoom.max,
  ["match", ["get", "class"],
    "motorway", 35,
    "major", 35,
    "minor", 15,
    "residential", 12,
    "service", 12,
    "path", 8,
    "track", 8,
    12]
];

const roadColor = [
  "match", ["get", "class"],
  "motorway", "#ACBAC4",
  "major", "#ACBAC4",
  "minor", "#C6D0DB",
  "residential", "#C6D0DB",
  "service", "#f0f0f0",
  "path", "#BFCEDB",
  "track", "#C6D0DB",
  "#8ba5c19c" // other
];


export const roads  : CustomLayer[]= [
  {
    id: "roads-path-steps",
    type: "line",
    source: "roads",
    "source-layer": "roads",
    filter: ["==", ["get", "class"], "path"],
    layout: {
      "line-cap": "butt",
      "line-join": "miter",
    },
    paint: {
      "line-color": "white",
      "line-width": [
        "interpolate", ["linear"], ["zoom"],
        roads_zoom.min, 0.8,
        roads_zoom.min + INC, 1.2,
        roads_zoom.min + INC + 1, 4,
        roads_zoom.max - 1, 10
      ],
      "line-dasharray": [1, 1], // square stairs
      "line-opacity": 1,
    },
  },
  {
    id: "roads-minor-line",
    type: "line",
    source: "roads",
    "source-layer": "roads",
    filter: [
      "all",
      ["has", "class"],
      ["!=", ["get", "class"], "motorway"],
      ["!=", ["get", "class"], "major"]
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": roadColor,
      "line-width": roadWidth,
      "line-opacity": [
        "interpolate", ["linear"], ["zoom"],
        0, 0,
        roads_zoom.min, 0.5,
        roads_zoom.min + 0.01, 1,
      ],
    },
  },
  {
    id: "roads-major-line",
    type: "line",
    source: "roads",
    "source-layer": "roads",
    filter: [
      "any",
      ["==", ["get", "class"], "motorway"],
      ["==", ["get", "class"], "major"]
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": roadColor,
      "line-width": roadWidth,
      "line-opacity": [
        "interpolate", ["linear"], ["zoom"],
        0, 0,
        roads_zoom.min, 0.5,
        roads_zoom.min + 0.01, 1,
      ],
    },
  }
];
