export type TagDict   = Record<string, string>;
export type inputType = editorPoi | TagDict | object | string | undefined | null;

export interface editorPoi 
{
  id: number;
  version: number;
  lng?: number;
  lat?: number;
  tags: TagDict;
}

export interface editorProps 
{
  poi: editorPoi | null;
  onClose: () => void;
  onDone: () => void;
}

export type PoiRow =  {
                osm_id: string;
                name: string | null;
                amenity: string | null;
                tourism: string | null;
                shop: string | null;
                man_made: string | null;
                leisure: string | null;
                natural: string | null;
                tags: PoiTags;
                version: number;
                lng: number;
                lat: number;
                public_transport: string | null;
              }

export type  PoiTags  = {
  name?: string;
  amenity?: string;
  shop?: string;
  tourism?: string;
  man_made?: string;
  leisure?: string;
  natural?: string;
  public_transport?: string;
  [key: string]: string | undefined;
}