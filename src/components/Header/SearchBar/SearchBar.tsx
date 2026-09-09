import { useContext } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mapContext } from '@/context/mapContext';
import { useTheme } from '@/hooks/useTheme';
import { SearchResult } from './SearchResult';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBarWithResults = ({
  value,
  onChange,
  placeholder = 'Search for places...',
}: SearchBarProps) => {
  const map = useContext(mapContext);
  const { Searchstyles: styles } = useTheme();

  return (
    <div className="pointer-events-auto flex-1 max-w-2xl min-w-0 mx-6 relative overflow-visible shadow-xl rounded-2xl">
      <div className="relative w-full overflow-visible">
        {/* Search Input Container */}
        <div className="relative w-full group overflow-hidden rounded-2xl shadow-xl backdrop-blur-xl">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10 transition-transform duration-200 group-focus-within:scale-95">
            <Search className={`w-4 h-4 transition-colors ${styles.searchIcon}`} />
          </div>

          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full h-14 pl-12 pr-12 border shadow-sm text-sm font-medium tracking-tight transition-all duration-200 outline-none ${styles.inputBg}`}
          />

          <AnimatePresence>
            {value && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: '-50%' }}
                animate={{ opacity: 1, scale: 1, y: '-50%' }}
                exit={{ opacity: 0, scale: 0.8, y: '-50%' }}
                onClick={() => onChange('')}
                className={`absolute right-4 top-1/2 flex h-6 w-6 items-center justify-center rounded-lg transition-colors ${styles.clearBtn}`}
              >
                <X size={12} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Results Dropdown */}
        <AnimatePresence mode="wait">
          {value && (
            <SearchResult
              value={value}
              map={map}
              styles={styles}
              onClear={() => onChange('')}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
