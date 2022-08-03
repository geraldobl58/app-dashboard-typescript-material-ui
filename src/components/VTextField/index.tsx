import { useEffect, useState } from 'react'

import { TextField, TextFieldProps } from '@mui/material'

import { useField } from '@unform/core'

type VTextFieldProps = TextFieldProps & {
  name: string
}

export function VTextField({ name, ...rest }: VTextFieldProps) {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name)

  const [value, setValue] = useState(defaultValue || '')

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (oldValue, newValue) => setValue(newValue)
    })
  }, [registerField, fieldName, value])

  return (
    <TextField
      {...rest}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={() => (error ? clearError() : undefined)}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  )
}
