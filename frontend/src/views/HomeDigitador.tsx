/* eslint-disable react/react-in-jsx-scope */

// Styles ✨
import "../assets/styles/HomeDigitador.css";

// Componentes TSX 📚
import CircleUser from "../components/atoms/CircleUser.tsx";
import Logout from "../components/atoms/Logout.tsx";


// Funciones / helpers 📄
import { format_fecha } from '../helpers/formatFecha.ts'
import { useGetData } from "../hooks/useGetData.tsx";
import { URI } from "../config.ts";
import { ActasType } from "../helpers/Types.ts";
import { useSetSesion } from "../hooks/useSetSesion.tsx";
import ContenidoHomeDigitador from "../components/templates/ContenidoHomeDigitador.tsx";



export default function HomeDigitador() {

  // //🔸 Setear información de la sesión del usuario activo
  const { sessionUser } = useSetSesion();
  // if(!sessionUser) return console.log('No se generaron los datos para la sesión');
  const id_digitador = sessionUser ? parseInt(sessionUser.n_identificacion) : 0;
  const identificacion = sessionUser && `${sessionUser?.fk_tipo_identificacion} ${sessionUser?.n_identificacion}`;
  const nombres = sessionUser && `${sessionUser?.nombre_1} ${sessionUser?.apellido_1}`;
  const usuario = sessionUser && `${sessionUser?.alias}`;
  const correo =  sessionUser && `${sessionUser?.correo}`;
  const telefono = sessionUser && `${sessionUser?.telefono}`;


  //🔸Fetch de Datos Tabla
  const { data, loading } = useGetData<ActasType>(`${URI}/actasdigitador/${id_digitador}`);
  const num_actas = !loading && data?.status ? data?.data?.length : '...';
  console.log(data?.data)
  return (
    <main className="main_vendedor">

      {/*🔸 Banner Vendedor */}
      <aside className="banner_informacion">

        <section className="banner_perfil">
          <CircleUser inicial={nombres?.charAt(0).toUpperCase() || 'P'} medida="120px" />
          <span>{nombres}</span>
        </section>

        <section className="banner_datos_usuario">
          <p><b>Usuario: </b> {usuario} </p>
          <p><b>ID: </b> {identificacion} </p>
          <p><b>Teléfono: </b> {telefono} </p>
          <p><b>Correo: </b> {correo} </p>
          <p><b>Actas digitadas: </b> {num_actas} </p>
        </section>

        <section className="banner_logout">
          {format_fecha()}
          <Logout texto_activo={false} />
        </section>
      </aside>

      {/* 🔸 Contenido */}
      <ContenidoHomeDigitador
        id_digitador={id_digitador}
        datosTabla={data?.data || []}
      />

    </main>
  );
}