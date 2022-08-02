import { useNavigate, useParams } from 'react-router-dom'

import { ToolBox } from 'components/ToolBox'

import { Base } from 'templates/Base'

export function UserDetails() {
  const { id = 'new' } = useParams<'id'>()

  const navigate = useNavigate()

  const handleSave = () => {
    console.log('handleSave')
  }

  const handleDelete = () => {
    console.log('handleDelete')
  }

  return (
    <Base>
      <ToolBox
        textButtonNew="Nova"
        showButtonSaveAndClose
        showButtonNew={id !== 'new'}
        showButtonDelete={id !== 'new'}
        //
        buttonClickSave={handleSave}
        buttonClickSaveAndClose={handleSave}
        buttonClickDelete={handleDelete}
        buttonClickNew={() => navigate(`/users/details/new`)}
        buttonClickBack={() => navigate(`/users/`)}
      />
      {id}
    </Base>
  )
}
