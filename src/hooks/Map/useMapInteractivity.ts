import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { FeatureProperties , ClickEvent} from "@/types/map.types";
import { getStringProp, formatCategory } from "@/utils/map.utils";

export interface InteractivityConfig {
  poiSourceLayers?: string[];
  areaSourceLayers?: string[];
  poiLayerIds?: string[];
  areaLayerIds?: string[];
}


interface UseMapInteractivityProps {
  map: maplibregl.Map | null;
  config: InteractivityConfig;
  onSelectPoi?: (poiProperties: FeatureProperties) => void;
  onSelectArea?: (areaProperties: FeatureProperties) => void;
}

export const useMapInteractivity = ({
  map,
  config,
  onSelectPoi,
  onSelectArea,
}: UseMapInteractivityProps) => {
  const popupRef = useRef<maplibregl.Popup | null>(null);

  useEffect(() => {
    if (!map)
      return;

    popupRef.current = new maplibregl.Popup({
      closeButton: true,
      closeOnClick: true,
      maxWidth: "300px",
      offset: 15,
    });

    const resolveLayerIds = ( explicitIds?: string[], sourceLayers?: string[]): string[] => {
      const ids = new Set<string>(explicitIds || []);
      if (!sourceLayers || sourceLayers.length === 0)
        return Array.from(ids);

      const style = map.getStyle();
      if (!style || !style.layers)
        return Array.from(ids);

      style.layers.forEach((layer: maplibregl.LayerSpecification) => {
        const src = "source" in layer && typeof layer.source === "string" ? layer.source : undefined;
        const srcLayer = "source-layer" in layer && typeof layer["source-layer"] === "string" ? layer["source-layer"] : undefined;

        if (
          (srcLayer && sourceLayers.includes(srcLayer)) ||
          (src && sourceLayers.includes(src))
        ) {
          ids.add(layer.id);
        }
      });

      return Array.from(ids);
    };

    const targetPoiLayers = resolveLayerIds(config.poiLayerIds, config.poiSourceLayers);
    const targetAreaLayers = resolveLayerIds(config.areaLayerIds,config.areaSourceLayers);

    const handleMouseEnter = () => {
      map.getCanvas().style.cursor = "pointer";
    };

    const handleMouseLeave = () => {
      map.getCanvas().style.cursor = "";
    };

    const handlePoiClick = (e: ClickEvent) => {
      if (!e.features || e.features.length === 0)
        return;

      const feature = e.features[0];
      const props: FeatureProperties = feature.properties || {};

      const coordinates: [number, number] = feature.geometry.type === "Point"
          ? (feature.geometry.coordinates.slice() as [number, number])
          : [e.lngLat.lng, e.lngLat.lat];

      const title = getStringProp(props, "name") || formatCategory(props);
      const category =
        getStringProp(props, "amenity") ||
        getStringProp(props, "shop") ||
        getStringProp(props, "tourism") ||
        getStringProp(props, "natural") ||
        getStringProp(props, "man_made") ||
        "Point of Interest";
      const iconClass = getStringProp(props, "icon_class") || "default";

      const htmlContent = `
        <div style="font-family: system-ui, sans-serif; padding: 12px 14px; border-radius: 12px; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.04);">
          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: #999;">
            ${category.replace(/_/g, " ")}
          </div>
          <div style="font-size: 15px; font-weight: 600; color: #222; margin-top: 3px;">
            ${title}
          </div>
          <div style="margin-top: 8px; font-size: 11px; color: #777; font-family: monospace;">
            ${iconClass}
          </div>
        </div>
      `;

      popupRef.current?.setLngLat(coordinates).setHTML(htmlContent).addTo(map);

      onSelectPoi?.(props);
    };

    const handleAreaClick = (e: ClickEvent) => {
      if (!e.features || e.features.length === 0) return;

      const feature = e.features[0];
      const props: FeatureProperties = feature.properties || {};

      const targetCoordinates: [number, number] =
        feature.geometry.type === "Point"
          ? (feature.geometry.coordinates.slice() as [number, number])
          : [e.lngLat.lng, e.lngLat.lat];

      const currentZoom = map.getZoom();
      const adminLevel = Number(props.admin_level);

      let targetZoom = currentZoom + 2.5;
      if (adminLevel === 6) targetZoom = Math.max(currentZoom + 2, 11);
      if (adminLevel === 4) targetZoom = Math.max(currentZoom + 2, 9);

      map.flyTo({
        center: targetCoordinates,
        zoom: Math.min(targetZoom, map.getMaxZoom()),
        speed: 1.2,
        curve: 1.4,
        essential: true,
      });

      onSelectArea?.(props);
    };

    const attachListeners = (
      layerIds: string[],
      clickHandler: (e: ClickEvent) => void
    ) => {
      layerIds.forEach((id) => {
        if (map.getLayer(id)) {
          map.on("mouseenter", id, handleMouseEnter);
          map.on("mouseleave", id, handleMouseLeave);
          map.on("click", id, clickHandler);
        }
      });
    };

    const detachListeners = (
      layerIds: string[],
      clickHandler: (e: ClickEvent) => void
    ) => {
      layerIds.forEach((id) => {
        if (map.getLayer(id)) {
          map.off("mouseenter", id, handleMouseEnter);
          map.off("mouseleave", id, handleMouseLeave);
          map.off("click", id, clickHandler);
        }
      });
    };

    attachListeners(targetPoiLayers, handlePoiClick);
    attachListeners(targetAreaLayers, handleAreaClick);

    return () => {
      detachListeners(targetPoiLayers, handlePoiClick);
      detachListeners(targetAreaLayers, handleAreaClick);
      popupRef.current?.remove();
    };
  }, [
    map,
    config.poiSourceLayers,
    config.areaSourceLayers,
    config.poiLayerIds,
    config.areaLayerIds,
    onSelectPoi,
    onSelectArea,
  ]);
};
