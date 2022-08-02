import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ToolBox } from 'components/ToolBox'

import { Base } from 'templates/Base'

import { Users } from 'services/Users'
import { LinearProgress, Paper, Typography } from '@mui/material'

export function UserDetails() {
  const [isLoading, setIsLoading] = useState(false)
  const [fullName, setFullName] = useState('')

  const { id = 'new' } = useParams<'id'>()

  const navigate = useNavigate()

  const handleSave = () => {
    console.log('handleSave')
  }

  const handleDelete = (id: number) => {
    if (confirm('Deseja relamente excluir este registro?')) {
      Users.deleteById(id).then((response) => {
        if (response instanceof Error) {
          alert(response.message)
        } else {
          alert('Registro excluir com sucesso!')
          navigate(`/users/`)
        }
      })
    }
  }

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true)
      Users.getById(Number(id)).then((response) => {
        setIsLoading(false)
        if (response instanceof Error) {
          navigate(`/users/`)
        } else {
          setFullName(response.fullname)
        }
      })
    }
  }, [id, navigate])

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
        buttonClickDelete={() => handleDelete(Number(id))}
        buttonClickNew={() => navigate(`/users/details/new`)}
        buttonClickBack={() => navigate(`/users/`)}
      />
      <Paper>
        <Typography variant="h6" component="div" p={2}>
          {id === 'new' ? 'Novo Registro' : `Editando o registro [${fullName}]`}
        </Typography>
      </Paper>
      {isLoading && <LinearProgress variant="indeterminate" />}
    </Base>
  )
}
