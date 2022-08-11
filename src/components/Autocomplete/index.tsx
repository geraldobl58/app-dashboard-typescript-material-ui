import { useState, useEffect, useMemo } from 'react'

import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { useField } from '@unform/core'

import { useDebounce } from 'hooks/useDebounce'

import { Location } from 'services/Location'

type AppAutocompleteProps = {
  id: number
  label: string
}

type AppAutocompletePropsBool = {
  isExternalLoading?: boolean
}

export function AppAutocomplete({
  isExternalLoading = false
}: AppAutocompletePropsBool) {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField('locationId')

  const { debounce } = useDebounce()

  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue)

  const [optionsData, setOptionsData] = useState<AppAutocompleteProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setIsLoading(true)
    debounce(() => {
      Location.getAll(1, search).then((response) => {
        setIsLoading(false)
        if (response instanceof Error) {
          //
        } else {
          setOptionsData(
            response.data.map((location) => ({
              id: location.id,
              label: location.name
            }))
          )
        }
      })
    })
  }, [search, debounce])

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (event, newSelectedId) => setSelectedId(newSelectedId)
    })
  }, [registerField, fieldName, selectedId])

  const selectedOption = useMemo(() => {
    if (!selectedId) return null

    const selctedOption = optionsData.find((option) => option.id === selectedId)

    if (!selectedId) return null

    return selctedOption
  }, [optionsData, selectedId])

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem Opções"
      loadingText="Carregando..."
      disablePortal
      value={selectedOption}
      loading={isLoading}
      disabled={isExternalLoading}
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      onInputChange={(event, newValue) => setSearch(newValue)}
      onChange={(event, newValue) => {
        setSelectedId(newValue?.id)
        setSearch('')
        clearError()
      }}
      options={optionsData}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          error={!!error}
          helperText={error}
        />
      )}
    />
  )
}
