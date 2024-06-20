/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Componentes de Vista 📚
import HomeDigitador from "./views/HomeDigitador"
import HomeAdmin from "./views/HomeAdmin"
import Login from "./views/Login"

// const PrivateRoute = ({ element, allowedRoles }) => {
//   const user_sesion = sessionStorage.getItem("user_sesion");
//   const isAuthenticated = !!user_sesion;

//   if (!isAuthenticated) {
//     return <Navigate to="/" />;
//   }

//   const datauser = JSON.parse(user_sesion);
//   const userRole = datauser.rol;

//   if (allowedRoles.includes(userRole)) {
//     return element;
//   }

//   return <Navigate to="/" />;
// };

// const PrivateLogin = ({ element }) => {
//   const isAuthenticated = !!sessionStorage.getItem("user_sesion");
//   return !isAuthenticated ? element : <Navigate to="/admin/home" />;
// };

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/digitador"
          element={<HomeDigitador />}
        // element={<PrivateRoute element={<HomeAdmin />} allowedRoles={[1]} />}
        />

        <Route
          path="/admin"
          element={<HomeAdmin />}
        // element={<PrivateRoute element={<HomeAdmin />} allowedRoles={[1]} />}
        />

      </Routes>
    </BrowserRouter>
  )
}