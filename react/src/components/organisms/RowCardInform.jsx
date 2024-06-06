import '../../assets/styles/RowCardInform.css';
import PropTypes from 'prop-types';
import CircleUser from '../atoms/CircleUser';

export default function RowCardInform({ selected, click, tipoInfo, nombre, alias, identificacion, correo, zona, header1, header2, data1, data2 }) {

  return (
    <article className={selected ? 'container_row_card row_selected' : 'container_row_card'}
      onClick={() => click(true)}
    >
      <CircleUser
        inicial={nombre.charAt(0)}
        medida='80px'
      />

      <section className='section_datos_personales'>
        <h3>{nombre}</h3>
        {
          tipoInfo == 'usuario' ? (<>
            <p>{alias}</p>
            <p>Zona {zona}</p>
          </>) : (<>
            <p>{identificacion}</p>
            <p style={{ fontSize: '.7rem' }}>
              <a href={`mailto:${correo}`}>{correo}</a>
            </p>
          </>)
        }
      </section>

      <section>
        <h4>{header1}</h4>
        <p>{data1}</p>
      </section>

      <section>
        <h4>{header2}</h4>
        <p>{data2}</p>
      </section>
    </article>
  )
}

RowCardInform.propTypes = {
  click: PropTypes.func,
  tipoInfo: PropTypes.string,
  nombre: PropTypes.string,
  alias: PropTypes.string,
  zona: PropTypes.string,
  header1: PropTypes.string,
  header2: PropTypes.string,
  data1: PropTypes.string,
  data2: PropTypes.string,
  selected: PropTypes.bool,
  identificacion: PropTypes.string,
  correo: PropTypes.string
}