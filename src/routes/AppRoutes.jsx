import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Importaciones de los componentes (Aseguráte que los nombres coincidan con los archivos en /pages)
import LoginPage from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'
import Personas from '../pages/Personas'
import PanelPage from '../pages/PanelPage' // <--- Agregamos tu página aquí

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* La raíz ahora lleva al Login de Tomi */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Las rutas de la aplicación */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/personas" element={<Personas />} />
        <Route path="/panel" element={<PanelPage />} /> {/* <--- Ahora /panel funcionará */}

        {/* Si escriben cualquier cosa mal, al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes