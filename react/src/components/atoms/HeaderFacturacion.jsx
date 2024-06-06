import PropTypes from 'prop-types'

function HeaderFacturacion({titulo}) {
  return (
    <header className="header_facturacion_container">
      <h2>{titulo}</h2>
    </header>
  );
}

HeaderFacturacion.propTypes = {
  titulo : PropTypes.string.isRequired
}

export default HeaderFacturacion;