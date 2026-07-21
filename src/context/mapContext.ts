import {createContext} from 'react'
import maplibregl from 'maplibre-gl'
// import { useMapLibre } from '@/hooks/Map/useMapLibre';
// import { useMapState } from '@/hooks/Map/useMapState';


export const mapContext = createContext<maplibregl.Map| null >(null); 
// export function mapProvider({children}:HTMLElement) 
// {
//   const {
//     searchQuery,
//     mapCenter,
//     zoom,
//     setSearchQuery,
//     setZoom,
//     toggleSidebar,
//   } = useMapState();

//   const { mapContainer, map} = useMapLibre({ center : mapCenter, zoom: zoom, onZoomChange:  setZoom })

//     return <mapContext.Provider value = {}>
//         {children}
//         </mapContext.Provider>
// }