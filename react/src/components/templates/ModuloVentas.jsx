
import PropTypes from 'prop-types'
import BotonesVentas from "../organisms/Ventas/BotonesVentas"
import DataTableVentas from '../organisms/Ventas/DataTableVentas'
import { Toaster } from 'sonner'

export default function ModuloVentas({ setSeccion, id_vendedor }) { 

  return (
    <article className="container_facturacion">

      <header className="header_facturacion">
        <span className="header_title">Módulo ventas</span>
        <BotonesVentas setSeccion={setSeccion} show_boton1 />
      </header>


      <section className="main_ventas" >
        <header className="main_ventas_header">
          <h3>Ventas</h3>
        </header>

        <section className="section_tabla_ventas">
          <DataTableVentas id_vendedor={id_vendedor}/>
        </section>

      </section>
      <Toaster richColors position="top-center"/>
    </article>
  )
}

ModuloVentas.propTypes = {
  setSeccion: PropTypes.func.isRequired,
  id_vendedor: PropTypes.number
}