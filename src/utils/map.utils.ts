import maplibregl from "maplibre-gl";

type customSource = maplibregl.SourceSpecification & 
{
  tiles: string[];
};

export const handleZoomIn = (map: maplibregl.Map |null ) => map?.zoomIn();

export const handleZoomOut = (map: maplibregl.Map|null) => map?.zoomOut();

export const handleNavigationClick = ( map: maplibregl.Map, center: { lng: number; lat: number }, zoom: number) => 
    {
        map.flyTo({
                    center: [center.lng, center.lat],
                    zoom,
                    duration: 1000,
                });
    };

export const bustTiles = (map: maplibregl.Map) => {
  if (!map) return;

  try {
            const style = map.getStyle();
            if (!style?.sources) return;

            Object.keys(style.sources).forEach((sourceName) => {
                const source = style.sources[sourceName] as customSource;

                if (source?.tiles && Array.isArray(source.tiles)) 
                {
                    source.tiles = source.tiles.map((url: string) => {
                                                                            const baseUrl = url.split("?")[0];
                                                                            return `${baseUrl}?v=${Date.now()}`;
                                                                    });
                }
            });

            map.setStyle(style, { diff: false });
            map.triggerRepaint();
            console.log("[INFO] : Map hard-refreshed.");
        } 
    catch (err) 
    {
            console.error("[ERROR] : Tile bust error:", err);
    }
};

export const flyToFeature = ( map: maplibregl.Map, coords: [number, number], zoom = 16) => 
    {
        if (!map) return;
            map.flyTo({ center: coords, zoom, duration: 1200 });
    };  