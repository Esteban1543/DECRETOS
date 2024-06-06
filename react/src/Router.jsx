import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import Login from "./pages/Login.jsx";
import HomeAdmin from "./pages/HomeAdmin.jsx";
import HomeVendedor from "./pages/HomeVendedor.jsx";

const PrivateRoute = ({ element, allowedRoles }) => {
  const user_sesion = sessionStorage.getItem("user_sesion");
  const isAuthenticated = !!user_sesion;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const datauser = JSON.parse(user_sesion);
  const userRole = datauser.rol;

  if (allowedRoles.includes(userRole)) {
    return element;
  }

  return <Navigate to="/" />;
};

const PrivateLogin = ({ element }) => {
  const isAuthenticated = !!sessionStorage.getItem("user_sesion");
  return !isAuthenticated ? element : <Navigate to="/admin/home" />;
};

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateLogin element={<Login />} />} />
        <Route
          path="/admin/home"
          element={<PrivateRoute element={<HomeAdmin />} allowedRoles={[1]} />}
        />
        <Route
          path="/ventas/home"
          element={<PrivateRoute element={<HomeVendedor />} allowedRoles={[2]} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

// Tipado de Datos en Props de Middlewares 📌
PrivateRoute.propTypes = {
  element: PropTypes.object,
  allowedRoles: PropTypes.array.isRequired
}

PrivateLogin.propTypes = {
  element: PropTypes.object
}