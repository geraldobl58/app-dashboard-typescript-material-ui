import { Button } from '@mui/material'
import { useAppThemeContext } from 'contexts/ThemeContext'

const Home = () => {
  const { toggleTheme } = useAppThemeContext()

  return (
    <Button variant="contained" color="primary" onClick={toggleTheme}>
      Alterar Tema
    </Button>
  )
}

export default Home
