import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      setError('Todos los campos son obligatorios')
      return
    }

    // Validación hardcodeada
    if (
      usuario === usuarioTest.usuario &&
      password === usuarioTest.password
    ) {
      setError('')
      navigate('/dashboard')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <div className="mb-4">
          <label className="block mb-2">
            Usuario
          </label>

          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder="Ingrese usuario"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Contraseña
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder="Ingrese contraseña"
          />
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  )
}

export default LoginPage