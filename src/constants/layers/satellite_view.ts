import type { CustomLayer } from "@/types/map.types"
export const satellite_view : CustomLayer[] = [
  {
        id: "satellite-layer",
        type: "raster",
        layout: {
                    visibility: "none",
                }, // default hidden
        paint: {
                  "raster-opacity": 1,
                },
  }
]
