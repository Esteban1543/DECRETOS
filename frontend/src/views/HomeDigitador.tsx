/* eslint-disable react/react-in-jsx-scope */

// Styles ✨
import "../assets/styles/HomeDigitador.css";

// Componentes TSX 📚
import CircleUser from "../components/atoms/CircleUser.tsx";
import Logout from "../components/atoms/Logout.tsx";
import SeccionRedaccionActas from "../components/templates/SeccionRedaccionActas.tsx";

// Funciones / helpers 📄
import { format_fecha } from '../helpers/formatFecha.ts'
// import { useGetData } from "../hooks/useGetData.tsx";
// import {URI} from '../config.ts';
import { useSetSesion } from "../hooks/useSetSesion.tsx";



export default function HomeDigitador() {

  // const {loading, data} = useGetData(`${URI}/InformeVendedores/2024-01-01/2024-06-10`);
  // // console.log(data)

  // //🔸 Setear información de la sesión del usuario activo
  const { sessionUser } = useSetSesion();

  const id_digitador = sessionUser?.id_persona;
  const nombres = `${sessionUser?.nombre_1} ${sessionUser?.apellido_1}`;
  const usuario = `${sessionUser?.alias}`;
  const num_actas = '###';

  return (
    <main className="main_vendedor">

      {/*🔸 Banner Vendedor */}
      <aside className="banner_informacion">

        <section className="banner_perfil">
          <CircleUser inicial={nombres?.charAt(0).toUpperCase()} medida="120px" />
          <span>{nombres}</span>
        </section>

        <section className="banner_datos_usuario">
          <p><b>Usuario: </b> {usuario} </p>
          <p><b>Actas digitadas: </b> {num_actas} </p>
          <p><b>Listado de Actas: </b> {'????'} </p>
        </section>

        <section className="banner_logout">
          {format_fecha()}
          <Logout texto_activo={false} />
        </section>
      </aside>

      {/* 🔸 Contenido */}
      <SeccionRedaccionActas
        id_digitador={id_digitador}
      />
    </main>
  );
}