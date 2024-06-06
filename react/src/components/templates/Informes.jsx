import './../../assets/styles/Informes.css'
// import PropTypes from 'prop-types'
import Redirigir from '../atoms/Redirigir';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import ChartLines from '../organisms/Admin/ChartLines';
// import CardPromedios from '../organisms/Admin/CardPromedios';
import { Calendar } from 'primereact/calendar';
// import { Dropdown } from 'primereact/dropdown';
import { useGetData } from '../../hooks/useGetData';
import { URI } from '../../config';
import { formatPrices } from '../../helpers/formatPrices';
import { formatPercents } from '../../helpers/formatPercents';
import ChartBarras from '../organisms/Admin/ChartBarras';


export default function Informes() {

  const [visible, setVisible] = useState(false);

  //🔸 Select para rango de fechas
  const [dates, setDates] = useState(null);
  const minDate = new Date('2024-01-01');
  const maxDate = new Date('2024-06-06');

  //🔸  Select Meses
  // const [selectedCity, setSelectedCity] = useState(null);
  // const meses = [
  //   { name: 'Enero', code: '2024-01-01T2024-01-31' },
  //   { name: 'Febrero', code: '2024-02-01T2024-02-29' },
  //   { name: 'Marzo', code: '2024-03-01T2024-01-30' },
  //   { name: 'Abril', code: '2024-04-01T2024-04-30' },
  //   { name: 'Mayo', code: '2024-05-01T2024-05-31' }
  // ];

  //🔸 Obtener datos de Tabla
  const responseTabla = useGetData(`${URI}/InformeVendedores/${!dates ? "2024-01-01" : dates[0]?.toISOString()}/${dates && dates[1]?.toISOString() || "2024-12-01"}`);
  const total_ventas_realizadas = !responseTabla.loading && responseTabla.data.data.reduce((r, v) => r + v.ventas_realizadas, 0);
  const total_ventas_pagadas = !responseTabla.loading && responseTabla.data.data.reduce((r, v) => r + parseInt(v.facturas_saldadas), 0);
  const total_ventas_pendientes = !responseTabla.loading && responseTabla.data.data.reduce((r, v) => r + parseInt(v.facturas_pendientes), 0);
  const total_valor_vendido = !responseTabla.loading && responseTabla.data.data.reduce((r, v) => r + parseInt(v.total_facturas), 0);
  const total_valor_cobrado = !responseTabla.loading && responseTabla.data.data.reduce((r, v) => r + parseInt(v.pago_abonos), 0);
  const total_valor_pendiente = !responseTabla.loading && responseTabla.data.data.reduce((r, v) => r + (parseInt(v.total_facturas) - parseInt(v.pago_abonos)), 0);

  // console.log(responseTabla)
  return (
    <article>
      {/* 🔸 Boton modal */}
      <Redirigir
        click={() => setVisible(true)}
        disableBorder
      />

      {/* 🔸 Modal  */}
      <Dialog
        header={false}
        // header='Ventas por vendedor'
        visible={visible}
        onHide={() => { if (!visible) return; setVisible(false); }}
        style={{ minWidth: '86%', height: '87.7%', marginTop: '0%', boxShadow: '0 0 6px #5683DA' }}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        modal={false}
        draggable={false}
        // closeOnEscape={false}
        // closable={false}
        maximizable={true}
      // maximized
      >

        <header className='header_informes'>
          <h2>Consolidado de Ventas</h2>

          <section className='section_selects_fechas'>

            {/* <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={meses} optionLabel="name"
              placeholder="Meses"
              className="w-full md:w-14rem"
              style={{ width: '40%' }}
              disabled
            /> */}

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
            // style={{ height: '40px', width: '92%' }}
            />
          </section>
        </header>

        <article className='container_informes'>

          <h3>Balances vendedores</h3>
          <section className='container_charts_informes'>
            <ChartLines apiData={responseTabla} />
            <ChartBarras apiData={responseTabla} />
          </section>

          <h3>Relación ventas - cobros </h3>
          <section className='container_tabla_informes'>
            <table className='tablaDetalleFactura' >
              <thead style={{ borderBlock: '1.5px solid #09425efa' }}>
                <tr>
                  <th rowSpan={2}>Usuario</th>
                  <th rowSpan={2}>Nombre</th>
                  <th rowSpan={2}>Zona</th>
                  <th rowSpan={2}>Cobrado</th>
                  <th colSpan={3} >Ventas</th>
                  <th colSpan={3}>Valores</th>
                </tr>
                <tr style={{ borderTop: 'none' }}>
                  <td>Realizadas</td>
                  <td>Pagadas</td>
                  <td>Pendientes</td>
                  <td>Vendido</td>
                  <td>Cobrado</td>
                  <td>Pendiente</td>
                </tr>
              </thead>

              <tbody>
                {
                  responseTabla.loading
                    ? <tr><td colSpan={10}><h3>Cargando ..</h3></td></tr>
                    : responseTabla.data?.data && responseTabla.data?.data.map(r => (
                      <tr
                        key={r.fk_vendedor}
                      >
                        <td>{r.alias}</td>
                        <td>{r.vendedor}</td>
                        <td>{r.zona}</td>
                        <td>{formatPercents(r.facturas_saldadas, r.ventas_realizadas)}</td>
                        <td>{r.ventas_realizadas}</td>
                        <td>{r.facturas_saldadas}</td>
                        <td>{r.facturas_pendientes}</td>
                        <td>{formatPrices(parseInt(r.total_facturas))}</td>
                        <td>{formatPrices(parseInt(r.pago_abonos))}</td>
                        <td>{formatPrices(parseInt(r.total_facturas) - parseInt(r.pago_abonos))}</td>
                      </tr>
                    ))
                }
              </tbody>

              <tfoot>
                <tr style={{textAlign: 'center', fontWeight: '601'}}>
                  <td colSpan={4} style={{textAlign: 'end', fontSize: '.9rem'}}>Totales: </td>
                  <td>{total_ventas_realizadas}</td>
                  <td>{total_ventas_pagadas}</td>
                  <td>{total_ventas_pendientes}</td>
                  <td>{formatPrices(total_valor_vendido)}</td>
                  <td>{formatPrices(total_valor_cobrado)}</td>
                  <td>{formatPrices(total_valor_pendiente)}</td>
                </tr>
              </tfoot>
            </table>
          </section>

          {/* <h3>Promedios</h3>
          <section className='container_promedios_informes'>
            <CardPromedios
              titulo_card='N° de Ventas'
            />
            <CardPromedios
              titulo_card='Monto vendido'
            />
            <CardPromedios
              titulo_card='Cobros realizados'
            />
          </section> */}
        </article>

      </Dialog>
    </article>
  )
}

Informes.propTypes = {}