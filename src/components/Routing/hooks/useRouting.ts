import { useState } from "react";
import type { OSRMCoordinate } from "../../../types/osrm.types";


export const useRouting = () =>
    {
        // Routing state
        const [routingMode, setRoutingMode] = useState(false);
        const [startPoint, setStartPoint]   = useState<OSRMCoordinate | null>(null);
        const [endPoint, setEndPoint]       = useState<OSRMCoordinate | null>(null);
        
        const enableRoutingMode = () => 
        {
            setRoutingMode(true);
            setStartPoint(null);
            setEndPoint(null);
        };

        const disableRoutingMode = () => 
        {
            setRoutingMode(false);
            setStartPoint(null);
            setEndPoint(null);
        };

        const clearRoute = () => 
        {
            setStartPoint(null);
            setEndPoint(null);
        };
        return { enableRoutingMode , disableRoutingMode , clearRoute , setStartPoint , setEndPoint ,  startPoint , endPoint , routingMode}
    }
