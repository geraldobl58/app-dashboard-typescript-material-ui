import { Box, Button, Paper } from '@mui/material'

import SaveIcon from '@mui/icons-material/Save'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export function ToolBox() {
  return (
    <Box
      gap={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      component={Paper}
    >
      <Button variant="contained" color="primary" endIcon={<SaveIcon />}>
        Salvar
      </Button>
      <Button variant="outlined" color="primary" endIcon={<SaveIcon />}>
        Salvar e Voltar
      </Button>
      <Button variant="outlined" color="primary" endIcon={<DeleteIcon />}>
        Apagar
      </Button>
      <Button variant="outlined" color="primary" endIcon={<AddCircleIcon />}>
        Novo
      </Button>
      <Button variant="outlined" color="primary" endIcon={<ArrowBackIcon />}>
        Voltar
      </Button>
    </Box>
  )
}
