
import { useState } from "react";
import ModalUsuarios from "../../modals/ModalUsuarios.jsx";
import { formatDecimales } from "../../../helpers/formatDecimales.js";

function CardUsuariosDasbh() {
  const [numeroUsuarios, setnumeroUsuarios] = useState('...');

  return (
    <article className="dasbh_card_usuarios">

      <section className="section1_usuarios_card">
        <h3>
          {formatDecimales(numeroUsuarios)}
        </h3>
      </section>

      <section className="section2_usuarios_card">

        <img src="/images/icons/icon-usuarios.png" alt="Usuarios" height='135%' />
        <span>Usuarios</span>

        <ModalUsuarios setnumeroUsuarios={setnumeroUsuarios}/>
      </section>

    </article>
  );
}

export default CardUsuariosDasbh;