import { createTheme } from '@mui/material'

import { lightBlue, teal } from '@mui/material/colors'

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: lightBlue[700],
      dark: lightBlue[800],
      light: lightBlue[500],
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: teal[500],
      dark: teal[400],
      light: teal[300],
      contrastText: '#FFFFFF'
    },
    background: {
      paper: '#303134',
      default: '#202124'
    }
  }
})
