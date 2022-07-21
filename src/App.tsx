import { BrowserRouter } from 'react-router-dom'

import GlobalStyles from 'styles/global'

import { AppRoutes } from 'routes'

import { AppThemeProvider } from 'contexts/ThemeContext'

import { AppShell } from 'components/AppShell'

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <GlobalStyles />
        <AppShell>
          <AppRoutes />
        </AppShell>
      </BrowserRouter>
    </AppThemeProvider>
  )
}

export default App
