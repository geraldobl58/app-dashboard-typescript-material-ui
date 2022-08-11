import { Base } from 'templates/Base'

import { AppBarTool } from 'components/AppBarTool'
import { LocationTemplate } from 'templates/Location'

const Users = () => {
  return (
    <Base>
      <AppBarTool title="Cidades" />
      <LocationTemplate />
    </Base>
  )
}

export default Users
