import { Base } from 'templates/Base'
import { DashboardTemplate } from 'templates/Dashboard'

import { AppBarTool } from 'components/AppBarTool'

const Home = () => {
  return (
    <Base>
      <AppBarTool title="Dashboard" />
      <DashboardTemplate />
    </Base>
  )
}

export default Home
