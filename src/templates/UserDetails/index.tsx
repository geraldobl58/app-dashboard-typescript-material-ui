import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { LinearProgress, Paper, Typography } from '@mui/material'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { ToolBox } from 'components/ToolBox'
import { VTextField } from 'components/VTextField'

import { Base } from 'templates/Base'

import { Users } from 'services/Users'

type FormDataProps = {
  fullname: string
  email: string
  locationId: string
}

export function UserDetails() {
  const [isLoading, setIsLoading] = useState(false)
  const [fullName, setFullName] = useState('')

  const formRef = useRef<FormHandles>(null)

  const { id = 'new' } = useParams<'id'>()

  const navigate = useNavigate()

  const handleSave = (data: FormDataProps) => {
    console.log(data)
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
        buttonClickSave={() => formRef.current?.submitForm()}
        buttonClickSaveAndClose={() => formRef.current?.submitForm()}
        buttonClickDelete={() => handleDelete(Number(id))}
        buttonClickNew={() => navigate(`/users/details/new`)}
        buttonClickBack={() => navigate(`/users/`)}
      />
      <Paper>
        <Typography variant="h6" component="div" p={2}>
          {id === 'new' ? 'Novo Registro' : `Editando o registro [${fullName}]`}
        </Typography>
      </Paper>
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField name="fullname" />
        <VTextField name="email" />
        <VTextField name="location" />
      </Form>
      {console.log(isLoading)}
      <LinearProgress />
    </Base>
  )
}
