import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'
import Personas from '../pages/Personas'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/personas" element={<Personas />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes