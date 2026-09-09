
import type { MapTheme } from "@/types/map.theme.types";
import { useAppDispatch } from "@/store/store";
import { setTheme } from "@/store/themeSlice";
import {onThemeToggle} from '@/utils/map.theme.utils'

import { useState , useRef , useEffect} from "react";
export function useThemeSelect()
{
  const [isThemeOpen , setIsThemeOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


     const handleSelectTheme = (theme: MapTheme) => {
       dispatch(setTheme(theme));
       onThemeToggle?.(theme);
       setIsThemeOpen(false);
     };
     return {isThemeOpen,setIsThemeOpen , dropdownRef , handleSelectTheme}
}
