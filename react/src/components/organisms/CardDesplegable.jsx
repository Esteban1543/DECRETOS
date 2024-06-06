import '../../assets/styles/CardDesplegable.css'
import CircleUser from '../atoms/CircleUser'
import PropTypes from 'prop-types'
import { Button } from 'primereact/button';
import { URI } from '../../config';
import { solicitudPost } from '../../helpers/solicitudPost.js';
import { toast } from 'sonner';


export default function CardDesplegable({ info, remove, estado_persona, usuario, alias, zona, nombres, apellidos, identificacion, telefono, correo, direccion, refetch }) {
  // console.log(estado_persona)

  const handleEnable = async (id_persona, estado) => {

    const endpoint = estado == 1 ? '/BorrarPersona' : '/ActivarPersona';
    const response = await solicitudPost(`${URI}${endpoint}/${id_persona.split('- ')[1]}`, { id_persona });
    // console.log(response);

    if (response.status) {
      toast.success(`Usuario ${estado == 1 ? 'inhabilitado' : 'habilitado'} exitosamente ✅`);
      refetch(true);
      return
    }

    toast.error(`No se ha podido deshabilitar el Usuario ${response?.error}`);
    console.log(response);
  }

  return (
    <article className='container_card_desplegable'>

      <header style={{ position: 'relative' }}>
        <CircleUser
          inicial={`${nombres.charAt(0)}${apellidos.charAt(0)}`}
          medida='80px'
        />

        {
          remove &&
          <Button
            className='button_persona_activa'
            icon={estado_persona == 1 ? "pi pi-check-circle" : "pi pi-times-circle"}
            severity={estado_persona == 1 ? "success" : "danger"}
            rounded
            // outlined
            text
            aria-label="Search"
            onClick={() => handleEnable(identificacion, estado_persona)}
          />
        }
      </header>

      <section className='section_labels_card'>
        <h3>{usuario}</h3>
        {info === 'usuarios' && <p>{alias}</p>}
        <p>{info === 'clientes' ? identificacion : zona}</p>
        <p style={{ fontSize: '.7rem' }}>
          <a href={`mailto:${correo}`}>{correo}</a>
        </p>
      </section>

      <details>
        <summary>Información Personal</summary>
        <ul>
          <li>{nombres}</li>
          <li>{apellidos}</li>
          {info === 'usuarios' && <li>{identificacion}</li>}
          {info === 'clientes' && <li>{zona}</li>}
          <li>📞 {telefono}</li>
          <li>{direccion}</li>
        </ul>
      </details>

    </article>
  )
}

CardDesplegable.propTypes = {
  usuario: PropTypes.string.isRequired,
  alias: PropTypes.string,
  zona: PropTypes.string.isRequired,
  nombres: PropTypes.string.isRequired,
  apellidos: PropTypes.string.isRequired,
  identificacion: PropTypes.string.isRequired,
  telefono: PropTypes.string.isRequired,
  correo: PropTypes.string.isRequired,
  direccion: PropTypes.string.isRequired,
  info: PropTypes.string,
  remove: PropTypes.bool,
  estado_persona: PropTypes.number,
  refetch: PropTypes.func
}