import { Base } from 'templates/Base'
import HomeTemplate from 'templates/Home'

import { AppBarTool } from 'components/AppBarTool'

const Home = () => {
  return (
    <Base>
      <AppBarTool title="Homepage" />
      <HomeTemplate />
    </Base>
  )
}

export default Home
