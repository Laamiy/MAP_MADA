import { pois_zoom } from "../zoom"

export const poiName = {
  min: pois_zoom.min + 13.5,
  max: pois_zoom.max,
}

type PoiDef = {
  id: string
  min: number
  size: number
  icon: string
  color: string
  fontSize: number
  textPos : "right" | "left"
  textOffset : [number, number]
  textMinZoom: number
}

const poiSymbol = (p: PoiDef) => ({
  id: `pois-${p.id}-symbol`,
  type: "symbol" as const,
  "source-layer": "pois",
  minzoom: p.min,
  maxzoom: poiName.max,
  filter: ["==", ["get", "icon_class"], p.id],
  layout: {
    "icon-image": p.icon,
    "icon-size": [
      "interpolate",
      ["linear"],
      ["zoom"],
      p.min +7,
      p.size * 0.7,
      p.min + 8,
      p.size,
    ],
    "icon-anchor": "center",
    "icon-allow-overlap": false,

    "text-field": [
      "concat",
      ["upcase", ["slice", ["get", "name"], 0, 1]],
      ["downcase", ["slice", ["get", "name"], 1, 25]],
      ["case", [">", ["length", ["get", "name"]], 25], "…", ""],
    ],
    "text-font": ["Noto Sans Bold"],
    // Smoothly scale text from 10px to target fontSize
    "text-size": [
      "interpolate",
      ["linear"],
      ["zoom"],
      p.min,
      10,
      p.min + 3,
      11,
    ],
    "text-anchor": p.textPos,
    "text-offset":p.textOffset,
    "text-optional": true,
    "text-allow-overlap": false,
  },
  paint: {
    "text-color": p.color,
    "text-halo-color": "rgba(255,250,250,0.8)",
    "text-halo-width": 1.5,
    "text-halo-blur": 1,
    "text-opacity": 1,
    // [
    //   "interpolate",
    //   ["linear"],
    //   ["zoom"],
    //   Math.max(p.textMinZoom - 0.5, 0),
    //   0,
    //   p.textMinZoom,
    //   1,
    // ],
  },
})

