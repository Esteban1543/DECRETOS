import { useState } from "react";
import { Button } from 'primereact/button';
import PropTypes from "prop-types";
import CircleProductos from "../CircleProductos";

export default function SeleccionarProductos({ producto, fn_quantity, unidades }) {

  const [cantidad, setCantidad] = useState(unidades);

  const handleQuantity = (product, accion, numManual) => {
    //🔸 Modificar el numero de la interfaz
    accion == 'sumar'
      ? setCantidad(cantidad + 1)
      : accion === 'restar'
        ? cantidad > 0 && setCantidad(cantidad - 1)
        : setCantidad(0)
      ;

    //🔸 Ejecutar el handleQuantity en el componente Padre para añadir el producto al array
    fn_quantity(product, accion, numManual);
  };

  // const handleManualInput = (product, value) => {
  //   const numManual = Number(value);
  //   if (!isNaN(numManual) && numManual > 0 && value.length <= 3) {
  //     handleQuantity(product, 'manual', numManual);
  //   }
  // };

  // const handleBlur = (product) => {
  //   if (product.cantidad === '' || product.cantidad <= 0) {
  //     handleQuantity(product, 'manual', 1);
  //   }
  // };

  return (
    <article className="container_producto_añadir">
      <CircleProductos
        nombre={producto.nombre_producto}
        precio={producto.precio_producto}
        categoria={producto.fk_categoria}
      />

      <section className="container_botones_cantidades">

        {
          cantidad === 0 ? (
            <Button label="Agregar"
              severity="info" outlined
              icon="pi pi-cart-plus" size="small"
              style={{ padding: '.5rem 1.3rem', fontSize: '.8rem' }}
              onClick={() => handleQuantity(producto, "sumar")}
            />
          ) : (<article className="section_botones_cantidades">
            {
              cantidad > 1
                ? <button className='botones_cantidad' style={{ color: 'red' }} onClick={() => handleQuantity(producto, "restar")}>-</button>
                : <button className='boton_remover' onClick={() => handleQuantity(producto, "remover")}>
                  <img src="/images/icons/icon-delete.png" alt="Icono Eliminar" height='15px' />
                </button>
            }

            <strong>{cantidad}</strong>
            {/* <input
              className='input_change_quantity'
              type="number"
              value={unidades}
              min={1} max={200}
              onChange={(e) => handleManualInput(producto, e.target.value)}
              onBlur={() => handleBlur(producto)}
            /> */}

            <button className='botones_cantidad' style={{ color: 'green' }} onClick={() => handleQuantity(producto, "sumar")}>+</button>
          </article>)
        }
      </section>
    </article>
  );
}

SeleccionarProductos.propTypes = {
  producto: PropTypes.object.isRequired,
  fn_quantity: PropTypes.func.isRequired,
  unidades: PropTypes.number.isRequired
}