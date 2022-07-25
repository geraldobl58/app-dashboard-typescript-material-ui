import { Link } from 'react-router-dom'
import { Avatar, Box, Divider, Drawer, List, useTheme } from '@mui/material'

import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import { useDrawerContext } from 'contexts/DrawerContext'

import { MenuLinks } from 'components/MenuLinks'

type MenuProps = {
  children: React.ReactNode
}

export function AppShell({ children }: MenuProps) {
  const theme = useTheme()

  const { drawerOptions } = useDrawerContext()

  return (
    <>
      <Drawer variant="permanent">
        <Box
          width={theme.spacing(35)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
          >
            <Link to="/">
              <Avatar src="https://cdn.icon-icons.com/icons2/2699/PNG/512/atlassian_jira_logo_icon_170511.png" />
            </Link>
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((item) => (
                <MenuLinks
                  key={item.path}
                  to={item.path}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </List>
          </Box>
          <Divider />
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
          >
            <Avatar src="https://mui.com/static/images/avatar/3.jpg" />
            <ExitToAppIcon
              sx={{ fontSize: 20 }}
              style={{
                cursor: 'pointer'
              }}
            />
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={theme.spacing(35)}>
        {children}
      </Box>
    </>
  )
}
