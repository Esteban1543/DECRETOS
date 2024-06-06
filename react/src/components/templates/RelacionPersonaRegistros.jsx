import '../../assets/styles/RelacionPersonaRegistros.css'
import PropTypes from 'prop-types'
import RowCardInform from '../organisms/RowCardInform'
import { useState } from 'react'
import { URI } from '../../config';
import { useGetData } from '../../hooks/useGetData'
import CardFacturasLista from '../organisms/CardFacturasLista'
import { Calendar } from 'primereact/calendar';
import { formatPercents } from '../../helpers/formatPercents';

/*
 📌 Componente para listar Facturas asociadas a Vendedor o Cliente
*/
export default function RelacionPersonaRegistros({ endpoint_card1, endpoint_card2, titulo_card1, titulo_card2 }) {
  const [rowSelected, setRowSelected] = useState(null);
  // console.log(rowSelected);

  //🔸 Select para rango de fechas
  const [dates, setDates] = useState(null);
  const minDate = new Date('2024-01-01');
  const maxDate = new Date('2024-06-07');

  //🔸 Traer datos de vendedores
  const responsePersonas = useGetData(`
    ${URI}${endpoint_card1}/${!dates ? "2024-01-01" : dates[0]?.toISOString()}/${dates && dates[1]?.toISOString() || "2024-12-01"}
  `);
  // console.log(responsePersonas.data)

  return (
    <article className='container_view_informes'>

      <section className='container_rows_users'>

        <header>
          <h2>{titulo_card1}</h2>

          <div className="card flex justify-content-center">
            <Calendar
              value={dates}
              onChange={(e) => setDates(e.value)}
              selectionMode="range"
              readOnlyInput
              hideOnRangeSelection
              // showIcon
              placeholder='Rango de Fechas'
              showButtonBar
              minDate={minDate}
              maxDate={maxDate}
              style={{ height: '40px', width: '92%' }}
            />
          </div>
        </header>

        <section className='container_row_cards_information'>
          {
            responsePersonas.loading
              ? <h3>Cargando..</h3>
              : responsePersonas.data.status && responsePersonas.data.data.map(r => (
                endpoint_card1 == '/InformeVendedores' ? (
                  <RowCardInform
                    tipoInfo='usuario'
                    click={() => setRowSelected(r.fk_vendedor)}
                    key={r.fk_vendedor}
                    nombre={r.vendedor}
                    alias={r.alias}
                    zona={r.zona}
                    header1={'Ventas'}
                    data1={`+${r.ventas_realizadas}`}
                    header2={'Pendientes'}
                    data2={r.facturas_pendientes}
                    selected={rowSelected == r.fk_vendedor ? true : false}
                  />
                ) : (
                  <RowCardInform
                    tipoInfo='cliente'
                    click={() => setRowSelected(r.id_persona)}
                    key={r.id_persona}
                    nombre={r.cliente}
                    identificacion={`${r.fk_tipo_identificacion} - ${r.n_identificacion}`}
                    correo={r.correo}
                    header1={'Facturas'}
                    data1={`📄${r.facturas_cliente} ✅${r.facturas_saldadas} ⌛${r.facturas_pendientes}`}
                    header2={'Estado de Pagos'}
                    data2={formatPercents(parseInt(r.facturas_saldadas), r.facturas_cliente) }
                    selected={rowSelected == r.id_persona ? true : false}
                  />
                )
              ))
          }
        </section>

      </section>

      <CardFacturasLista
        endpoint={endpoint_card2}
        titulo_card={titulo_card2}
        id_persona={rowSelected}
        fecha_inicio={!dates ? "2024-01-01" : dates[0]?.toISOString()}
        fecha_fin={dates && dates[1]?.toISOString() || "2024-12-01"}
      />

    </article>
  )
}

RelacionPersonaRegistros.propTypes = {
  endpoint_card1: PropTypes.string,
  endpoint_card2: PropTypes.string,
  titulo_card1: PropTypes.string,
  titulo_card2: PropTypes.string
}