import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { solicitudPost } from '../../helpers/solicitudPost.js';
import { URI } from '../../config';
import { formatPrices } from '../../helpers/formatPrices';

export default function CardFacturasLista({ endpoint, id_persona, fecha_inicio, fecha_fin, titulo_card }) {
  const [listarFacturas, setListarFacturas] = useState(null);
  const [facturas, setFacturas] = useState(null);

  useEffect(() => {
    //🔸 Traer datos de facturas por vendedor
    const getData = async () => {
      const responseVentas = await solicitudPost(`${URI}${endpoint}/${id_persona}`, {
        "fecha_inicio": fecha_inicio.split('T')[0],
        "fecha_fin": fecha_fin.split('T')[0]
      });
      // console.log(responseVentas)
      if (responseVentas.status) return setFacturas(responseVentas.data)
    }

    !!id_persona && getData()
    setListarFacturas(null); //Seleccionar todas las facturas cuando cambia el vendedor
  }, [id_persona, endpoint, fecha_inicio, fecha_fin])

  // console.log(id_persona)
  // console.log(fecha_inicio, fecha_fin)

  return (
    <section className='container_sells'>
      <header>
        <h2>{titulo_card}</h2>
        <h3>{fecha_inicio.split('T')[0]} / {fecha_fin.split('T')[0]}</h3>

        <div className='div_botones_listar_facturas'>
          <button
            className='botones_listar_facturas'
            style={listarFacturas == 'pendientes' || listarFacturas == 'saldadas' ? null : { backgroundColor: 'snow' }}
            onClick={() => setListarFacturas('todas')}
            disabled={!id_persona}
          >
            Todas
          </button>
          <button
            className='botones_listar_facturas'
            style={listarFacturas === 'pendientes' ? { backgroundColor: 'snow' } : null}
            onClick={() => setListarFacturas('pendientes')}
            disabled={!id_persona}
          >
            Pendientes
          </button>
          <button
            className='botones_listar_facturas'
            style={listarFacturas === 'saldadas' ? { backgroundColor: 'snow' } : null}
            onClick={() => setListarFacturas('saldadas')}
            disabled={!id_persona}
          >
            Saldadas
          </button>
        </div>
      </header>

      <section className='container_listado_facturas'>
        {facturas != null
          ? facturas.length > 0
            ? (() => {
              //🔸 Funcion autoinvocada para extraer lenght del mapeo que se realice()
              let filteredFacturas;

              if (listarFacturas === 'pendientes') filteredFacturas = facturas.filter(f => f.saldo !== '0')
              else if (listarFacturas === 'saldadas') filteredFacturas = facturas.filter(f => f.saldo === '0')
              else filteredFacturas = facturas;

              return (
                <>
                  {
                    filteredFacturas.map((r) => (
                      <details
                        key={r.cod_factura}
                        className='card_despliegue_facturas'
                      >
                        <summary>
                          Factura N° {r.cod_factura}

                          <section>
                            {/* <p>Estado: {r.pago_abonos != r.total ? 'Pendiente' : 'Saldada'}</p> */}

                            <div className='tag_estado_factura'
                              style={r.pago_abonos != r.total ? { backgroundColor: '#FFC961' } : { backgroundColor: '#61FF97' }}
                              // style={r.saldo != '0' ? { backgroundColor: '#FFC961' } : { backgroundColor: '#61FF97' }}
                            />
                            <p>$ {formatPrices(r.total)}</p>
                          </section>
                        </summary>

                        <section className='section_desplegable'>
                          <div className='details_datos_cliente'>
                            <strong>Cliente</strong>
                            <span>{r.cliente}</span>

                            <strong>Tipo Doc</strong>
                            <span>{`${r.n_identificacion}`}</span>

                            <strong>Fecha</strong>
                            <span>{r.fecha_registro?.split('T')[0]}</span>
                          </div>

                          <div className='details_valores_factura'>
                            <h4>N° de Abonos solicitados: {r.numero_abonos}</h4>
                            <p>N° de Abonos realizados {r.fechas_de_abono.split(',').length}</p>
                            {r.fechas_de_abono.split(',').map((abono, i) => (
                              <p
                                key={abono}
                              >
                                <b>Abono {i + 1}</b> fecha abono: {abono}
                              </p>
                            ))}
                            <p>Total abonado: $ {formatPrices(r.pago_abonos)}</p>
                            {r.pago_abonos != r.total && <p>Saldo Pendiente {formatPrices(parseInt(r.total) - parseInt(r.pago_abonos))}</p>}
                          </div>
                        </section>
                      </details>
                    ))
                  }
                  <p
                    className='footer_text_sells'
                  >Total de facturas:
                    <strong> {filteredFacturas.length}</strong>
                  </p>
                </>
              );
            })()
            : <h3>✖️ No hay ventas registradas</h3>
          : <h3>No hay registro seleccionado 📌</h3>
        }
      </section>
    </section>
  )
}

CardFacturasLista.propTypes = {
  id_persona: PropTypes.number,
  fecha_inicio: PropTypes.string,
  fecha_fin: PropTypes.string,
  titulo_card: PropTypes.string,
  endpoint: PropTypes.string
}