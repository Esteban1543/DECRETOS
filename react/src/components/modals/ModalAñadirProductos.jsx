import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import PropTypes from "prop-types";
import SeleccionarProductos from "../organisms/Ventas/SeleccionarProductos.jsx";
// import { handleQuantity } from "../../helpers/handleQuantity";

export default function ModalAñadirProductos({ fn_handleData, lista_productos }) {

  //🔸 Estado de cargue para modal
  const [visible, setVisible] = useState(false);
  const [sumaProductos, setSumaProductos] = useState(0);
  const handleSumaProductos = (accion) => {
    accion === 'sumar'
      ? setSumaProductos((sumaProductos) => sumaProductos + 1)
      : sumaProductos > 0 && setSumaProductos((sumaProductos) => sumaProductos - 1)
    // console.log(sumaProductos)
  }

  //🔸 Manejo de cantidad seleccionada por productos
  const handleQuantity = (product, accion, numManual) => {
    // console.log(product, accion)
    handleSumaProductos(accion)

    const search = lista_productos.find(
      (f) => f.cod_producto === product.cod_producto
    );

    if (search && accion === "sumar") search.cantidad++;
    else if (search?.cantidad > 0 && accion === "restar") search.cantidad--;
    else if (accion === "remover") search.cantidad = 0;
    else if (accion === "manual") search.cantidad = numManual;
  };

  //🔸 Enviar Datos para mostrar en Tabla
  const sendData = () => {
    fn_handleData();
    setVisible(false);
  };


  return (
    <div className="card flex ">
      
      <button
        className="añadir_productos_botones"
        onClick={() => setVisible(true)}
      >
        <img src="/images/icons/icon-product.png" alt="Search" height="80%" />
        Agregar Productos
      </button>

      <Dialog
        header="Añadir Productos"
        visible={visible}
        maximizable
        style={{ width: "72vw", outline: "2px solid var(--color-barras-deep)", position: 'relative' }}
        onHide={() => setVisible(false)}
        closeOnEscape={false}
        closable={false}
        draggable={false}
      >
        <article className="container_añadiendo_productos">

          <i className="pi pi-cart-arrow-down p-overlay-badge" style={{
            fontSize: '1.7rem',
            position: "absolute",
            top: '3.4vh',
            left: '5%',
            paddingRight: '.4rem'
          }}>
            <Badge value={sumaProductos} severity="danger" />
          </i>

          {
            lista_productos == null
              ? <h3 key={"title"}>Cargando...</h3>
              : lista_productos.length < 1
                ? <h3 key={"title"}>No hay productos disponibles ✖️</h3>
                : (
                  lista_productos.map((producto) => (
                    <SeleccionarProductos
                      key={"P0" + producto.cod_producto + producto.cantidad}
                      producto={producto}
                      unidades={producto.cantidad}
                      fn_quantity={handleQuantity}
                    />
                  ))
                )
          }

          <Button label="" severity="warning" text raised
            icon="pi pi-angle-double-right"
            onClick={sendData}
            style={{
              position: "absolute",
              bottom: '1rem',
              right: '1rem'
            }}
          />
          
        </article>
      </Dialog>
    </div>
  );
}

ModalAñadirProductos.propTypes = {
  fn_handleData: PropTypes.func.isRequired,
  lista_productos: PropTypes.array,
};
