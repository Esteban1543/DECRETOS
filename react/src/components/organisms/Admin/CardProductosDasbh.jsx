import CircleProductos from "../CircleProductos";
import CreateProduct from "./CreateProduct";
import { URI } from "../../../config.js";
import { useGetData } from "../../../hooks/useGetData";
import ModalProductos from "../../modals/ModalProductos.jsx";

function CardProductosDasbh() {
  const { loading, data, error, refetch } = useGetData(`${URI}/Productos`);
  error && console.log(error)
  // console.log(data)
  return (
    <article className="dashb_section_products">

      <header className="section_añadir_titulo">
        <span>
          Productos
          <strong style={{ marginLeft: '5%' }}>
            +{loading ? '...' : data.data.length}
          </strong>
        </span>

        <ModalProductos
          loading={loading}
          data={data?.data}
        />
      </header>

      <section className="products_section_muestras">

        <section className="products_section_añadir">
          <CreateProduct refetch={refetch} />
        </section>

        {loading ? (
          <h2 style={{ width: '71%' }}>Cargando...</h2>
        ) : (
          data.status &&
          data.data.slice(0, 4).map((producto) => (
            <div
              key={'P0' + producto.cod_producto}
              style={{width: '115px'}}
            >
              <CircleProductos
                nombre={producto.nombre_producto}
                precio={producto.precio_producto}
                categoria={producto.fk_categoria}
              />
            </div>
          ))
        )}
      </section>

    </article>
  );
}

export default CardProductosDasbh;