import type { MapConfig } from "@/types/map.types";

const LOCAL_IP = import.meta.env.VITE_LOCAL_IP;

export const MAP_CONFIG: MapConfig = {
                                        baseUrl: `${LOCAL_IP}:8086/maps/madagascar`,
                                        spriteUrl: `${LOCAL_IP}:8087/osm-icons`,
                                        glyphUrl: `${LOCAL_IP}:3000/font`,
                                        defaultCenter: { lat: -18.8792, lng: 47.5079 }, // Tana
                                        defaultZoom: 14,
                                        minZoom: 1,
                                        maxZoom: 19.5,
                                      };
