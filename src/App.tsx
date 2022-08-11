import 'translate'

import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from 'routes'

import { AppThemeProvider } from 'contexts/ThemeContext'
import { DrawerProvider } from 'contexts/DrawerContext'

import { AppShell } from 'components/AppShell'

import GlobalStyles from 'styles/global'

function App() {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <GlobalStyles />
          <AppShell>
            <AppRoutes />
          </AppShell>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  )
}

export default App
