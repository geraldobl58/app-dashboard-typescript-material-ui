import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Typography } from '@mui/material'

import { ToolBar } from 'components/ToolBar'

import { Base } from 'templates/Base'

export function LocationTemplate() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

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
        LocationTemplate
      </Typography>
    </Base>
  )
}
