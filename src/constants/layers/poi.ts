import type { ThemeScheme } from "@/types/map.theme.types"
import type {CustomLayer} from "@/types/map.types"
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
  textOverlap?:boolean
}

const poiSymbol = (p: PoiDef , scheme : ThemeScheme)  : CustomLayer=> ({
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
    "text-allow-overlap": p.textOverlap || false,
  },
  paint: {
    "text-color": p.color,
    "text-halo-color":scheme["text-halo-color"],
    "text-halo-width": 1.5,
    "text-halo-blur": 1,
    "text-opacity": 1,

  },
})


export function getPoi(scheme: ThemeScheme): CustomLayer[] {

  const poiDefs: PoiDef[] = [
    {
      id: "fast_food",
      min: pois_zoom.min + 14.5,
      size: 1.5,
      icon: "fast_food",
      color: scheme.pois.fast_food,
      fontSize: 15,
      textPos : "right",
      textOffset : [-1.5, 0],
      textMinZoom: pois_zoom.min + 9,
    },
    {
      id: "school",
      min: pois_zoom.min + 11,
      size: 1.5,
      icon: "school",
      color: scheme.pois.school,
      fontSize: 12,
      textPos : "left",
      textOffset : [1.5, 0],
      textMinZoom: pois_zoom.min + 11 ,
    },
    {
      id: "art",
      min: pois_zoom.min + 8,
      size: 1.8,
      icon: "art",
      color: scheme.pois.art,
      fontSize: 12,
      textPos : "left",
      textOffset : [1.5, 0],

      textMinZoom: pois_zoom.min + 8,
    },
    {
      id: "sport",
      min: pois_zoom.min + 8,
      size: 1.5,
      icon: "sport",
      color: scheme.pois.sport,
      fontSize: 12,
      textPos : "left",
      textOffset : [1.5, 0],

      textMinZoom: pois_zoom.min + 8,
    },
    {
      id: "library",
      min: pois_zoom.min + 8,
      size: 1.5,
      icon: "library",
      color: scheme.pois.library,
      fontSize: 12,
      textPos : "right",
      textOffset : [-1.5, 0],

      textMinZoom: pois_zoom.min + 8,
    },
    {
      id: "ice_cream",
      min: pois_zoom.min + 8,
      size: 1.7,
      icon: "ice_cream",
      color:scheme.pois.ice_cream,
      fontSize: 15,
      textPos : "right",
      textOffset : [-1.5, 0],

      textMinZoom: pois_zoom.min + 9,
    },
    {
      id: "bbq",
      min: pois_zoom.min + 4,
      size: 1.5,
      icon: "bbq",
      color: scheme.pois.bbq,
      fontSize: 15,
      textPos : "right",
      textOffset : [-1.5, 0],
      textMinZoom: pois_zoom.min + 9,
    },
    {
      id: "ferry",
      min: pois_zoom.min + 8,
      size: 1.5,
      icon: "ferry",
      color: scheme.pois.ferry,
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
      color:scheme.pois.cafe,
      fontSize: 15,
      textPos : "left",
      textOffset : [1.5, 0],
      textMinZoom: pois_zoom.min + 9,
    },
    {
      id: "garden",
      min: pois_zoom.min + 11,
      size: 1.5,
      icon: "garden",
      color: scheme.pois.garden ,
      fontSize: 15,
      textPos : "left",
      textOffset : [1.5, 0],
      textMinZoom: pois_zoom.min + 9,
    },
    {
      id: "stadium",
      min: pois_zoom.min + 11,
      size: 1.5,
      icon: "stadium",
      color: scheme.pois.stadium,
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
      color: scheme.pois.food_court,
      fontSize: 15,
      textPos : "left",
      textOffset : [1.5, 0],
      textMinZoom: pois_zoom.min + 9,
    },
    {
      id: "restaurant",
      min: pois_zoom.min + 5.5,
      size: 1.5,
      icon: "restaurant",
      color: scheme.pois.restaurant,
      fontSize: 15,
      textPos : "left",
      textOffset : [1.5, 0],

      textMinZoom: pois_zoom.min + 9,
    },
    {
      id: "supermarket",
      min: pois_zoom.min + 14,
      size: 1.3,
      icon: "shop",
      color: scheme.pois.supermarket,
      fontSize: 15,
      textMinZoom: pois_zoom.max - 3,
      textPos : "right",
      textOffset : [-1.5, 0],

    },
    {
      id: "bar",
      min: pois_zoom.min + 13,
      size: 1.3,
      icon: "bar",
      color: scheme.pois.bar,
      fontSize: 15,
      textMinZoom: pois_zoom.min + 14,
      textPos : "right",
      textOffset : [-1.5, 0],

    },
    {
      id: "fitness",
      min: pois_zoom.min + 7.5,
      size: 1.3,
      icon: "fitness",
      color: scheme.pois.fitness,
      fontSize: 13,
      textMinZoom: pois_zoom.min + 9,
      textPos : "left",
      textOffset : [1.5, 0],

    },
    {
      id: "pool",
      min: pois_zoom.min + 7.5,
      size: 1.3,
      icon: "pool",
      color: scheme.pois.pool,
      fontSize: 15,
      textMinZoom: pois_zoom.min + 9,
      textPos : "left",
      textOffset : [1.5, 0],

    },
    {
      id: "hunting_stand",
      min: pois_zoom.min + 7.5,
      size: 1.3,
      icon: "hunting_stand",
      color: scheme.pois.hunting_stand,
      fontSize: 15,
      textMinZoom: pois_zoom.min + 9,
      textPos : "left",
      textOffset : [1.5, 0],

    },
    {
      id: "atm",
      min: pois_zoom.min + 12.5,
      size: 2,
      icon: "atm",
      color: scheme.pois.atm ,
      fontSize: 15,
      textMinZoom: pois_zoom.min + 12,
      textPos : "left",
      textOffset : [1.5, 0],

    },
    {
      id: "research_institute",
      min: pois_zoom.min + 7.5,
      size: 1.3,
      icon: "research_institute",
      color: scheme.pois.research_institute,
      fontSize: 15,
      textMinZoom: pois_zoom.min + 9,
      textPos : "left",
      textOffset : [1.5, 0],

    },
    {
      id: "bus",
      min: pois_zoom.min + 8.5,
      size: 1.3,
      icon: "bus",
      color:scheme.pois.bus,
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
      color: scheme.pois.bus_stop,
      fontSize: 15,
      textMinZoom: pois_zoom.min -13,
      textPos : "left",
      textOffset : [1.5, 0],

    },
    {
      id: "taxi",
      min: pois_zoom.min + 11.5,
      size: 1.3,
      icon: "taxi",
      color: scheme.pois.taxi ,
      fontSize: 13,
      textPos : "left",
      textOffset : [1.5, 0],

      textMinZoom: pois_zoom.min + 12,
    },
    {
      id: "zoo",
      min: pois_zoom.min,
      size: 1.3,
      icon: "zoo",
      color: scheme.pois.zoo,
      fontSize: 14,
      textMinZoom: pois_zoom.min,
      textPos : "left",
      textOffset : [1.5, 0],

    },
    {
      id: "tourism",
      min: pois_zoom.min + 13,
      size: 1.3,
      icon: "tourism",
      color: scheme.pois.tourism,
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
      color: scheme.pois.tourism,
      fontSize: 15,
      textPos : "right",
      textOffset : [-1.5, 0],

      textMinZoom: pois_zoom.min + 13,
    },
    {
      id: "sanitary",
      min: pois_zoom.min + 12,
      size: 1.3,
      icon: "sanitary",
      color: scheme.pois.sanitary,
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
      color: scheme.pois.hospital,
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
      color: scheme.pois.health,
      fontSize: 15,
      textPos : "right",
      textOffset : [-1.5, 0],

      textMinZoom: pois_zoom.min + 13,
    },
    {
      id: "natural",
      min: pois_zoom.min ,
      size: 1.2,
      icon: "natural",
      color: scheme.pois.natural,
      fontSize: 15,
      textPos : "right",
      textOffset : [-1.5, 0],

      textMinZoom: pois_zoom.min + 1,
    },
    {
      id: "park",
      min: pois_zoom.min ,
      size: 1.3,
      icon: "park",
      color: scheme.pois.park ,
      fontSize: 15,
      textPos : "right",
      textOffset : [-1.5, 0],

      textMinZoom: pois_zoom.min + 1,
    },
    {
      id: "bank",
      min: pois_zoom.min + 12 ,
      size: 1.5,
      icon: "bank",
      color: scheme.pois.bank,
      fontSize: 15,
      textPos : "left",
      textOffset : [1.5, 0],

      textMinZoom: pois_zoom.min + 13 ,
    },
    {
      id: "justice",
      min: pois_zoom.min + 10 ,
      size: 1.5,
      icon: "justice",
      color: scheme.pois.justice,
      fontSize: 15,
      textPos : "left",
      textOffset : [1.5, 0],

      textMinZoom: pois_zoom.min + 11 ,
    },
    {
      id: "fuel",
      min: pois_zoom.min + 11.5,
      size: 1.5,
      icon: "fuel",
      color: scheme.pois.fuel,
      fontSize: 15,
      textPos : "left",
      textOffset : [1.5, 0],

      textMinZoom: pois_zoom.min + 13,
    },
    {
      id: "hotel",
      min: pois_zoom.min + 12,
      size: 1.5,
      icon: "hotel",
      color: scheme.pois.hotel,
      fontSize: 15,
      textPos : "left",
      textOffset : [1.5, 0],

      textMinZoom: pois_zoom.min + 13.5,
    },
    {
      id: "aerodrome",
      min: pois_zoom.min + 9,
      size: 1.5,
      icon: "aerodrome",
      color: scheme.pois.aerodrome ,
      fontSize: 15,
      textPos : "left",
      textOffset : [1.5, 0],

      textMinZoom: pois_zoom.min + 7,
    },
    {
      id: "army",
      min: pois_zoom.min + 9,
      size: 1.5,
      icon: "army",
      color: scheme.pois.army,
      fontSize: 15,
      textPos : "left",
      textOffset : [1.5, 0],

      textMinZoom: pois_zoom.min + 7,
    },
    {
      id: "museum",
      min: pois_zoom.min + 5,
      size: 1.5,
      icon: "museum",
      color: scheme.pois.museum,
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
      color: scheme.pois.worship,
      fontSize: 15,
      textMinZoom: pois_zoom.min + 11.5,
      textPos : "right",
      textOffset : [-1.5, 0],

    },
  ]
  const pois: CustomLayer[] = [
    {
      id: "poi-icons-symbol",
      type: "symbol" as const,
      "source-layer": "pois",
      minzoom: pois_zoom.min + 14.5,
      maxzoom: pois_zoom.max,
      filter: ["has", "icon_class"],
      layout: {
        "icon-image": ["get", "icon_class"],
        "icon-offset": [0, -20],
        "icon-size": 1.3,
      },

    },
    ...poiDefs.map((poi :PoiDef)=>poiSymbol(poi, scheme)),
  ];
  return pois;
}
