import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { LinearProgress } from '@mui/material'

import GridViewIcon from '@mui/icons-material/GridView'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

import { useDrawerContext } from 'contexts/DrawerContext'

const Home = lazy(() => import('pages/Home'))

const Dashboard = lazy(() => import('pages/Dashboard'))

const Users = lazy(() => import('pages/Users'))
const Details = lazy(() => import('pages/Details'))

const Location = lazy(() => import('pages/Location'))
const LocationDetails = lazy(() => import('pages/LocationDetails'))

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
      },
      {
        icon: <SupportAgentIcon />,
        path: '/locations',
        label: 'Cidades'
      }
    ])
  }, [setDrawerOptions])

  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/details/:id" element={<Details />} />
        <Route path="/locations" element={<Location />} />
        <Route path="/locations/details/:id" element={<LocationDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  )
}
