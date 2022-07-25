import { Box } from '@mui/material'

type BaseProps = {
  children: React.ReactNode
}

export function Base({ children }: BaseProps) {
  return <Box>{children}</Box>
}
