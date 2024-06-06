import { useState } from 'react'
import PropTypes from 'prop-types'
import ModuloVentas from './ModuloVentas';
import SeccionAbonos from './SeccionAbonos';
import SeccionFacturacion from './SeccionFacturacion';

export default function MainVentas({ id_vendedor }) {

  const [seccion, setSeccion] = useState('ventas');

  return (
    <>
      {
        seccion === 'ventas'
          ? (
            <ModuloVentas setSeccion={setSeccion} id_vendedor={id_vendedor} />
          ) : (
            seccion === 'facturacion' && <SeccionFacturacion setSeccion={setSeccion} id_vendedor={id_vendedor} />
          ) || (
            seccion === 'abonos' && <SeccionAbonos setSeccion={setSeccion} />
          )
      }
    </>
  )
}

MainVentas.propTypes = {
  id_vendedor: PropTypes.number
}