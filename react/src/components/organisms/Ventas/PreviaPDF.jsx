
import PropTypes from 'prop-types'
import '../../../assets/styles/PreviaPDF.css'
import { formatPrices } from '../../../helpers/formatPrices'
import { useEffect, useState } from 'react';


const PreviaPDF = ({ data }) => {
  console.log(data);
  
  const [datosFactura, setdatosFactura] = useState(data.data.data);
  console.log(datosFactura)

  return (
    <article className='sheet_pdf'>
      <img src="/images/LogoRubik.png" alt="icono" height={'80%'} />

      <header>
        <h2>Versalles Papeleria</h2>
        <h5>NIT: 10101010-2</h5>
        <h5>DIR: Carrera #9 27 - 12</h5>
      </header>

       <section className='section_datos_cliente_pdf'>

        <div>
          <p><strong>Cliente: </strong>{datosFactura && datosFactura?.datos_factura.cliente}</p>
          <p><strong>Tipo doc: </strong>{datosFactura && datosFactura?.datos_factura.n_identificacion}</p>
          <p><strong>Celular: </strong>{datosFactura && datosFactura?.datos_factura.telefono}</p>
          <p><strong>Correo: </strong>{datosFactura && datosFactura?.datos_factura.correo}</p>
          <p><strong>Dirección: </strong>{datosFactura && datosFactura?.datos_factura.direccion}</p>
        </div>

        <div>
          <p><strong>Fecha: </strong>{datosFactura && datosFactura?.datos_factura.fecha.split('T')[0]}</p>
          <p><strong>Hora: </strong>{datosFactura && datosFactura?.datos_factura.hora}</p>
          <p><strong>N° Factura: </strong>{datosFactura && datosFactura?.datos_factura.cod_factura}</p>
        </div>

      </section>

      <section style={{ width: '100%' }}>
        <table className='tablaDetalleFactura'>
          <thead style={{borderBlock: '1.5px solid #09425efa'}}>
            <tr>
              <th>Cod</th>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {
              datosFactura && datosFactura?.ProductosData.map(r => (
                <tr
                  key={r.cod_producto}
                >
                  <td>P0{r.cod_producto}</td>
                  <td>{r.nombre_producto}</td>
                  <td>{r.cantidad}</td>
                  <td>{formatPrices(r?.precio_producto)}</td>
                  <td>{formatPrices(r?.cantidad * r?.precio_producto)}</td>
                </tr>
              ))
            }
          </tbody>
            {/* <br /> */}
          <tfoot>
            <tr style={{borderTop: 'none'}}>
              <td style={{padding: '.15rem'}} colSpan={3}></td>
              <td style={{padding: '.15rem'}}><strong>SUBTOTAL</strong></td>
              <td style={{padding: '.15rem'}}>$ {datosFactura && formatPrices(datosFactura?.datos_factura.subtotal)}</td>
            </tr>
            <tr style={{borderTop: 'none'}}>
              <td style={{padding: '.15rem'}} colSpan={3}></td>
              <td style={{padding: '.15rem'}}><strong>IVA</strong></td>
              <td style={{padding: '.15rem'}}>{datosFactura && datosFactura?.datos_factura.iva_aplicado}%</td>
            </tr>
            <tr style={{borderTop: 'none'}}>
              <td style={{padding: '.15rem'}} colSpan={3}></td>
              <td style={{padding: '.15rem'}}><strong>TOTAL</strong></td>
              <td style={{padding: '.15rem'}}>$ {datosFactura && formatPrices(datosFactura?.datos_factura.total)}</td>
            </tr>
            {/* <tr></tr> */}
          </tfoot>

        </table>
      </section>

      <footer className='footer_pdf'>
        <p><strong>Vendedor: </strong>{datosFactura && datosFactura?.datos_factura.vendedor}</p>
        {/* <p><strong>Formas de Pago: </strong>{datosFactura && datosFactura?.datos_factura.metodo_pago}</p> */}
        <p><strong>Numero de Abonos: </strong>{datosFactura && datosFactura?.datos_factura.numero_abonos}</p>
        <p><strong>Saldo Pendiente: </strong>${formatPrices(parseInt(datosFactura && datosFactura?.datos_factura.pendiente))}</p>
      </footer> 
    </article>
  )
}

PreviaPDF.propTypes = {
  data: PropTypes.object
}

export default PreviaPDF