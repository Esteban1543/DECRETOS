
import PropTypes from 'prop-types'
import { Button } from 'primereact/button';

export default function BotonesVentas({ setSeccion, show_boton1 }) {

  return (
    <article className='container_botones_ventas'>
      {
        show_boton1 &&
        <Button
          label="Realizar Abono"
          severity="info"
          outlined
          onClick={() => setSeccion('abonos')}
          style={{ borderColor: 'var(--blue-600)', color: 'var(--blue-600)' }}
          dis
        />
      }
      <Button
        label="Realizar Venta"
        severity="info"
        raised
        onClick={() => setSeccion('facturacion')}
        style={{ backgroundColor: 'var(--blue-600)', borderColor: 'var(--blue-600)' }}
      />
    </article>
  )
}

BotonesVentas.propTypes = {
  setSeccion: PropTypes.func.isRequired,
  show_boton1: PropTypes.bool
}