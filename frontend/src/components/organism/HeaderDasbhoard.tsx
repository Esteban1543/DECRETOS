/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import Logout from '../atoms/Logout.js';
import { format_fecha } from '../../helpers/formatFecha.ts'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function HeaderDasbhoard({ nombres }: { nombres: string }) {
  return (
    <header className="header_dasbhoard">

      <section className="header_section_1">
        <div className="header_container_img_user">
          {/* <img src="favicon.svg" alt="User" width="90%" /> */}
          <AdminPanelSettingsIcon
            sx={{ color: '#3e4f6e', height: '80%', width: '80%' }}
          />
        </div>

        <div className="header_saludo_texto">
          <span>Hola, <span>{nombres}</span></span>
          <p>{format_fecha()}</p>
        </div>
      </section>

      <Logout texto_activo />
    </header>
  );
}

HeaderDasbhoard.propTypes = {
  nombres: PropTypes.string.isRequired
};

export default HeaderDasbhoard;