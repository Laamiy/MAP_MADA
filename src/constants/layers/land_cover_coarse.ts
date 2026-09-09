// import { land_cover_coarse_zoom } from "@/constants/zoom"
import type { VegClassType , CustomLayer } from "@/types/map.types"
import type { ExpressionSpecification } from "maplibre-gl"
import type { ThemeScheme } from "@/types/map.theme.types";




function buildColorMatch(vegClass : VegClassType , scheme : ThemeScheme): ExpressionSpecification {
  const pairs = Object.entries(vegClass).flatMap(([subtype, { color }]) => [subtype, color])
  return ["match", ["get", "subtype"], ...pairs, scheme.land_cover_coarse.default] as unknown as ExpressionSpecification
}


export function getLandcoverCoarse(scheme : ThemeScheme) : CustomLayer[]{

  const vegClasses: Record<string, { color: string; opacity: number }> = {
    forest: { color: scheme.land_cover_coarse.forest, opacity: 1 },
    shrub: { color: scheme.land_cover_coarse.shrub, opacity: 1 },
    grass: { color: scheme.land_cover_coarse.grass, opacity: 1 },
    barren: { color: scheme.land_cover_coarse.barren, opacity: 0.3 },
    crop: { color: scheme.land_cover_coarse.crop, opacity: 0.3 },
  };

  const land_cover_coarse: CustomLayer[] = [
    {
      id: "land_cover_coarse",
      type: "fill",
      "source-layer": "land_cover",
      // minzoom: zMin,
      // maxzoom: zMax,
      filter: ["match", ["get", "subtype"], Object.keys(vegClasses), true, false] as unknown as ExpressionSpecification,
      paint: {
        "fill-color": buildColorMatch(vegClasses, scheme),
        "fill-opacity": 0.5,//buildOpacityMatch(),
        "fill-antialias": false,
      },
    },
  ];
  return land_cover_coarse;
}
