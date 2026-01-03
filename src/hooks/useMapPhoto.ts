import { useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';

export interface MapPhotoData {
  id: string;
  name: string;
  photoUrl: string;
  city?: string;
  amenity?: string;
  lngLat: { lng: number; lat: number }; 
}

export const useMapPhotos = (map: React.MutableRefObject<maplibregl.Map | null>) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MapPhotoData | null>(null);

  const attachPhotoInteractions = useCallback(() => {
    if (!map.current) return;
    const mapInstance = map.current;

    // Tegola config
    const PHOTO_LAYER = 'locations-symbol';

   mapInstance.on('click', PHOTO_LAYER, (e) => {
  if (!e.features?.length) return;

  const props = e.features[0].properties;
  const filename = props?.storage_path?.split('/')?.at(-1) ; 
  console.log("[DEBUG] : actual object from server : ", props); 
  console.log("[DEBUG] Trying to load:", props?.storage_path?.split('/')?.at(-1));

  if (props)
    {
      // const fileName = `${props.id}.jpg`;
      const photoUrl = `http://192.168.88.133:8088/${filename}`;
      console.log("[DEBUG] Trying to load:", photoUrl);
      setSelectedPhoto(
        {
          id: String(props.id),
          name: String(props.name || 'Unnamed Location'),
          city: props.city,
          amenity: props.amenity,
          photoUrl: photoUrl,
          lngLat: (e.features[0].geometry as any).coordinates ? 
          { lng: (e.features[0].geometry as any).coordinates[0], lat: (e.features[0].geometry as any).coordinates[1] }: e.lngLat
        }
  );

  }

});

    // Change on hover
    mapInstance.on('mouseenter', PHOTO_LAYER, () => {
      mapInstance.getCanvas().style.cursor = 'pointer';
    });
    mapInstance.on('mouseleave', PHOTO_LAYER, () => {
      mapInstance.getCanvas().style.cursor = '';
    });
  }, [map]);

  return { selectedPhoto, setSelectedPhoto, attachPhotoInteractions };
};