const poiDefs: PoiDef[] = [
  {
    id: "fast_food",
    min: pois_zoom.min + 14.5,
    size: 1.5,
    icon: "fast_food",
    color: "#F88913",
    fontSize: 15,
    textPos : "right",
    textOffset : [-1.5, 0],
    textMinZoom: pois_zoom.min + 9,
  },
  {
    id: "ice_cream",
    min: pois_zoom.min + 8,
    size: 1.5,
    icon: "ice_cream",
    color: "#F95454",
    fontSize: 15,
    textPos : "right",
    textOffset : [-1.5, 0],

    textMinZoom: pois_zoom.min + 9,
  },
  {
    id: "bbc",
    min: pois_zoom.min + 10,
    size: 1.5,
    icon: "bbc",
    color: "#F88913",
    fontSize: 15,
    textPos : "right",
    textOffset : [-1.5, 0],
    textMinZoom: pois_zoom.min + 9,
  },
  {
    id: "cafe",
    min: pois_zoom.min + 11,
    size: 1.5,
    icon: "cafe",
    color: "#E2852E",
    fontSize: 15,
    textPos : "left",
    textOffset : [1.5, 0],
    textMinZoom: pois_zoom.min + 9,
  },
  {
    id: "food_court",
    min: pois_zoom.min + 4.5,
    size: 1.5,
    icon: "food_court",
    color: "#CC6900",
    fontSize: 15,
    textPos : "left",
    textOffset : [1.5, 0],
    textMinZoom: pois_zoom.min + 9,
  },
  {
    id: "restaurant",
    min: pois_zoom.min + 5.5,
    size: 1.5,
    icon: "food",
    color: "#B77466",
    fontSize: 15,
    textPos : "left",
    textOffset : [1.5, 0],

    textMinZoom: pois_zoom.min + 9,
  },
  {
    id: "pub",
    min: pois_zoom.min + 14,
    size: 1.5,
    icon: "pub",
    color: "#BF092F",
    fontSize: 15,
    textPos : "right",
    textOffset : [-1.5, 0],

    textMinZoom: pois_zoom.max,
  },
  {
    id: "supermarket",
    min: pois_zoom.min + 14,
    size: 1.5,
    icon: "shop",
    color: "#5409DA",
    fontSize: 15,
    textMinZoom: pois_zoom.max - 3,
    textPos : "right",
    textOffset : [-1.5, 0],

  },
  {
    id: "bar",
    min: pois_zoom.min + 13,
    size: 1.2,
    icon: "bar",
    color: "#FF0B55",
    fontSize: 15,
    textMinZoom: pois_zoom.min + 14,
    textPos : "right",
    textOffset : [-1.5, 0],

  },
  {
    id: "fitness",
    min: pois_zoom.min + 7.5,
    size: 1.2,
    icon: "fitness",
    color: "#FF2DD1",
    fontSize: 13,
    textMinZoom: pois_zoom.min + 9,
    textPos : "left",
    textOffset : [1.5, 0],

  },
  {
    id: "pool",
    min: pois_zoom.min + 7.5,
    size: 1.5,
    icon: "pool",
    color: "#73CED8",
    fontSize: 15,
    textMinZoom: pois_zoom.min + 9,
    textPos : "left",
    textOffset : [1.5, 0],

  },
  {
    id: "bureau_de_change",
    min: pois_zoom.max - 1,
    size: 1.2,
    icon: "bureau_de_change",
    color: "#219C90",
    fontSize: 15,
    textMinZoom: pois_zoom.max,
    textPos : "left",
    textOffset : [1.5, 0],

  },
  {
    id: "hunting_stand",
    min: pois_zoom.min + 7.5,
    size: 1.5,
    icon: "hunting_stand",
    color: "#E2852E",
    fontSize: 15,
    textMinZoom: pois_zoom.min + 9,
    textPos : "left",
    textOffset : [1.5, 0],

  },
  {
    id: "atm",
    min: pois_zoom.min + 12.5,
    size: 1.5,
    icon: "atm",
    color: "#219C90",
    fontSize: 15,
    textMinZoom: pois_zoom.min + 12,
    textPos : "left",
    textOffset : [1.5, 0],

  },
  {
    id: "research_institute",
    min: pois_zoom.min + 7.5,
    size: 1.5,
    icon: "research_institute",
    color: "#134686",
    fontSize: 15,
    textMinZoom: pois_zoom.min + 9,
    textPos : "left",
    textOffset : [1.5, 0],

  },
  {
    id: "bus",
    min: pois_zoom.min + 8.5,
    size: 1.2,
    icon: "bus",
    color: "#00f",
    fontSize: 13,
    textPos : "left",
    textOffset : [1.5, 0],

    textMinZoom: pois_zoom.min + 11,
  },
  {
    id: "bus_stop",
    min: pois_zoom.min + 12,
    size: 1.2,
    icon: "bus_stop",
    color: "#FF9B00",
    fontSize: 15,
    textMinZoom: pois_zoom.min + 13.5,
    textPos : "left",
    textOffset : [1.5, 0],

  },
  {
    id: "taxi",
    min: pois_zoom.min + 11.5,
    size: 1.2,
    icon: "taxi",
    color: "#63C8FF",
    fontSize: 13,
    textPos : "left",
    textOffset : [1.5, 0],

    textMinZoom: pois_zoom.min + 12,
  },
  {
    id: "zoo",
    min: pois_zoom.min,
    size: 1.2,
    icon: "zoo",
    color: "#7E5F5F",
    fontSize: 14,
    textMinZoom: pois_zoom.min,
    textPos : "left",
    textOffset : [1.5, 0],

  },
  {
    id: "tourism",
    min: pois_zoom.min + 13,
    size: 1.2,
    icon: "tourism",
    color: "#FF0B55",
    fontSize: 15,
    textMinZoom: pois_zoom.min + 8,
    textPos : "right",
    textOffset : [-1.5, 0],

  },
  {
    id: "pharmacy",
    min: pois_zoom.min + 12,
    size: 1.3,
    icon: "pharmacy",
    color: "#00CC00",
    fontSize: 15,
    textPos : "right",
    textOffset : [-1.5, 0],

    textMinZoom: pois_zoom.min + 13,
  },
  {
    id: "hospital",
    min: pois_zoom.min + 10.5,
    size: 1.5,
    icon: "hospital",
    color: "#f00",
    fontSize: 15,
    textPos : "right",
    textOffset : [-1.5, 0],


    textMinZoom: pois_zoom.min + 12,
  },
  {
    id: "health",
    min: pois_zoom.min + 12.5,
    size: 1.5,
    icon: "health",
    color: "#00CC00",
    fontSize: 15,
    textPos : "right",
    textOffset : [-1.5, 0],

    textMinZoom: pois_zoom.min + 13,
  },
  {
    id: "fuel",
    min: pois_zoom.min + 11.5,
    size: 1.5,
    icon: "fuel",
    color: "#f00",
    fontSize: 15,
    textPos : "left",
    textOffset : [1.5, 0],

    textMinZoom: pois_zoom.min + 13,
  },
  {
    id: "lodging",
    min: pois_zoom.min + 13,
    size: 1.5,
    icon: "hotel",
    color: "#F26300",
    fontSize: 15,
    textPos : "left",
    textOffset : [1.5, 0],

    textMinZoom: pois_zoom.min + 13.5,
  },
  {
    id: "aerodrome",
    min: pois_zoom.min + 9,
    size: 1.2,
    icon: "aerodrome",
    color: "#2192FF",
    fontSize: 15,
    textPos : "left",
    textOffset : [1.5, 0],

    textMinZoom: pois_zoom.min + 7,
  },
  {
    id: "museum",
    min: pois_zoom.min + 5,
    size: 1.2,
    icon: "museum",
    color: "#0a15b1ff",
    fontSize: 15,
    textPos : "right",
    textOffset : [-1.5, 0],

    textMinZoom: pois_zoom.min + 7,
  },
  {
    id: "worship",
    min: pois_zoom.min + 11,
    size: 1.5,
    icon: "worship",
    color: "#00CCB4",
    fontSize: 15,
    textMinZoom: pois_zoom.min + 11.5,
    textPos : "right",
    textOffset : [-1.5, 0],

  },
]

export const pois = [
  {
    id: "poi-icons-symbol",
    type: "symbol" as const,
    "source-layer": "pois",
    minzoom: pois_zoom.min + 14.5,
    maxzoom: pois_zoom.max,
    filter: ["has", "icon_class"],
    layout: {
      "icon-image": ["get", "icon_class"],
      "icon-size": 1.5,
      "icon-offset": [0, -20],
    },
  },
  ...poiDefs.map(poiSymbol),
]