import {Sun, Moon, Sparkles, Droplets} from 'lucide-react';
import type {themeOptions}from '@/types/map.theme.types'
import {

  LIGHT_COLOR_SCHEME,
  DARK_COLOR_SCHEME,
  BLUE_SHADES_COLOR_SCHEME,
  PURPLE_SHADES_COLOR_SCHEME,
} from "./layers/colors";

export const THEME_OPTIONS: themeOptions[] = [
  { id: 'light', label: 'Light', Icon: Sun, colorClass: 'text-amber-500 hover:text-amber-600 hover:bg-amber-50' },
  { id: 'dark', label: 'Dark', Icon: Moon, colorClass: 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50' },
  { id: 'blues', label: 'Blue', Icon: Droplets, colorClass: 'text-sky-500 hover:text-sky-600 hover:bg-sky-50' },
  { id: 'purple', label: 'Purple', Icon: Sparkles, colorClass: 'text-purple-600 hover:text-purple-700 hover:bg-purple-50' },
];


export const THEME_MAP = {
  light: LIGHT_COLOR_SCHEME,
  dark: DARK_COLOR_SCHEME,
  blues: BLUE_SHADES_COLOR_SCHEME,
  purple: PURPLE_SHADES_COLOR_SCHEME,
} as const
