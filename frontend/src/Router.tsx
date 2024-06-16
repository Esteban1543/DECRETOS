import { BrowserRouter, Routes, Route } from "react-router-dom"

// Componentes de Vista 📚
import HomeVendedor from "./views/HomeVendedor"


export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<HomeVendedor />}
        />

      </Routes>
    </BrowserRouter>
  )
}