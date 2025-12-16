export interface PointOfInterestInterface {
  osm_id: string
  name: string
  amenity?: string
  tourism?: string
  shop?: string
  man_made?: string
  leisure?: string
  natural?: string
  tags?: string
  version: number
  lat: number
  lng: number
  [key: string]: any
}
