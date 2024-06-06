import { useRef } from "react";
import ModalCreateProduct from "../../modals/ModalCreateProduct";
import PropTypes from 'prop-types';

export default function CreateProduct({refetch}) {
  const op = useRef(null);

  const handleOpen = (e) => {
    op.current.toggle(e)
  }

  return (
    <section className="añadir_products">
      
      {/* Modal para agregar producto */}
      <ModalCreateProduct handleOpen={handleOpen} op={op} refetch={refetch}/>

      {/* Boton para activar modal */}
      <button
        className="boton_añadir_products"
        type="button"
        // onClick={(e) => op.current.toggle(e)}
        onClick={(e) => handleOpen(e)}
      >
        <div className="default-btn">
          <img src="/images/icons/icon-añadir.png" alt="Añadir" width="90%" />
        </div>

        <div className="hover-btn">
          <span>Añadir</span>
        </div>
      </button>

      <p>Añadir</p>
    </section>
  );
}

CreateProduct.propTypes = {
  refetch: PropTypes.func.isRequired
}
