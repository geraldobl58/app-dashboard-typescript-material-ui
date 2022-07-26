import { Typography } from '@mui/material'

import { ToolBox } from 'components/ToolBox'

import { Base } from 'templates/Base'

export function DashboardTemplate() {
  return (
    <Base>
      <ToolBox />
      <Typography variant="h6" component="div">
        DashboardTemplate
      </Typography>
    </Base>
  )
}
