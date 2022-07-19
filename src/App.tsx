import { BrowserRouter } from 'react-router-dom'

import GlobalStyles from 'styles/global'
import { AppRoutes } from 'routes'
import { ThemeProvider } from '@mui/material'

import { LightTheme } from 'styles/theme/light'

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
        <GlobalStyles />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
