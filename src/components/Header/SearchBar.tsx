import React from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onFlyTo?: (lng: number, lat: number) => void;
  placeholder?: string;
}

export const SearchBarWithResults: React.FC<Props> = ({
  value,
  onChange,
  onFlyTo,
  placeholder = 'Search for places',
}) => {
  // mapRef is now optional inside useSearch, so no error here.
  // It will look for (window as any).map internally.
  const { features, loading, handleFlyTo } = useSearch({ query: value });

  const handleSelectPlace = (index: number) => {
    const feature = features[index];
    if (!feature) return;

    // 1. Trigger the fly animation logic inside the hook using Option A (window.map)
    handleFlyTo(index);

    // 2. Update global state in App.tsx (updates markers and mapCenter state)
    if (onFlyTo) {
      const [lng, lat] = feature.geometry.coordinates;
      onFlyTo(lng, lat);
    }

    // 3. Close results by clearing the input
    onChange('');
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none z-10" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-14 !pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Show results list only if value exists */}
      {value && (
        <div className="absolute top-full mt-1 w-full max-h-80 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow z-20">
          {loading && (
            <div className="px-4 py-3 text-sm text-gray-500 italic">Searching…</div>
          )}
          
          {!loading && features.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">No results found</div>
          )}

          {!loading && features.map((f, index) => (
            <button
              key={f.properties.gid || f.properties.id || index}
              onClick={() => handleSelectPlace(index)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 border-gray-100 transition-colors"
            >
              <div className="font-medium text-gray-900">{f.properties.name}</div>
              <div className="text-xs text-gray-500 truncate">{f.properties.label}</div>
            </button>
          ))}
        </div>
      )}
    </div>  
  );
};