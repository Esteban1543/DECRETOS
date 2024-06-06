import PropTypes from 'prop-types'
import { logout } from '../../helpers/logout';

function Logout({texto_activo}) {
  const handleLogout = async () => {
    const respuesta = await logout('user_sesion');
    console.log('respuesta logout', respuesta)
    console.log(respuesta.success)
    
    respuesta.success 
    ? window.location.href = '/'
    : alert('No se pudo cerrar Sesión ❌');
    
    console.log(respuesta.message);
  }
  return (
    <section className="header_section_2">
      {texto_activo && <p>Salir</p>}

      <button className="button_logout" onClick={()=> handleLogout()}>
        <img src="/images/icons/icon-logout.png" alt="Logout" />
      </button>
    </section>
  );
}

Logout.propTypes = {
  texto_activo: PropTypes.bool.isRequired
}

export default Logout;