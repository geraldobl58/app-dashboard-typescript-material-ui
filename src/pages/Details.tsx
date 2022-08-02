import { Base } from 'templates/Base'

import { AppBarTool } from 'components/AppBarTool'

import { UserDetails } from 'templates/UserDetails'

const Details = () => {
  return (
    <Base>
      <AppBarTool title="Usuários" />
      <UserDetails />
    </Base>
  )
}

export default Details
