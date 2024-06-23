/* eslint-disable react/react-in-jsx-scope */
import '../../../assets/styles/RowCardInform.css';
import CircleUser from '../../atoms/CircleUser.tsx';

interface RowCardInformProps {
  click: () => void,
  nombre: string,
  alias: string,
  header1: string,
  data1: string,
  selected: boolean,
  identificacion: string,
  correo: string
}

export default function RowCardInform({ selected, click, nombre, alias, identificacion, correo, header1, data1 }: RowCardInformProps) {

  return (
    <article className={selected ? 'container_row_card row_selected' : 'container_row_card'}
      onClick={() => click()}
    >
      <CircleUser
        inicial={nombre.charAt(0)}
        medida='90px'
      />

      <section className='section_datos_personales'>
        <h3>{nombre}</h3>
        <p>{alias}</p>
        <p>{identificacion}</p>
        <p style={{ fontSize: '.7rem' }}>
          <a href={`mailto:${correo}`}>{correo}</a>
        </p>
      </section>

      <section>
        <h4>{header1}</h4>
        <p>{data1}</p>
      </section>

    </article >
  )
}