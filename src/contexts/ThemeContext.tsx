import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

import { Box, ThemeProvider } from '@mui/material'

import { DarkTheme } from 'styles/theme/dark'
import { LightTheme } from 'styles/theme/light'

type ThemeContextData = {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext({} as ThemeContextData)

type ThemeProviderProps = {
  children: React.ReactNode
}

export const useAppThemeContext = () => {
  return useContext(ThemeContext)
}

export const AppThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light')

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === 'light' ? 'dark' : 'light'
    )
  }, [])

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme

    return DarkTheme
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
