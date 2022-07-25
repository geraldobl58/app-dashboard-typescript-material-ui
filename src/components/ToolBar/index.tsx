import { Box, Button, Paper, TextField } from '@mui/material'

import AddCircleIcon from '@mui/icons-material/AddCircle'

type ToolBarProps = {
  textInputSearch?: string
  textInputShowSearch?: boolean
  textChangeSearch?: (newText: string) => void
  textNewButton?: string
  textNewShowButton?: boolean
  textNewCkickButton?: () => void
}

export function ToolBar({
  textInputSearch = '',
  textInputShowSearch = false,
  textChangeSearch,
  textNewButton = 'Novo',
  textNewShowButton = true,
  textNewCkickButton
}: ToolBarProps) {
  return (
    <Box
      gap={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      component={Paper}
    >
      {textInputShowSearch && (
        <TextField
          placeholder="Pesquisar"
          fullWidth
          size="small"
          value={textInputSearch}
          onChange={(event) => textChangeSearch?.(event.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {textNewShowButton && (
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddCircleIcon />}
            onClick={textNewCkickButton}
          >
            {textNewButton}
          </Button>
        )}
      </Box>
    </Box>
  )
}
