import { Sun } from "lucide-react"
import type { MapTheme } from "@/types/map.theme.types"

interface ThemeButtonProps{
  id: string
  label: string
  isSelected: boolean
  themeStyles : Record<string, string>
  colorClass : string
  Icon : typeof Sun
  handleSelectTheme : (id : MapTheme)=>void
}
export default function ThemeButton({id , label, isSelected , themeStyles , colorClass,Icon ,  handleSelectTheme} :ThemeButtonProps)

{
 return ( <button
                 key={id}
                 onClick={() => handleSelectTheme(id as MapTheme) }
                 title={label}
                 aria-label={label}
                 className={`relative flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 ${
                   isSelected
                     ? themeStyles.dropdownActiveItem
                     : colorClass
                 }`}
               >
                 <Icon className="w-4 h-4" />
                 {isSelected && (
                   <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                   </span>
                 )}
               </button>)
}
