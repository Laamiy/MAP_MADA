import { useAppSelector } from "@/store/store";

export function useTheme()
{
    const currentTheme = useAppSelector((state) => state.theme.currentTheme);
    const isDarkMap = currentTheme === 'dark';

    const themeStyles = {
     capsule: isDarkMap
       ? 'bg-white/75 border-gray-200/80 text-gray-800 shadow-xl backdrop-blur-xl'
       : 'bg-slate-900/80 border-slate-800/80 text-slate-200 shadow-xl backdrop-blur-xl',

     hover: isDarkMap ? 'hover:bg-black/5' : 'hover:bg-white/10',
     textPrimary: isDarkMap ? 'text-gray-900' : 'text-slate-100',
     textSecondary: isDarkMap ? 'text-gray-700' : 'text-slate-200',
     divider: isDarkMap ? 'bg-gray-300/60' : 'bg-slate-700/60',

     dropdownBg: isDarkMap
       ? 'bg-white/90 border-gray-200/80'
       : 'bg-slate-900/90 border-slate-800/80',
     dropdownActiveItem: isDarkMap ? 'bg-black/10 shadow-inner' : 'bg-white/20 shadow-inner',
     themeBtnActive: isDarkMap ? 'bg-black/5' : 'bg-white/10',
   };
    const Searchstyles = {
          inputBg: isDarkMap
            ? 'bg-slate-900/85 border-slate-800/80 text-slate-100 placeholder:text-slate-400/60 focus:bg-slate-900 focus:border-slate-700/80'
            : 'bg-white/80 border-gray-200/80 text-gray-900 placeholder:text-gray-400/60 focus:bg-white focus:border-gray-300',
          dropdownBg: isDarkMap
            ? 'bg-slate-900/90 border-slate-800/80 text-slate-200'
            : 'bg-white/90 border-gray-200/80 text-gray-800',
          itemHover: isDarkMap
            ? 'hover:bg-slate-800/60 focus-visible:bg-slate-800/60 text-slate-200'
            : 'hover:bg-slate-100/80 focus-visible:bg-slate-100/80 text-gray-800',
          searchIcon: isDarkMap ? 'text-slate-400 group-focus-within:text-emerald-400' : 'text-gray-400 group-focus-within:text-emerald-600',
          textPrimary: isDarkMap ? 'text-slate-100' : 'text-gray-900',
          textSecondary: isDarkMap ? 'text-slate-400' : 'text-gray-500',
          clearBtn: isDarkMap ? 'bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700' : 'bg-gray-100 text-gray-400 hover:text-gray-800 hover:bg-gray-200',
          pinBg: isDarkMap ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600',
    }
   return {currentTheme, themeStyles , Searchstyles}
}
