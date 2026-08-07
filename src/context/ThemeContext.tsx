import { createContext, React, useState } from 'react'

export type themeType = "dark" | "light"

const ThemeContext = createContext<themeType>("dark")
type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export function ThemeProvider({ children }: React.ReactNode)
{
  const [theme, setTheme] = useState<themeType>("dark")
  setTheme((prev) => prev ==="dark" ? "light" : "dark")
  return (
            <ThemeContext.Provider value={theme} >
                  {children}
            </ThemeContext.Provider>
          )
  }
