import { SearchBarWithResults } from "./SearchBar/SearchBar";
import { useEditorContext } from '@/context/editorContext';
import type { MapTheme } from '@/types/map.theme.types';
import { useTheme } from '@/hooks/useTheme';
import SideBar from './Sidebar';
import MapTools from "./MapTools";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onMenuToggle: () => void;
  onRouteToggle?: () => void;
  isRoutingMode?: boolean
  onGlobeProjection?: () => void;
  onThemeToggle?: (theme: MapTheme) => void;
  currentTheme?: MapTheme;
  projection: boolean;
}

export const Header = ({
  searchQuery,
  onSearchChange,
  onMenuToggle,
  onRouteToggle,
  isRoutingMode = false,
  onGlobeProjection,
  projection
}: HeaderProps) => {
  const { editorEnabled, toggleEditor } = useEditorContext();
  const {  currentTheme, themeStyles } = useTheme()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex items-start justify-between p-6 overflow-visible">
      {/* Left Floating Capsule */}
      <SideBar themeStyles={ themeStyles} onMenuToggle={onMenuToggle} />
      {/* Center Search Container */}
        <SearchBarWithResults value={searchQuery} onChange={onSearchChange}/>
      {/* Right Floating Capsule */}
      <MapTools
        themeStyles={themeStyles}
        currentTheme={currentTheme}
        editorEnabled={editorEnabled}
        isRoutingMode={isRoutingMode}
        onRouteToggle={onRouteToggle}
        toggleEditor={toggleEditor}
        onGlobeProjection={onGlobeProjection}
        projection={projection}
      />

      </div>

  );
};
