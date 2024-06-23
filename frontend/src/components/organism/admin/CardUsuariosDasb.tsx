/* eslint-disable react/react-in-jsx-scope */
import '../../../assets/styles/CardUsuariosDasb.css'
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';
import { useGetData } from "../../../hooks/useGetData.tsx"
import { URI } from "../../../config.ts"
import { UsuariosType } from "../../../helpers/Types";
import CircleUser from '../../atoms/CircleUser';

const CardUsuariosDasb = () => {

  const { loading, data, error } = useGetData<UsuariosType>(`${URI}/usuarios`);
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
                  inicial={m.nombres.charAt(0)}
                  medida='55px'
                />

                <div className='div_texto_usuario'>
                  <h4>{m.nombres}</h4>
                  <p>{m.alias}</p>
                  {/* <p>{m.n_identificacion}</p> */}
                  <p style={{ fontSize: '.7rem' }}>
                    <a href={`mailto:${m.correo}`}>{m.correo}</a>
                  </p>
                </div>
              </article>
            ))
        }
      </section>

      <Button
        variant="contained"
        style={{ width: '100%', margin: 'auto', backgroundColor: 'var(--color-azul-deep2)' }}
        endIcon={<EastIcon />}
      >Ver todo</Button>
    </article>
  )
}

export default CardUsuariosDasb