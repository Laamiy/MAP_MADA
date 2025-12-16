import { landuse_zoom } from "../zoom"

// Google Maps-inspired color palette
const colors = {
  // Vegetation (muted greens)
  forest: "#A1EEBD", // Light sage green
  wood: "#A1EEBD",
  park: "#C8E6C9", // Lighter park green
  grass: "#A1EEBD", // Very light green
  farmland: "#FFF2C2", // Beige-green
  orchard: "#FFF2C2",

  // Water (soft blues)
  water: "#AAD3DF", // Muted blue
  wetland: "#C5E1E8", // Pale blue-grey

  // Urban (greys and tans)
  residential: "#e8e8e8", // light grey
  commercial: "#F0E8E0", // Warm grey
  industrial: "#E0E0E3", // Cool grey
  retail: "#F5F0E8",

  // Infrastructure
  cemetery: "#E0E8E0", // Pale green-grey
  military: "#F3E8E8", // Pale red-grey
  education: "#F5F0E0", // Pale yellow

  // Bare/undeveloped
  sand: "#F5EBD3",
  rock: "#E8E0D8",
  quarry: "#DED8D0",
}

export const landuse = [
  {
    id: "landuse-fill",
    type: "fill",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: landuse_zoom.min,
    maxzoom: landuse_zoom.max,
    paint: {
      "fill-color": "#F5F0E5",
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        landuse_zoom.min,
        0.5,
        landuse_zoom.min + 0.01,
        1,
        landuse_zoom.max,
        0.5,
      ],
    },
  },
  // ========================================
  // WATER (highest priority for visibility)
  // ========================================
  {
    id: "water-fill",
    type: "fill",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: 5,
    maxzoom: 20,
    filter: [
      "any",
      ["==", "natural", "water"],
      ["==", "landuse", "reservoir"],
      ["==", "landuse", "basin"],
    ],
    paint: {
      "fill-color": colors.water,
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        5,
        0.6,
        10,
        0.8,
        15,
        0.9,
      ],
    },
  },

  {
    id: "wetland-fill",
    type: "fill",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: 8,
    maxzoom: 20,
    filter: ["==", "natural", "wetland"],
    paint: {
      "fill-color": colors.wetland,
      "fill-opacity": 0.5,
    },
  },

  // ========================================
  // VEGETATION - Large areas first
  // ========================================
  {
    id: "forest-wood-fill",
    type: "fill",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: 15,
    maxzoom: 20,
    filter: ["any", ["==", "natural", "wood"], ["==", "landuse", "forest"]],
    paint: {
      "fill-color": colors.forest,
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        2,
        0.3,
        6,
        0.6,
        10,
        0.8,
        15,
        0.9,
      ],
    },
  },

  {
    id: "farmland-fill",
    type: "fill",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: 14,
    maxzoom: 20,
    filter: [
      "any",
      ["==", "landuse", "farmland"],
      ["==", "landuse", "paddy"],
      ["==", "landuse", "orchard"],
      ["==", "landuse", "vineyard"],
      ["==", "landuse", "plant_nursery"],
    ],
    paint: {
      "fill-color": [
        "match",
        ["get", "landuse"],
        "orchard",
        colors.orchard,
        "vineyard",
        colors.orchard,
        colors.farmland,
      ],
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        8,
        0.4,
        12,
        0.7,
        16,
        0.85,
      ],
    },
  },

  {
    id: "grass-meadow-fill",
    type: "fill",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: 14,
    maxzoom: 20,
    filter: [
      "any",
      ["==", "landuse", "grass"],
      ["==", "landuse", "meadow"],
      ["==", "natural", "grassland"],
      ["==", "landuse", "village_green"],
      ["==", "landuse", "recreation_ground"],
    ],
    paint: {
      "fill-color": colors.grass,
      "fill-opacity": 0.6,
    },
  },

  {
    id: "scrub-fill",
    type: "fill",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: 14,
    maxzoom: 20,
    filter: ["any", ["==", "natural", "scrub"], ["==", "landuse", "scrub"]],
    paint: {
      "fill-color": "#D5E5D0",
      "fill-opacity": 0.5,
    },
  },

  // ========================================
  // URBAN & DEVELOPED
  // ========================================
  {
    id: "residential-fill",
    type: "fill",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: 14,
    maxzoom: 20,
    filter: ["==", "landuse", "residential"],
    paint: {
      "fill-color": colors.residential,
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        10,
        0.3,
        13,
        0.6,
        16,
        0.8,
      ],
    },
  },

  {
    id: "commercial-retail-fill",
    type: "fill",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: 14,
    maxzoom: 20,
    filter: [
      "any",
      ["==", "landuse", "commercial"],
      ["==", "landuse", "retail"],
    ],
    paint: {
      "fill-color": [
        "match",
        ["get", "landuse"],
        "retail",
        colors.retail,
        colors.commercial,
      ],
      "fill-opacity": 0.7,
    },
  },

  {
    id: "industrial-fill",
    type: "fill",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: 14,
    maxzoom: 20,
    filter: [
      "any",
      ["==", "landuse", "industrial"],
      ["==", "landuse", "railway"],
      ["==", "landuse", "harbour"],
      ["==", "landuse", "quarry"],
    ],
    paint: {
      "fill-color": [
        "match",
        ["get", "landuse"],
        "quarry",
        colors.quarry,
        colors.industrial,
      ],
      "fill-opacity": 0.6,
    },
  },

  // ========================================
  // INSTITUTIONAL
  // ========================================
  {
    id: "education-fill",
    type: "fill",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: 13,
    maxzoom: 20,
    filter: [
      "any",
      ["==", "landuse", "education"],
      ["==", "landuse", "school"],
    ],
    paint: {
      "fill-color": colors.education,
      "fill-opacity": 0.7,
    },
  },

  {
    id: "cemetery-fill",
    type: "fill",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: 13,
    maxzoom: 20,
    filter: [
      "any",
      ["==", "landuse", "cemetery"],
      ["==", "landuse", "churchyard"],
    ],
    paint: {
      "fill-color": colors.cemetery,
      "fill-opacity": 0.6,
    },
  },

  {
    id: "military-fill",
    type: "fill",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: 13,
    maxzoom: 20,
    filter: ["==", "landuse", "military"],
    paint: {
      "fill-color": colors.military,
      "fill-opacity": 0.4,
    },
  },

  // ========================================
  // BARE LAND
  // ========================================
  {
    id: "bare-rock-fill",
    type: "fill",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: 14,
    maxzoom: 20,
    filter: ["any", ["==", "natural", "bare_rock"], ["==", "natural", "rock"]],
    paint: {
      "fill-color": colors.rock,
      "fill-opacity": 0.5,
    },
  },

  // SUBTLE OUTLINES (only at high zoom)
  {
    id: "landuse-outline",
    type: "line",
    source: "landuse",
    "source-layer": "landuse",
    minzoom: 14,
    maxzoom: 20,
    filter: [
      "any",
      ["==", "landuse", "forest"],
      ["==", "landuse", "residential"],
      ["==", "landuse", "commercial"],
      ["==", "landuse", "industrial"],
    ],
    paint: {
      "line-color": [
        "match",
        ["get", "landuse"],
        "forest",
        "#A8FFA0",
        "residential",
        "#D0D0D0",
        "commercial",
        "#D8D0C8",
        "industrial",
        "#C8C8CB",
        "#CCCCCC",
      ],
      "line-width": ["interpolate", ["linear"], ["zoom"], 14, 0.5, 18, 1],
      "line-opacity": 0.4,
    },
  },
]
