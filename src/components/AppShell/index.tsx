import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  Typography,
  useTheme
} from '@mui/material'

import LightModeIcon from '@mui/icons-material/LightMode'
import NightlightIcon from '@mui/icons-material/Nightlight'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import { useAppThemeContext } from 'contexts/ThemeContext'

import { MenuLinks } from 'components/MenuLinks'
import { useDrawerContext } from 'contexts/DrawerContext'

type MenuProps = {
  children: React.ReactNode
}

export function AppShell({ children }: MenuProps) {
  const theme = useTheme()

  const { toggleTheme, themeName } = useAppThemeContext()

  const { drawerOptions } = useDrawerContext()

  return (
    <>
      <Drawer variant="permanent">
        <Box
          width={theme.spacing(28)}
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
            <Avatar src="https://cdn.icon-icons.com/icons2/2699/PNG/512/atlassian_jira_logo_icon_170511.png" />
            {themeName === 'light' ? (
              <Box display="block" textAlign="right">
                <Typography variant="button" display="block" gutterBottom>
                  Dark Theme
                </Typography>
                <NightlightIcon
                  sx={{ fontSize: 20 }}
                  onClick={toggleTheme}
                  color="primary"
                  style={{ cursor: 'pointer' }}
                />
              </Box>
            ) : (
              <Box display="block" textAlign="right">
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{ color: '#fff' }}
                >
                  Light Theme
                </Typography>
                <LightModeIcon
                  sx={{ fontSize: 20 }}
                  onClick={toggleTheme}
                  style={{ cursor: 'pointer', color: '#fff' }}
                />
              </Box>
            )}
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
                cursor: 'pointer',
                color: themeName === 'light' ? '#222' : '#FFF'
              }}
            />
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={theme.spacing(28)}>
        {children}
      </Box>
    </>
  )
}
