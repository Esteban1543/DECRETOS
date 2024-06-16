
// Styles ✨
import "../assets/styles/HomeVendedor.css";

// Componentes TSX 📚
import CircleUser from "../components/atoms/CircleUser";
import Logout from "../components/atoms/Logout";
import SeccionRedaccionActas from "../components/templates/SeccionRedaccionActas.tsx";

// Funciones / helpers 📄
import { format_fecha } from '../helpers/formatFecha.ts'
// import { useGetData } from "../hooks/useGetData.tsx";
// import {URI} from '../config.ts';
// import { useSetSesion } from "../hooks/useSetSesion.tsx";



export default function HomeVendedor() {

  // const {loading, data} = useGetData(`${URI}/InformeVendedores/2024-01-01/2024-06-10`);
  // // console.log(data)

  // //🔸 Setear información de la sesión del usuario activo
  // const { sessionUser } = useSetSesion();
  // const id_digitador:string = sessionUser?.id_persona;
  const nombres = 'Digitador x'
  // const nombres = `${sessionUser?.nombre_1} ${sessionUser?.apellido_1}`;
  // const usuario = `${sessionUser?.alias}`;


  return (
    <main className="main_vendedor">

      {/*🔸 Banner Vendedor */}
      <aside className="banner_informacion">

        <section className="banner_perfil">
          <CircleUser inicial={nombres?.charAt(0).toUpperCase()} medida="120px" />
          <span>{nombres}</span>
        </section>

        <section className="banner_datos_usuario">
          {/* <p><b>Usuario: </b> {usuario} </p>
          <p><b>Actas digitadas: </b> {num_actas} </p>
          <p><b>Listado de Actas: </b> {'????'} </p>*/}
        </section>

        <section className="banner_logout">
          {format_fecha()}
          <Logout texto_activo={false} />
        </section>
      </aside>

      {/* 🔸 Contenido */}
      <SeccionRedaccionActas
        id_digitador={1}
      />
    </main>
  );
}