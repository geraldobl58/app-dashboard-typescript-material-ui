import { Base } from 'templates/Base'

import { AppBarTool } from 'components/AppBarTool'
import { LocationTemplate } from 'templates/Location'

const Location = () => {
  return (
    <Base>
      <AppBarTool title="Clientes" />
      <LocationTemplate />
    </Base>
  )
}

export default Location
