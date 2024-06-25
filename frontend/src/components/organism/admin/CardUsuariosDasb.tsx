/* eslint-disable react/react-in-jsx-scope */
import '../../../assets/styles/CardUsuariosDasb.css'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { useGetData } from "../../../hooks/useGetData.tsx"
import { URI } from "../../../config.ts"
import { UsuariosType } from "../../../helpers/Types";
import CircleUser from '../../atoms/CircleUser';
import ModalUsuarios from '../../modals/ModalUsuarios.tsx';

const CardUsuariosDasb = () => {

  const { loading, data, error, refetch } = useGetData<UsuariosType>(`${URI}/usuarios`);
  console.log(data)
  if (error) {
    console.log(error)
    return null
  }

  return (
    <article className='container_card_usuarios'>
      <header>
        <h2>
          Usuarios
        </h2>
      </header>

      <section className='cont_listado_usuarios'>
        {
          loading
            ? <h3>Cargando...</h3>
            : data?.data && data.data.map(m => (
              <article
                className='cont_usuarios_lista'
                key={m.n_identificacion}
              >
                <CircleUser
                  inicial={m.nombre_1.charAt(0)}
                  medida='55px'
                />

                <section className='div_texto_usuario'>
                  <h4>{`${m.nombre_1} ${m.apellido_1}`}</h4>
                  <p>{m.alias}</p>
                  {/* <p>{m.n_identificacion}</p> */}
                  <p style={{ fontSize: '.7rem' }}>
                    <a href={`mailto:${m.correo}`}>{m.correo}</a>
                  </p>
                </section>

                <section>
                  {
                    m.estado_persona === 1
                      ? <TaskAltIcon sx={{ color: '#06D001' }} />
                      : <UnpublishedIcon color='action' />
                  }
                </section>

              </article>
            ))
        }
      </section>

      <ModalUsuarios
        datosUsuarios={data?.data || []}
        refetch={refetch}
      />
    </article>
  )
}

export default CardUsuariosDasb