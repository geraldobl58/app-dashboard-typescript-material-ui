import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { LinearProgress } from '@mui/material'

import GridViewIcon from '@mui/icons-material/GridView'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'

import { useDrawerContext } from 'contexts/DrawerContext'

const Home = lazy(() => import('pages/Home'))
const Dashboard = lazy(() => import('pages/Dashboard'))

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext()

  useEffect(() => {
    setDrawerOptions([
      {
        icon: <GridViewIcon />,
        path: '/dashboard',
        label: 'Dashboard'
      },
      {
        icon: <PeopleOutlineIcon />,
        path: '/users',
        label: 'Usuários'
      }
    ])
  }, [setDrawerOptions])

  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<p>Users</p>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  )
}
