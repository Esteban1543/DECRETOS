import React from 'react'
import '../../../assets/styles/CardInformesDasb.css'
import { ActasType } from '../../../helpers/Types.ts';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';
import ModalInformeActas from '../../modals/ModalInformeActas.tsx';

interface CardInformesDasbProps {
  datosTabla: Array<ActasType>
}

const CardInformesDasb: React.FC<CardInformesDasbProps> = ({ datosTabla }) => {
  console.log(datosTabla)

  return (
    <article className='container_informes_dasb'>

      <header className='header_informes_dasb'>
        <h2>
          Actas Digitadas
          <AssessmentSharpIcon
            sx={{ color: '#27ab83' }}
          />
        </h2>

        <ModalInformeActas/>
      </header>

      <section className='contenido_informes_dasb'>
        <table className='tabla_informes_dasb'>
          <thead>
            <th>N° Radicado</th>
            <th>Fecha Redacción</th>
            <th>Usuario</th>
          </thead>

          <tbody>
            {
              datosTabla && datosTabla.map((m, i) => (
                <tr
                  key={i + 'filasActas'}
                >
                  <td>{m.id_acta}</td>
                  <td>{m.fecha_registro.split('T')[0]}</td>
                  <td>{m.fk_ciudad}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </section>
    </article>
  )
}

export default CardInformesDasb