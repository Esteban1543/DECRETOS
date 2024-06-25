import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { JuzgadosType, CiudadesType, ProccesosType } from '../../../helpers/Types';
import ModalEliminarDatosEncabezados from '../../modals/ModalEliminarDatoEncabezado';

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
        <ul className='ul_listado_datosEncabezados'>
          {
            listado && listado.length < 1
              ? <h4>No hay Datos para mostrar</h4>
              : (
                listado.map((m, i) => (
                  <>
                    <li
                      key={i}
                    >
                      {m.origen || m.ciudad || m.proceso}
                    </li>
                    <ModalEliminarDatosEncabezados
                      tipo={tipo}
                      dato={m.origen || m.ciudad || m.proceso}
                      refetch={refetch}
                    />
                  </>
                ))
              )
          }
        </ul>
      </section>
    </details>
  )
}

export default RowDesplegableDatosEncabezados