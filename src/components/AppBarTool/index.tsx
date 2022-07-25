import { AppBar, Box, Toolbar, Typography } from '@mui/material'

type AppBarToolProps = {
  title?: string
  children?: React.ReactNode
}

export function AppBarTool({ title, children }: AppBarToolProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
