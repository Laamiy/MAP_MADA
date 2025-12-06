import { waterways_zoom ,INC} from "../zoom"

export const waterways_labels=
  [
    {
        id: "waterways-name-symbol",
        type: "symbol",
        source: "waterways",
        "source-layer": "waterways",
        minzoom: waterways_zoom.min + 2,
        maxzoom: waterways_zoom.max,
      filter: [
        "all",
        ["has", "name"],
        ["!=", ["downcase", ["get", "name"]], "samva"]
      ],    
        layout: {
          "text-field": ["upcase", ["get", "name"]],
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0,
            waterways_zoom.min + 2,
            11,
            waterways_zoom.min  + 2 + INC,
            14,
          ],
          "symbol-spacing": 600,
          "text-allow-overlap": false,
        },
        paint: {
          "text-color": "rgba(5, 20, 158, 1)",
          "text-halo-color": "rgba(255, 250, 250, 0.8)",
          "text-halo-width": 2.5,
          "text-halo-blur": 1,
          "text-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            1,
            waterways_zoom.min + 2,
            1,
            waterways_zoom.min + 2 + 0.01,
            1,
          ],
        },
      },
  ]
