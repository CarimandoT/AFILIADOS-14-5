import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './LoginPage.css'

const LoginPage = () => {
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Usuario hardcodeado
  const usuarioTest = {
    usuario: 'admin',
    password: '1234'
  }

  const handleLogin = (e) => {
    e.preventDefault()

    // Validación básica
    if (!usuario || !password) {
      setError('Todos los campos son obligatorios!!!!!!!!!')
      return
    }

    // Validación hardcodeada
    if (
      usuario === usuarioTest.usuario &&
      password === usuarioTest.password
    ) {
      setError('')
      navigate('/panel')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="login-container">
      <form
        className="login-card"
        onSubmit={handleLogin}
      >
        <h1 className="login-title">
          Login
        </h1>

        <p className="login-subtitle">
          Ingresá al sistema
        </p>

        <div className="login-group">
          <label>
            Usuario
          </label>

          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Ingrese usuario"
          />
        </div>

        <div className="login-group">
          <label>
            Contraseña
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese contraseña"
          />
        </div>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="login-button"
        >
          Ingresar
        </button>
      </form>
    </div>
  )
}

export default LoginPage