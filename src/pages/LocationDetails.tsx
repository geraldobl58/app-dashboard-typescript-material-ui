import { Base } from 'templates/Base'

import { AppBarTool } from 'components/AppBarTool'

import { LocationDetails } from 'templates/LocationDetails'

const Details = () => {
  return (
    <Base>
      <AppBarTool title="Cidades" />
      <LocationDetails />
    </Base>
  )
}

export default Details
