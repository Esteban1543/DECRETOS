import PropTypes from 'prop-types';
import Logout from "../../atoms/Logout.jsx";
import { format_fecha } from '../../../helpers/formatFecha.js';

function HeaderDasbhoard({ nombres }) {    
  return (
    <header className="header_dasbhoard">
      <section className="header_section_1">
        <div className="header_container_img_user">
          <img src="/images/icons/icon-user.png" alt="User" width="70%" />
        </div>

        <div className="header_saludo_texto">
          <span>Hola, <span>{nombres}</span></span>
          <p>{format_fecha()}</p>
        </div>
      </section>

      <Logout texto_activo/>
    </header>
  );
}

HeaderDasbhoard.propTypes = {
  nombres: PropTypes.string.isRequired
};

export default HeaderDasbhoard;