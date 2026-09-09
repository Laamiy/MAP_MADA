import ThemeSelect from './ThemeSelect';
import {  Globe, Route } from 'lucide-react';
import { ActionButton } from './ActionButton';
import type { MapTheme } from '@/types/map.theme.types';

interface MapToolsProps {
  themeStyles: Record<string, string>
  currentTheme: MapTheme
  onRouteToggle: (() => void) |undefined
  isRoutingMode? : boolean
  toggleEditor : ()=>void
  editorEnabled : boolean
  onGlobeProjection :(()=>void)|undefined
  projection:boolean
}

export default function MapTools({themeStyles,currentTheme, onRouteToggle , isRoutingMode , toggleEditor, editorEnabled , onGlobeProjection, projection}: MapToolsProps)
{
  return ( <div className={`pointer-events-auto flex items-start gap-1.5 h-14 px-3 py-2 border rounded-2xl shrink-0 ${themeStyles.capsule}`}>

    {/* Directions */}
    {onRouteToggle && (
      <ActionButton
        onClick={onRouteToggle}
        icon={<Route className="w-4 h-4" />}
        label="Directions"
        isActive={isRoutingMode}
        activeClassName="bg-green-500/20 text-green-500 border border-green-500/40 hover:bg-green-500/30"//"bg-emerald-600 text-white shadow-md"
        inactiveClassName={`${themeStyles.textSecondary} ${themeStyles.hover}`}
        ariaLabel="Toggle routing mode"
        title={isRoutingMode ? 'Exit route planning' : 'Plan route'}
      />
    )}

    {/* Editor Toggle */}
    <ActionButton
      onClick={toggleEditor}
      icon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      }
      label="Editor"
      isActive={editorEnabled}
      activeClassName="bg-red-500/20 text-red-500 border border-red-500/40 hover:bg-red-500/30"
      inactiveClassName={`${themeStyles.textSecondary} ${themeStyles.hover}`}
      ariaLabel="Toggle POI editor"
      title={editorEnabled ? 'Exit POI editor' : 'Enter POI editor'}
    />

    <div className={`h-5 w-px ${themeStyles.divider} mx-1 my-2 hidden md:block`} />

    {/* Globe Projection (Icon-only) */}
    <ActionButton
      onClick={onGlobeProjection}
      label="Glob"
      isActive={projection}
      icon={<Globe className="w-4 h-4" />}
      activeClassName="bg-blue-500/20 text-blue-500 border border-blue-500/40 hover:bg-blue-500/30"
      inactiveClassName={`${themeStyles.textSecondary} ${themeStyles.hover}`}
      ariaLabel="Toggle globe projection"
      title="Toggle projection"
      className="hidden md:flex"
    />

    {/* Morphing Capsule Dropdown */}
    <ThemeSelect currentTheme={currentTheme} themeStyles={themeStyles} />
    {/* Morphing Capsule Dropdown */}
  </div>)
}
