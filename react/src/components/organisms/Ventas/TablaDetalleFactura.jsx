import '../../../assets/styles/TablaDetalleFactura.css'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { formatPrices } from '../../../helpers/formatPrices.js';
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";


export default function TablaDetalleFactura({ datosTabla, handleQuantity, iva, setIva }) {
  // console.log('datosTabla en tabla ', datosTabla)

  // const subtotal_inicialMap = !!datosTabla && datosTabla.map(p => p?.cantidad * p?.precio_producto);

  const subtotal_inicial = !!datosTabla && datosTabla.reduce((total, producto) => {
    return total + (producto?.cantidad * producto?.precio_producto || 0);
  }, 0);

  // console.log(subtotal_inicial, subtotal_inicialMap);

  //🔸 Gestionar Iva
  const [ivaActive, setIvaActive] = useState(true);
  useEffect(() => {
    !ivaActive
      ? setIva(0)
      : setIva(19)
  }, [ivaActive, setIva])

  const handleManualInput = (product, value) => {
    const numManual = Number(value);
    if (!isNaN(numManual) && numManual > 0 && value.length <= 3) {
      handleQuantity(product, 'manual', numManual);
    }
  };

  const handleBlur = (product) => {
    if (product.cantidad === '' || product.cantidad <= 0) {
      handleQuantity(product, 'manual', 1);
    }
  };

  return (
    <>
      <table className='tablaDetalleFactura' >
        <thead>
          <tr>
            <th>Cod</th>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Unidades</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th>Remover</th>
          </tr>
        </thead>

        <tbody>
          {
            !datosTabla || datosTabla.length < 1
              ? <tr><td colSpan='7'><span style={{ fontWeight: '501', color: '#d35e5eeb', textTransform: 'initial' }}> No hay productos seleccionados ✖️</span></td></tr>
              : datosTabla.map(producto => (
                <tr key={producto.cod_producto + 'tablaProductos'}>
                  <td>P0{producto.cod_producto < 10 ? '0' + producto.cod_producto : producto.cod_producto}</td>
                  <td>{producto.nombre_producto}</td>
                  <td>{!producto.descripcion ? 'N/A' : producto.descripcion}</td>
                  <td className='seccion_cantidad'>
                    <button className='botones_cantidad' style={{ color: 'red' }} onClick={() => handleQuantity(producto, 'restar')}> - </button>
                    <input
                    className='input_change_quantity'
                      type="number"
                      value={producto.cantidad}
                      min={1} max={200}
                      // style={{ minWidth: '20px', textAlign: 'center', outline: '#ccc', maxWidth: '40px' }}
                      onChange={(e) => handleManualInput(producto, e.target.value)}
                      onBlur={() => handleBlur(producto)}
                    />
                    {/* {producto.cantidad} */}
                    <button className='botones_cantidad' style={{ color: 'green' }} onClick={() => handleQuantity(producto, 'sumar')}> + </button>
                  </td>
                  <td>$ {formatPrices(producto.precio_producto)}</td>
                  <td>$ {formatPrices(producto.cantidad * producto.precio_producto)}</td>
                  <td style={{ display: 'grid', justifyContent: 'center' }}>
                    <button className='boton_remover' onClick={() => handleQuantity(producto, 'remover')}>
                      <img src="/images/icons/icon-delete.png" alt="Icono Eliminar" height='15px' />
                    </button>
                  </td>
                </tr>
              ))

          }
        </tbody>

      </table>

      {
        subtotal_inicial > 0 &&
        <footer className='footer_section'>
          <section className='section_iva'>

            <div>
              <Checkbox onChange={e => setIvaActive(e.checked)} checked={ivaActive} style={{ paddingBottom: '.2rem', justifyContent: 'center' }} />
              <span className='iva_span'>Iva <span>{!ivaActive ? '❌' : iva + '%'}</span> </span>
            </div>

            <Slider value={iva} onChange={(e) => setIva(e.value)} className="w-14rem" min={1} max={30} disabled={!ivaActive} />

          </section>

          <section className='section_valores_totales'>
            <p>
              Subtotal
              <span> {formatPrices(subtotal_inicial)}</span>
            </p>
            <p>
              Total
              <span> {formatPrices(Math.round(subtotal_inicial * (iva / 100)) + subtotal_inicial)}</span>
            </p>
          </section>
        </footer>
      }
    </>
  )
}

TablaDetalleFactura.propTypes = {
  datosTabla: PropTypes.array,
  handleQuantity: PropTypes.func.isRequired,
  iva: PropTypes.number.isRequired,
  setIva: PropTypes.func.isRequired
}