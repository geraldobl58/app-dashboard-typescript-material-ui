import { Navigate, Route, Routes } from 'react-router-dom'

import Main from 'components/Main'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
