
import React from 'react';
import type { OsrmCoordinate } from '../../../types/osrm.types';

interface CoordinateInputProps {
  label: string;
  coordinate: OsrmCoordinate;
  onChange: (coordinate: OsrmCoordinate) => void;
  markerColor?: string;
  disabled?: boolean;
}

export const CoordinateInput: React.FC<CoordinateInputProps> = ({
  label,
  coordinate,
  onChange,
  markerColor = '#ff0000',
  disabled = false,
}) => {
  return (
    <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Color Swatch */}
      <div
        className="w-12 h-12 rounded-xl shadow-inner flex-shrink-0 relative overflow-hidden"
        style={{ backgroundColor: markerColor }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 mb-4">{label}</p>

        <div className="grid gap-3">
          {/* Latitude Input */}
          <label className="block">
            <span className="sr-only">Latitude</span>
            <input
              type="number"
              step="0.0001"
              value={coordinate.lat}
              onChange={(e) =>
                onChange({ ...coordinate, lat: parseFloat(e.target.value) })
              }
              placeholder="Latitude"
              disabled={disabled}
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl
                     placeholder:text-gray-400 text-gray-900
                     hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                     disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
                     transition-all duration-200 outline-none"
            />
          </label>

          {/* Longitude Input */}
          <label className="block">
            <span className="sr-only">Longitude</span>
            <input
              type="number"
              step="0.0001"
              value={coordinate.lng}
              onChange={(e) =>
                onChange({ ...coordinate, lng: parseFloat(e.target.value) })
              }
              placeholder="Longitude"
              disabled={disabled}
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl
                     placeholder:text-gray-400 text-gray-900
                     hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                     disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
                     transition-all duration-200 outline-none"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
