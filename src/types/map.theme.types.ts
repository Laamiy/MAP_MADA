import {Sun} from 'lucide-react'
import  {LIGHT_COLOR_SCHEME} from '@/constants/layers/colors'

export type MapTheme = 'light' | 'dark' | 'blues' | 'purple';
export type ThemeScheme = typeof LIGHT_COLOR_SCHEME
export interface themeOptions{
  id: MapTheme;
  label: string;
  Icon: typeof Sun;
  colorClass: string
}
