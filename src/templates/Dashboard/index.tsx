import { Typography } from '@mui/material'

import { ToolBar } from 'components/ToolBar'

import { Base } from 'templates/Base'

export function DashboardTemplate() {
  return (
    <Base>
      <ToolBar textInputShowSearch textNewButton="Nova" />
      <Typography variant="h6" component="div">
        DashboardTemplate
      </Typography>
    </Base>
  )
}
