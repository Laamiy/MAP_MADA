import type { CustomLayer } from "@/types/map.types";
import type { ThemeScheme } from "@/types/map.theme.types";

export function getBackground(scheme : ThemeScheme): CustomLayer[] {
  const background: CustomLayer[] = [
  {
  id: "background",
  type : "background",
  paint: { "background-color": scheme["background-color"]}
  },
  ];
  return background;
}
