import { useState } from "react";
import PropTypes from 'prop-types'
import Facturacion from '../organisms/Ventas/Facturacion.jsx'
import StepsFacturacion from "../organisms/Ventas/StepsFacturacion.jsx";

export default function SeccionFacturacion({ setSeccion, id_vendedor }) {
  const [pagina, setPagina] = useState(1);

  return (
    <article className="container_facturacion">

      <header className="header_facturacion">
        <span className="header_title">Facturación</span>
        <StepsFacturacion pagina={pagina} />
      </header>

      <section className="facturacion_card">
        <Facturacion
          pagina={pagina}
          setPagina={setPagina}
          setSeccion={setSeccion}
          id_vendedor={id_vendedor}
        />
      </section>
    </article>
  )
}

SeccionFacturacion.propTypes = {
  setSeccion: PropTypes.func.isRequired,
  id_vendedor: PropTypes.number.isRequired
}