import {createContext} from 'react'
import maplibregl from 'maplibre-gl'


export const mapContext = createContext<maplibregl.Map| null >(null); 

