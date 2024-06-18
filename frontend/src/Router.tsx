import { BrowserRouter, Routes, Route } from "react-router-dom"

// Componentes de Vista 📚
import HomeDigitador from "./views/HomeDigitador"
import Login from "./views/Login"


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
        />

      </Routes>
    </BrowserRouter>
  )
}