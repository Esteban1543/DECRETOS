/* eslint-disable react/react-in-jsx-scope */
import '../../../assets/styles/RelacionPersonaRegistros.css'
import RowCardInform from './RowCardInform.tsx';
import { useState } from 'react'
import { URI } from '../../../config.ts';
import { useGetData } from '../../../hooks/useGetData.tsx';
import CardDecretosLista from './CardDecretosLista.tsx';
import { UsuariosType } from '../../../helpers/Types.ts';

/*
 📌 Componente para listar Facturas asociadas a Vendedor o Cliente
*/

interface RelacionPersonaRegistrosProps {
  endpoint_card1: string,
  endpoint_card2: string,
  titulo_card1: string,
  titulo_card2: string
}

export default function RelacionPersonaRegistros({ endpoint_card1, endpoint_card2, titulo_card1, titulo_card2 }: RelacionPersonaRegistrosProps) {
  const [rowSelected, setRowSelected] = useState<number | null>(null);

  //🔸 Select para rango de fechas
  // const [dates, setDates] = useState(null);
  // const minDate = new Date('2024-01-01');
  // const maxDate = new Date('2024-06-07');

  //🔸 Traer datos de usuarios digitadores
  const { data, loading, error } = useGetData<UsuariosType>(`${URI}${endpoint_card1}`);
  if (!loading && error) {
    console.log(error);
    return null;
  }

  return (
    <article className='container_view_informes'>

      <section className='container_rows_users'>

        <header>
          <h2>{titulo_card1}</h2>
        </header>

        <section className='container_row_cards_information'>
          {
            loading
              ? <h3>Cargando..</h3>
              : !loading && data?.data && data.data.map(m => (
                <RowCardInform
                  click={() => setRowSelected(m.n_identificacion)}
                  key={m.n_identificacion}
                  nombre={m.nombres}
                  alias={m.alias}
                  identificacion={`${m.fk_tipo_identificacion}  ${m.n_identificacion}`}
                  correo={m.correo}
                  header1={'Actas'}
                  data1={'Pendiente'}
                  selected={rowSelected == m.n_identificacion}
                />
              ))
          }
        </section>

      </section>

      <CardDecretosLista
        endpoint={endpoint_card2}
        titulo_card={titulo_card2}
        id_persona={rowSelected || 0}
        // fecha_inicio={!dates ? "2024-01-01" : dates[0]?.toISOString()}
        // fecha_fin={dates && dates[1]?.toISOString() || "2024-12-01"}
      />

    </article>
  )
}