import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import * as yup from 'yup'

import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material'

import { Form } from '@unform/web'

import { ToolBox } from 'components/ToolBox'
import { VTextField } from 'components/VTextField'

import { Base } from 'templates/Base'

import { Location } from 'services/Location'

import { useVForm } from 'hooks/useVForm'

type FormDataProps = {
  name: string
}

const formValidationSchema: yup.SchemaOf<FormDataProps> = yup.object().shape({
  name: yup.string().required().min(3)
})

export function LocationDetails() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm()

  const { id = 'new' } = useParams<'id'>()

  const navigate = useNavigate()

  const handleSave = (data: FormDataProps) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true)
        if (id === 'new') {
          Location.create(validateData).then((response) => {
            setIsLoading(false)
            if (response instanceof Error) {
              alert(response.message)
            } else {
              if (isSaveAndClose()) {
                navigate(`/locations/`)
              } else {
                navigate(`/locations/details/${response}`)
              }
            }
          })
        } else {
          Location.updateById(Number(id), {
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
      Location.deleteById(id).then((response) => {
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
      Location.getById(Number(id)).then((response) => {
        setIsLoading(false)
        if (response instanceof Error) {
          navigate(`/users/`)
        } else {
          setName(response.name)
          formRef.current?.setData(response)
        }
      })
    } else {
      formRef.current?.setData({
        name: ''
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
        buttonClickNew={() => navigate(`/locations/details/new`)}
        buttonClickBack={() => navigate(`/locations/`)}
      />
      <Paper>
        <Typography variant="h6" component="div" p={2}>
          {id === 'new' ? 'Novo Registro' : `Editando o registro [${name}]`}
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
                  label="Cidade"
                  name="name"
                  fullWidth
                  disabled={isLoading}
                  onChange={(event) => setName(event.target.value)}
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
