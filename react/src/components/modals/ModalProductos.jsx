
import '../../assets/styles/ModalProductos.css'
import { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import Redirigir from "../atoms/Redirigir";
import PropTypes from "prop-types";
import CircleProductos from '../organisms/CircleProductos';

const sortByName = (products) => {
  return products.slice().sort((a, b) => a.nombre_producto.localeCompare(b.nombre_producto));
};

const sortByCategory = (products) => {
  return products.slice().sort((a, b) => a.fk_categoria.localeCompare(b.fk_categoria));
};

const sortByPriceDescending = (products) => {
  return products.slice().sort((a, b) => b.precio_producto - a.precio_producto);
};

export default function ModalProductos({ loading, data }) {
  const [visible, setVisible] = useState(false);
  // console.log(data)

  const [selectedOrder, setselectedOrder] = useState(null);
  const orderBy = [
    { name: 'Fecha Creación' },
    { name: 'Nombre' },
    { name: 'Precio' },
    { name: 'Categoria' }
  ];
  // console.log(selectedOrder)

  const [productsOrder, setproductsOrder] = useState(data);
  useEffect(() => {
    if (selectedOrder == null || selectedOrder?.name == 'Fecha Creación') setproductsOrder(data)
    else if (selectedOrder?.name == 'Nombre') return setproductsOrder(sortByName(data))
    else if (selectedOrder?.name == 'Precio') return setproductsOrder(sortByPriceDescending(data))
    else if (selectedOrder?.name == 'Categoria') return setproductsOrder(sortByCategory(data))
  }, [selectedOrder, data])



  return (
    <>
      {/* 🔸 Boton modal */}
      <Redirigir
        click={() => setVisible(true)}
        disableBorder
      />

      {/* 🔸 Modal  */}
      <Dialog
        header="Productos"
        visible={visible}
        onHide={() => { if (!visible) return; setVisible(false); }}
        style={{ width: '86%', height: '87.7%', marginTop: '1%', boxShadow: "0 0 5px #5683DA" }}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        modal={false}
        draggable={false}
      >
        <header className='header_products_view'>
          <Dropdown
            value={selectedOrder}
            onChange={(e) => setselectedOrder(e.value)}
            options={orderBy}
            optionLabel="name"
            placeholder="Ordenar por:"
            className="w-full md:w-14rem select_order_products" />
        </header>

        <article className='container_view_products'>
          {
            loading || !productsOrder
              ? <h3>Cargando...</h3>
              : productsOrder.map(r => (
                <section
                  key={r.cod_producto}
                  className='section_product_view'
                >
                  <CircleProductos
                    nombre={r.nombre_producto}
                    precio={r.precio_producto}
                    categoria={r.fk_categoria}
                    descripcion={r.descripcion}
                  />
                </section>
              ))
          }
        </article>
      </Dialog>
    </>
  )
}

ModalProductos.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array
}