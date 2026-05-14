import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// IMPORTANTE: Un solo punto porque están en la misma carpeta raíz (src)
import LoginPage from "./pages/LoginPage"; 
import PanelPage from "./pages/panelPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/panel" element={<PanelPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App