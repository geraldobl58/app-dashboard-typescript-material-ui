import { useMemo, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
  Alert,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { ToolBar } from 'components/ToolBar'

import { Base } from 'templates/Base'

import { useDebounce } from 'hooks/useDebounce'

import { Users, UsersProps } from 'services/Users'

import { environment } from 'utils/environment'

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

  const pagination = useMemo(() => {
    return Number(searchParams.get('page') || '1')
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

  const handleDelete = (id: number) => {
    if (confirm('Deseja relamente excluir este registro?')) {
      Users.deleteById(id).then((response) => {
        if (response instanceof Error) {
          setError(true)
          setOpen(true)
        } else {
          setRows((oldRows) => [
            ...oldRows.filter((oldRow) => oldRow.id !== id)
          ])
          alert('Registro excluir com sucesso!')
        }
      })
    }
  }

  useEffect(() => {
    setIsLoading(true)
    debounce(() => {
      Users.getAll(pagination, search).then((response) => {
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
  }, [search, debounce, pagination])

  return (
    <Base>
      <ToolBar
        textInputShowSearch
        textNewButton="Nova"
        textInputSearch={search}
        textChangeSearch={(text) =>
          setSearchParams({ search: text, page: '1' }, { replace: true })
        }
      />
      <TableContainer
        component={Paper}
        variant="outlined"
        style={{ margin: '10px 0' }}
      >
        <Table size="small">
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
                <TableCell>
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {totalCount > 0 && totalCount > environment.pagination && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    variant="outlined"
                    shape="rounded"
                    page={pagination}
                    count={Math.ceil(totalCount / environment.pagination)}
                    onChange={(event, newPage) =>
                      setSearchParams(
                        { search, page: newPage.toString() },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  {isLoading && <LinearProgress variant="indeterminate" />}
                </TableCell>
              </TableRow>
            )}

            {totalCount === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Alert severity="info"> Nenhum registro encontrado!</Alert>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
