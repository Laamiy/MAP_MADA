
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search for places',
}) => {
  return (
    <div className="flex-1 max-w-2xl">
      <div className="relative w-full">
        {/* Search Icon */}
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none z-10"
        />

        {/* Input */}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            h-14
            pl-[2.75rem] pr-4 py-2.5
            bg-white
            border border-gray-300
            rounded-lg
            shadow-sm
            text-gray-800 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition
          "
          style={{
            paddingLeft: '2.75rem', // ensures space for the icon even if Tailwind resets fail
          }}
        />
      </div>
    </div>
  );
};
