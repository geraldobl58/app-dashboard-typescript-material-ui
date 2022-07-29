import { useMemo, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
  Alert,
  Box,
  LinearProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import { ToolBar } from 'components/ToolBar'

import { Base } from 'templates/Base'

import { useDebounce } from 'hooks/useDebounce'

import { Users, UsersProps } from 'services/Users'

export function UserTemplate() {
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)

  const [rows, setRows] = useState<UsersProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  const { debounce } = useDebounce()

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
    setIsLoading(true)
    debounce(() => {
      Users.getAll(1, search).then((response) => {
        setIsLoading(false)
        if (response instanceof Error) {
          setError(true)
          setOpen(true)
        } else {
          setTotalCount(response.totalCount)
          setRows(response.data)
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
      <TableContainer
        component={Paper}
        variant="outlined"
        style={{ margin: '10px 0' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.fullname}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box>{isLoading && <LinearProgress variant="indeterminate" />}</Box>
      </TableContainer>

      <Box>
        {totalCount === 0 && !isLoading && (
          <Alert severity="info"> Nenhum registro encontrado!</Alert>
        )}
      </Box>

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
