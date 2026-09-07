import {Sun} from 'lucide-react'

export type MapTheme = 'light' | 'dark' | 'blues' | 'purple';

export interface themeOptions{
  id: MapTheme;
  label: string;
  Icon: typeof Sun;
  colorClass: string
}
