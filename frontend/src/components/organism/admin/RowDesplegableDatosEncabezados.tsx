import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { JuzgadosType, CiudadesType, ProccesosType } from '../../../helpers/Types.ts';
import ModalEliminarDatosEncabezados from '../../modals/ModalEliminarDatoEncabezado.tsx';

interface RowDesplegableDatosEncabezadosProps {
  children: React.ReactNode,
  titulo: string,
  listado: Array<JuzgadosType | CiudadesType | ProccesosType>,
  tipo: string,
  refetch: () => void,
}

const RowDesplegableDatosEncabezados = ({ children, titulo, listado, tipo, refetch }: RowDesplegableDatosEncabezadosProps) => {
  // console.log(listado)
  return (
    <details
      className='card_despliegue_datosEncabezados'
    >
      <summary>
        {children}
        <h3>{titulo}</h3>
        <span className='bagde_datosEncabezados'>
          {listado.length < 10 ? `0${listado.length}` : listado.length}
        </span>
        <ExpandMoreIcon fontSize='large' />
      </summary>

      <section className='section_desplegable'>
        <ul className=''>
          {
            listado && listado.length < 1
              ? <h4>No hay Datos para mostrar</h4>
              : (
                listado.map((m, i) => (
                  <li
                    key={i}
                    className='li_datosEncabezados'
                  >
                    <div
                      className='cont_listado_datosEncabezados'
                    >
                      {m.origen || m.ciudad || m.proceso}
                      <ModalEliminarDatosEncabezados
                        tipo={tipo}
                        dato={m.origen || m.ciudad || m.proceso}
                        refetch={refetch}
                        estado={m.estado}
                      />
                    </div>
                  </li>
                ))
              )
          }
        </ul>
      </section>
    </details>
  )
}

export default RowDesplegableDatosEncabezados