/* eslint-disable react/react-in-jsx-scope */
import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Componentes de Vista 📚
import HomeDigitador from "./views/HomeDigitador"
import HomeAdmin from "./views/HomeAdmin"
import Login from "./views/Login"

interface RutasPrivadasProps {
  element: React.ReactNode,
  rolesPermitidos: Array<number>
}
const RutasPrivadas = ({ element, rolesPermitidos }: RutasPrivadasProps) => {

  //🔸 Verificar sesión activa
  const sesion_activa = sessionStorage.getItem("user_sesion");

  //🔸 Retornar a Login en caso de que no tenga sesión activa
  if (!sesion_activa) return <Navigate to="/" />;

  //🔸 Verificar numero de Rol
  const datauser = JSON.parse(sesion_activa).rol;

  //🔸 Redirigir a la ruta asignada del aplicativo
  if (rolesPermitidos.includes(datauser)) return element;

  return <Navigate to="/" />
};

interface LoginPrivadoProps {
  element: React.ReactNode,
}
const LoginPrivado = ({ element }: LoginPrivadoProps) => {
  //🔸 Verificar sesión activa
  const sesion_activa = sessionStorage.getItem("user_sesion");

  //🔸 Verificar numero de Rol
  const rol_usuario = sesion_activa && JSON.parse(sesion_activa).rol;

  //🔸 Definir ruta de acuerdo al numero de Rol
  const ruta = rol_usuario == 1 ? "/admin" : "/digitador"
  return sesion_activa ? <Navigate to={ruta} /> : element;
};

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<LoginPrivado element={<Login />} />}
        />

        <Route
          path="/digitador"
          element={<RutasPrivadas element={<HomeDigitador />} rolesPermitidos={[1, 2]} />}
        />

        <Route
          path="/admin"
          element={<RutasPrivadas element={<HomeAdmin />} rolesPermitidos={[1]} />}
        />

      </Routes>
    </BrowserRouter>
  )
}