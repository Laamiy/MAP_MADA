import { MapPin } from 'lucide-react';

interface FeatureItemProps {
  feature: {
    properties: {
      gid?: string;
      id?: string;
      name: string;
      label?: string;
    };
  };
  styles: Record<string, string>;
  onSelect: () => void;
}

export function SearchResultItem({ feature, styles, onSelect }: FeatureItemProps) {
  return (
    <button
      onClick={onSelect}
      className={`relative w-full flex items-center gap-3.5 rounded-xl px-3 py-2.5 text-left cursor-pointer transition-all duration-150 border-none bg-transparent group overflow-hidden ${styles.itemHover}`}
    >
      {/* Glowing Indicator Bar */}
      <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full bg-cyan-400 opacity-0 shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-200 group-hover:opacity-100 group-hover:w-1 group-focus-visible:opacity-100 group-focus-visible:w-1" />

      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${styles.pinBg}`}>
        <MapPin size={15} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <span className={`truncate text-sm font-semibold tracking-tight transition-colors group-hover:text-emerald-400 ${styles.textPrimary}`}>
          {feature.properties.name}
        </span>
        {feature.properties.label && (
          <span className={`truncate text-[11px] mt-0.5 font-medium tracking-tight ${styles.textSecondary}`}>
            {feature.properties.label}
          </span>
        )}
      </div>
    </button>
  );
}
