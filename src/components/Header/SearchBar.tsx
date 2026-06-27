  import React from 'react';
  import { Search, MapPin, X } from 'lucide-react';
  import { useSearch } from '@/hooks/useSearch';
  import { Skeleton } from '@/components/ui/skeleton';
  import { motion, AnimatePresence } from 'framer-motion';

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
    placeholder = 'Search for places...',
  }) => {
    const { features, loading, handleFlyTo } = useSearch({ query: value });

    const handleSelectPlace = (index: number) => {
      const feature = features[index];
      if (!feature) return;

      handleFlyTo(index);

      if (onFlyTo) {
        const [lng, lat] = feature.geometry.coordinates;
        onFlyTo(lng, lat);
      }

      onChange('');
    };

    return (
      <div className="relative w-full overflow-visible">
        {/* Search Input Container */}
        <div className="relative w-full group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10 transition-transform duration-200 group-focus-within:scale-95">
            <Search className="w-4 h-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
          </div>
          
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          className="w-full h-14 pl-12 pr-12 bg-background/70 border border-border rounded-2xl shadow-sm text-sm 
          font-medium tracking-tight placeholder:text-foreground/30 text-foreground transition-all duration-200 outline-none focus:bg-background 
          focus:border-foreground/20 focus:ring-[3px] focus:ring-foreground/5"
          />

          <AnimatePresence>
            {value && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: '-50%' }}
                animate={{ opacity: 1, scale: 1, y: '-50%' }}
                exit={{ opacity: 0, scale: 0.8, y: '-50%' }}
                onClick={() => onChange('')}
                className="absolute right-4 top-1/2 flex h-6 w-6 items-center justify-center rounded-lg bg-muted text-foreground/40 hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <X size={12} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Results Dropdown */}
        <AnimatePresence mode="wait">
          {value && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.99 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 mt-3 w-full max-h-95 overflow-y-auto bg-background/80 border border-border rounded-2xl shadow-2xl z-50 p-2 backdrop-blur-xl origin-top"
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
                  className="py-8 text-center text-xs font-medium tracking-tight text-foreground/40 w-full italic"
                >
                  No results found for <span className="font-semibold text-foreground not-italic">"{value}"</span>
                </motion.div>
              )}

              {!loading && features.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full"
                >
                  <div className="px-3 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-foreground/30">
                    Locations
                  </div>
                  
                  <div className="space-y-0.5 w-full">
                    {features.map((f, index) => (
                      <button
                        key={f.properties.gid || f.properties.id || index}
                        onClick={() => handleSelectPlace(index)}
                        className="w-full flex items-center gap-3.5 rounded-xl px-3 py-2.5 text-left cursor-pointer transition-all duration-150 border-none bg-transparent hover:bg-muted/80 focus-visible:bg-muted focus-visible:outline-none group"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/5 border border-primary/10 transition-colors group-hover:bg-primary/10 group-hover:border-primary/20">
                          <MapPin size={15} className="text-primary" />
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <span className="truncate text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                            {f.properties.name}
                          </span>
                          {f.properties.label && (
                            <span className="truncate text-[11px] text-foreground/40 mt-0.5 font-medium tracking-tight">
                              {f.properties.label}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>  
    );
  };