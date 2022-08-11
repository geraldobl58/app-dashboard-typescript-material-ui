import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import * as yup from 'yup'

import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material'

import { Form } from '@unform/web'

import { ToolBox } from 'components/ToolBox'
import { VTextField } from 'components/VTextField'

import { Base } from 'templates/Base'

import { Users } from 'services/Users'

import { useVForm } from 'hooks/useVForm'

type FormDataProps = {
  fullname: string
  email: string
  locationId: number
}

const formValidationSchema: yup.SchemaOf<FormDataProps> = yup.object().shape({
  fullname: yup.string().required().min(3),
  email: yup.string().required().email(),
  locationId: yup.number().required()
})

export function UserDetails() {
  const [isLoading, setIsLoading] = useState(false)
  const [fullname, setFullname] = useState('')

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm()

  const { id = 'new' } = useParams<'id'>()

  const navigate = useNavigate()

  const handleSave = (data: FormDataProps) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true)
        if (id === 'new') {
          Users.create(validateData).then((response) => {
            setIsLoading(false)
            if (response instanceof Error) {
              alert(response.message)
            } else {
              if (isSaveAndClose()) {
                navigate(`/users/`)
              } else {
                navigate(`/users/details/${response}`)
              }
            }
          })
        } else {
          Users.updateById(Number(id), {
            id: Number(id),
            ...validateData
          }).then((response) => {
            setIsLoading(false)
            if (response instanceof Error) {
              alert(response.message)
            } else {
              if (isSaveAndClose()) {
                navigate(`/users/`)
              }
            }
          })
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {}

        errors.inner.forEach((error) => {
          if (!error.path) return

          validationErrors[error.path] = error.message
        })

        formRef.current?.setErrors(validationErrors)
      })
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
          setFullname(response.fullname)
          formRef.current?.setData(response)
        }
      })
    } else {
      formRef.current?.setData({
        fullname: '',
        email: '',
        locationId: ''
      })
    }
  }, [id, navigate, formRef])

  return (
    <Base>
      <ToolBox
        textButtonNew="Nova"
        showButtonSaveAndClose
        showButtonNew={id !== 'new'}
        showButtonDelete={id !== 'new'}
        //
        buttonClickSave={save}
        buttonClickSaveAndClose={saveAndClose}
        buttonClickDelete={() => handleDelete(Number(id))}
        buttonClickNew={() => navigate(`/users/details/new`)}
        buttonClickBack={() => navigate(`/users/`)}
      />
      <Paper>
        <Typography variant="h6" component="div" p={2}>
          {id === 'new' ? 'Novo Registro' : `Editando o registro [${fullname}]`}
        </Typography>
      </Paper>
      <Form ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12}>
                <VTextField
                  label="Nome Completo"
                  name="fullname"
                  fullWidth
                  disabled={isLoading}
                  onChange={(event) => setFullname(event.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12}>
                <VTextField
                  label="E-mail"
                  name="email"
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12}>
                <VTextField
                  label="Local"
                  name="locationId"
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
      {isLoading && <LinearProgress variant="indeterminate" />}
    </Base>
  )
}
