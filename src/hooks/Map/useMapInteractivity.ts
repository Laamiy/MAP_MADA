import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { FeatureProperties , ClickEvent} from "@/types/map.types";
import { getStringProp, formatCategory , resolveLayerIds , handleAreaClick , clearAdminHighlight} from "@/utils/map.utils";

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

export const useMapInteractivity = ({ map, config, onSelectPoi, onSelectArea,}: UseMapInteractivityProps) => {
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const selectedFeatureRef = useRef<{ source: string; sourceLayer?: string; id: string | number } | null>(null);

  useEffect(() => {
    if (!map)
      return;

    popupRef.current = new maplibregl.Popup({
      closeButton: true,
      closeOnClick: true,
      maxWidth: "300px",
      offset: 15,
    });
    const clearSelectedFeature = () => {
      if (selectedFeatureRef.current && map)
      {
        map.setFeatureState(selectedFeatureRef.current, { selected: false });
        selectedFeatureRef.current = null;
      }
    };

    popupRef.current.on("close", () =>
    {
      clearSelectedFeature();
      clearAdminHighlight(map);
    });


    const targetPoiLayers  = resolveLayerIds(map , config.poiLayerIds, config.poiSourceLayers);
    const targetAreaLayers = resolveLayerIds(map, config.areaLayerIds, config.areaSourceLayers);

    const onBgClick = (e: maplibregl.MapMouseEvent) => {
      const hits = map.queryRenderedFeatures(e.point, { layers: targetAreaLayers, });
      console.log(`PLACE LAYERS : ${JSON.stringify(targetAreaLayers)}`)
      if (hits.length === 0)
      {
        clearAdminHighlight(map);
      }
    };

    map.on("click", onBgClick);

    const handleMouseEnter = () => {
      map.getCanvas().style.cursor = "pointer";
    };

    const handleMouseLeave = () => {
      map.getCanvas().style.cursor = "";
    };

    const handlePoiClick = (e: ClickEvent) => {
      if (!e.features || e.features.length === 0)
        return;
      clearSelectedFeature();

      const feature = e.features[0];
      const props: FeatureProperties = feature.properties || {};

      const coordinates: [number, number] = feature.geometry.type === "Point"
          ? (feature.geometry.coordinates.slice() as [number, number])
          : [e.lngLat.lng, e.lngLat.lat];
// pulse effect :

// pulse effect :
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

    const attachListeners = ( layerIds: string[], clickHandler: (e: ClickEvent) => void) => {
      layerIds.forEach((id) => {
        if (map.getLayer(id))
        {
          map.on("mouseenter", id, handleMouseEnter);
          map.on("mouseleave", id, handleMouseLeave);
          map.on("click", id, clickHandler);
        }
      });
    };

    const detachListeners = ( layerIds: string[], clickHandler: (e: ClickEvent) => void) => {
      layerIds.forEach((id) => {
        if (map.getLayer(id))
        {
          map.off("mouseenter", id, handleMouseEnter);
          map.off("mouseleave", id, handleMouseLeave);
          map.off("click", id, clickHandler);
        }
      });
    };
    const onAreaClick = (e: ClickEvent) => handleAreaClick(map, e, onSelectArea);
    attachListeners(targetPoiLayers, handlePoiClick);
    attachListeners(targetAreaLayers, onAreaClick);

    return () => {
      detachListeners(targetPoiLayers, handlePoiClick);
      detachListeners(targetAreaLayers, onAreaClick);
      popupRef.current?.remove();
      clearSelectedFeature();
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
