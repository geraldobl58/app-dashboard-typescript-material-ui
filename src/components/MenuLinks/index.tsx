import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

type MenuLinksProps = {
  to: string
  icon: React.ReactNode
  label: string
}

export function MenuLinks({ to, icon, label }: MenuLinksProps) {
  const navigate = useNavigate()

  const resolvedPath = useResolvedPath(to)
  const match = useMatch({ path: resolvedPath.pathname, end: false })

  const handleClick = () => {
    navigate(to)
  }

  return (
    <ListItemButton onClick={handleClick} selected={!!match}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
}
