import { Menu } from "lucide-react"

interface SideBarProps {
  themeStyles : Record<string , string>
  onMenuToggle : ()=>void
}

export default function SideBar({themeStyles , onMenuToggle} : SideBarProps)
{
  return <div className={`pointer-events-auto flex items-center gap-3 h-14 px-4 border rounded-2xl ${themeStyles.capsule}`}>
            <button
                onClick={onMenuToggle}
                className={`flex h-9 w-9 items-center justify-center rounded-xl bg-transparent transition-colors
                            ${themeStyles.hover} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500`}
                aria-label="Menu"
            >
              <Menu className={`w-5 h-5 ${themeStyles.textSecondary}`} />
            </button>
            <div className="flex items-center gap-2 pr-2">
              <h1 className={`text-sm font-semibold tracking-tight hidden sm:block ${themeStyles.textPrimary}`}>
                Maps
              </h1>
            </div>
         </div>
}
