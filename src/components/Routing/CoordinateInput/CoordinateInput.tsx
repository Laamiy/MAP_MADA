import React from 'react';
import type { OSRMCoordinate } from '@/types/osrm.types';
interface CoordinateInputProps {
  label: string;
  coordinate: OSRMCoordinate;
  onChange: (coordinate: OSRMCoordinate) => void;
  markerColor?: string;
  disabled?: boolean;
  pathIcon?: string | undefined;
}

export const CoordinateInput: React.FC<CoordinateInputProps> = ({
                                                                    label,
                                                                    coordinate,
                                                                    onChange,
                                                                    markerColor = '#ff0000',
                                                                    disabled = false,
                                                                    pathIcon,
                                                                  }) => {
  return (
    <div className="flex items-start gap-4 p-2 bg-white rounded-2xl shadow-sm border justify-center border-gray-100">
      <div
        className="w-18 h-18 rounded-full shadow-inner shrink-0 relative overflow-hidden self-center"
        style={{ backgroundColor: markerColor }}
      >
        <label className="flex items-end justify-center h-[80%] w-full">
          <img src={pathIcon} alt="Not found" width="40" height="40" />
        </label>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 mb-4">{label}</p>

        <div className="grid gap-3">
          <label className="block">
            <span className="sr-only">Latitude</span>

            <input
              type="number"
              step="0.01"
              value={coordinate.lat}
              onChange={(e) =>onChange({ ...coordinate, lat: parseFloat(e.target.value) })}
              placeholder="Latitude"
              disabled={disabled}
              className="w-full px-2 py-3 text-sm bg-gray-100  rounded-xl
                     placeholder:text-gray-400 text-gray-900
                     hover:border-gray-300 focus:border-blue-500 
                     disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
                     transition-all duration-200 outline-none"
            />
          </label>

          <label className="block">
            <span className="sr-only">Longitude</span>
            <input
              type="number"
              step="0.01"
              value={coordinate.lng}
              onChange={(e) => onChange({ ...coordinate, lng: parseFloat(e.target.value) })}
              placeholder="Longitude"
              disabled={disabled}
              className="w-full px-2 py-3 text-sm bg-gray-100  rounded-xl
                     placeholder:text-gray-400 text-gray-900
                     hover:border-gray-300 focus:border-blue-500  focus:ring-blue-500/20
                     disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
                     transition-all duration-200 outline-none"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

