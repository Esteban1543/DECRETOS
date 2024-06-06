import PropTypes from "prop-types";
import { formatPrices } from "../../helpers/formatPrices";

import escolarImg from "/images/img-escolar1.png";
import oficinaImg from "/images/img-oficina1.png";
import papelesImg from "/images/img-papeleria2.png";
import manualidadesImg from "/images/img-manualidades.png";

export default function CircleProductos({ nombre, precio, categoria, descripcion }) {

  const selectImage = (c) => {
    if (c == 'Escolar') return escolarImg;
    if (c == 'Oficina') return oficinaImg;
    if (c == 'Papeles') return papelesImg;
    if (c == 'Manualidades') return manualidadesImg;
  }

  return (
    <article className="circle_products">
      <section className="circle_products_border">
        <div className="circle_products_section_img">
          <img
            src={selectImage(categoria)}
            alt="Producto"
            width="105%"
            height="105%"
          />
        </div>
      </section>

      <section className="circle_products_decription">
        <span>{nombre}</span>
        {
          descripcion && <span>{descripcion}</span>
        }
        <p>$ {formatPrices(precio)}</p>
      </section>
    </article>
  );
}

CircleProductos.propTypes = {
  nombre: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  categoria: PropTypes.string.isRequired,
};
