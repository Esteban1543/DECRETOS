
import { logout } from '../../helpers/logout.ts';
import '../../assets/styles/Logout.css';

interface LogoutProps {
  texto_activo: boolean
}

function Logout({texto_activo}:LogoutProps) {
  
  const handleLogout = async () => {
    const respuesta = await logout('user_sesion');
    console.log('respuesta logout', respuesta)
    
    respuesta.success 
    ? window.location.href = '/'
    : alert('No se pudo cerrar Sesión ❌');
    
    console.log(respuesta.message);
  }

  return (
    <section className="header_section_2">
      {texto_activo && <p>Salir</p>}

      <button className="button_logout" onClick={()=> handleLogout()}>
        <img src="/icons/icon-logout.png" alt="Logout" />
      </button>
    </section>
  );
}

export default Logout;