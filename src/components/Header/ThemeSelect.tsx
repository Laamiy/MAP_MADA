import { Sun } from "lucide-react";
import type { MapTheme } from "@/types/map.theme.types";
import { THEME_OPTIONS } from "@/constants/theme.constant";
import ThemeButton from "./ThemeButton";
import { useThemeSelect } from "@/hooks/useThemeSelect";

interface ThemeSelectProps {
  currentTheme : MapTheme
  themeStyles : Record<string , string>
}

export default function ThemeSelect( {currentTheme , themeStyles } :ThemeSelectProps)
{


  const ActiveIcon = THEME_OPTIONS.find((t) => t.id === currentTheme)?.Icon || Sun;
  const { isThemeOpen , setIsThemeOpen, dropdownRef, handleSelectTheme } = useThemeSelect()

  return(<div className="relative w-10" ref={dropdownRef}>
            <button
              onClick={() => setIsThemeOpen((prev : boolean) => !prev)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${themeStyles.textSecondary} transition-colors
                          ${themeStyles.hover}
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
                          ${isThemeOpen ? themeStyles.themeBtnActive : ''}
                        `}
              aria-label="Select Theme"
              title="Theme Schemes"
            >
              <ActiveIcon className="w-4 h-4" />
            </button>

            <div
              className={`absolute top-full left-0 right-0 mt-2 w-10 p-1 ${themeStyles.dropdownBg} border
                          rounded-2xl shadow-xl backdrop-blur-xl flex flex-col items-center gap-1.5
                          transition-all duration-300 ease-out origin-top ${
                isThemeOpen
                  ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-y-95 -translate-y-3 pointer-events-none'
              }`}
            >
              {
                THEME_OPTIONS.map(({ id, label, Icon, colorClass }) => {
                    const isSelected = currentTheme === id;
                    return <ThemeButton  id={id}
                                          label={label}
                                          Icon={Icon}
                                          colorClass={colorClass}
                                          isSelected={isSelected}
                                          handleSelectTheme={handleSelectTheme}
                                          themeStyles={themeStyles}
                            />;

                  })
              }
            </div>
       </div>)
}
