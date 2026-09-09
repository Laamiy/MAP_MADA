import { motion } from 'framer-motion';
import { useSearch } from '@/hooks/useSearch';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchResultItem } from './SearchResultItem';

interface SearchResultProps {
  value: string;
  map: maplibregl.Map | null;
  styles: Record<string, string>;
  onClear: () => void;
}

export function SearchResult({ value, map, onClear, styles }: SearchResultProps) {
  const { features, loading, handleFlyTo } = useSearch({ query: value, map });

  const handleSelectPlace = (index: number) => {
    const feature = features[index];
    if (!feature) return;
    handleFlyTo(index);
    onClear(); // Clears input, removing the dropdown
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.99 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute top-full left-0 right-0 mt-3 w-full max-h-95 overflow-y-auto border rounded-2xl shadow-2xl z-50 p-2 backdrop-blur-xl origin-top ${styles.dropdownBg}`}
    >
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-1 w-full"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2.5 w-full">
              <Skeleton className="h-9 w-9 rounded-xl shrink-0" />
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <Skeleton className="h-3 w-28 rounded-md" />
                <Skeleton className="h-2.5 w-full max-w-45 rounded-md" />
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {!loading && features.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`py-8 text-center text-xs font-medium tracking-tight w-full italic ${styles.textSecondary}`}
        >
          No results found for <span className={`font-semibold not-italic ${styles.textPrimary}`}>"{value}"</span>
        </motion.div>
      )}

      {!loading && features.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
          <div className={`px-3 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-widest ${styles.textSecondary}`}>
            Locations
          </div>

          <div className="space-y-1 w-full">
            {features.map((feature, index) => (
              <SearchResultItem
                key={feature.properties.gid || feature.properties.id || index}
                feature={feature}
                styles={styles}
                onSelect={() => handleSelectPlace(index)}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
