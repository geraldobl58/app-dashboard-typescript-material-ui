import { useMemo, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Alert, Snackbar, Typography } from '@mui/material'

import { ToolBar } from 'components/ToolBar'

import { Base } from 'templates/Base'

import { useDebounce } from 'hooks/useDebounce'

import { Users } from 'services/Users'

export function UserTemplate() {
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)

  const { debounce } = useDebounce(3000, false)

  const [searchParams, setSearchParams] = useSearchParams()

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    debounce(() => {
      Users.getAll(1, search).then((response) => {
        if (response instanceof Error) {
          setError(true)
          setOpen(true)
        } else {
          console.log(response)
        }
      })
    })
  }, [search, debounce])

  return (
    <Base>
      <ToolBar
        textInputShowSearch
        textNewButton="Nova"
        textInputSearch={search}
        textChangeSearch={(text) =>
          setSearchParams({ search: text }, { replace: true })
        }
      />
      <Typography variant="h6" component="div">
        UserTemplate
      </Typography>
      {error && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Whoops: Houve um erro no servidor!
          </Alert>
        </Snackbar>
      )}
    </Base>
  )
}
