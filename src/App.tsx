import { BrowserRouter } from 'react-router-dom'

import GlobalStyles from 'styles/global'

import { AppRoutes } from 'routes'

import { AppThemeProvider } from 'contexts/ThemeContext'

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <GlobalStyles />
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  )
}

export default App
