import { Button } from '@mui/material'

import { Base } from 'templates/Base'
import { DashboardTemplate } from 'templates/Dashboard'

import { AppBarTool } from 'components/AppBarTool'

const Home = () => {
  return (
    <Base>
      <AppBarTool title="Dashboard">
        <Button color="inherit">Criar Registro</Button>
      </AppBarTool>
      <DashboardTemplate />
    </Base>
  )
}

export default Home
