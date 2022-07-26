import { Box, Button, Paper } from '@mui/material'

import SaveIcon from '@mui/icons-material/Save'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

type ToolBoxProps = {
  textButtonNew?: string

  showButtonNew?: boolean
  showButtonBack?: boolean
  showButtonDelete?: boolean
  showButtonSave?: boolean
  showButtonSaveAndClose?: boolean

  buttonClickNew?: () => void
  buttonClickBack?: () => void
  buttonClickDelete?: () => void
  buttonClickSave?: () => void
  buttonClickSaveAndClose?: () => void
}

export function ToolBox({
  textButtonNew = 'Novo',

  showButtonNew = true,
  showButtonBack = true,
  showButtonDelete = true,
  showButtonSave = true,
  showButtonSaveAndClose = false,

  buttonClickNew,
  buttonClickBack,
  buttonClickDelete,
  buttonClickSave,
  buttonClickSaveAndClose
}: ToolBoxProps) {
  return (
    <Box
      gap={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      component={Paper}
    >
      {showButtonSave && (
        <Button
          variant="contained"
          color="primary"
          endIcon={<SaveIcon />}
          onClick={buttonClickSave}
        >
          Salvar
        </Button>
      )}

      {showButtonSaveAndClose && (
        <Button
          variant="outlined"
          color="primary"
          endIcon={<SaveIcon />}
          onClick={buttonClickSaveAndClose}
        >
          Salvar e Voltar
        </Button>
      )}

      {showButtonDelete && (
        <Button
          variant="outlined"
          color="primary"
          endIcon={<DeleteIcon />}
          onClick={buttonClickDelete}
        >
          Apagar
        </Button>
      )}

      {showButtonNew && (
        <Button
          variant="outlined"
          color="primary"
          endIcon={<AddCircleIcon />}
          onClick={buttonClickNew}
        >
          {textButtonNew}
        </Button>
      )}

      {showButtonBack && (
        <Button
          variant="outlined"
          color="primary"
          endIcon={<ArrowBackIcon />}
          onClick={buttonClickBack}
        >
          Voltar
        </Button>
      )}
    </Box>
  )
}
