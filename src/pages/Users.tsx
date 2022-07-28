import { Base } from 'templates/Base'

import { AppBarTool } from 'components/AppBarTool'
import { UserTemplate } from 'templates/Users'

const Users = () => {
  return (
    <Base>
      <AppBarTool title="Usuários" />
      <UserTemplate />
    </Base>
  )
}

export default Users
