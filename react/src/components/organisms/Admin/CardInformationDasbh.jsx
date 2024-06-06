import Redirigir from "../../atoms/Redirigir";
import PropTypes from "prop-types";

export default function CardInformationDasbh({titulo_card, cifra, color, color2, icon_name, children, tag}) {
  return (
    <article className="card_information">

      <section className="card_section_1">
        <div className="container_logo" style={{background: color}}>
          <img src={`/images/icons/${icon_name}`} alt="Logo" width="60%" />
        </div>

        <h3>{titulo_card}</h3>

        {tag && <div className="tag_card_information">Año</div>}
      </section>

      <section className="card_section_2">
        <span>{cifra}</span>

        {children || <Redirigir/> }

      </section>

      <div className="linea_bottom" style={{background: color2}}></div>
    </article>
  );
}

CardInformationDasbh.propTypes = {
  titulo_card: PropTypes.string.isRequired,
  cifra: PropTypes.number,
  color: PropTypes.string.isRequired,
  color2: PropTypes.string.isRequired,
  icon_name: PropTypes.string.isRequired,
  children: PropTypes.element
};