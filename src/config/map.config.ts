import type { MapConfig } from "@/types/map.types";

const LOCAL_IP = import.meta.env.VITE_LOCAL_IP;

export const MAP_CONFIG: MapConfig = {
                                        baseUrl: `${LOCAL_IP}:8086/maps/madagascar`,
                                        spriteUrl: `${LOCAL_IP}:8087/osm-icons`,
                                        glyphUrl: `${LOCAL_IP}:3001/font`,
                                        martinUrl: `${LOCAL_IP}:3001`,
                                        defaultCenter: { lat:-18.9134573 , lng:47.5225786 }, // Tana
                                        defaultZoom: 16,
                                        minZoom: 1,
                                        maxZoom: 19.5,
                                        pitch : 0,
                                      };
