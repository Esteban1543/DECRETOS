
import "../assets/styles/HomeVendedor.css";
import CircleUser from "../components/atoms/CircleUser";
import Logout from "../components/atoms/Logout";
import MainVentas from "../components/templates/MainVentas";
import { format_fecha } from "../helpers/formatFecha";
import { useSetSesion } from "../hooks/useSetSesion";
import { useGetData } from "../hooks/useGetData";
import { URI } from "../config";
import { formatPercents } from "../helpers/formatPercents";
import { Toaster } from "sonner";

export default function HomeVendedor() {

  const {loading, data} = useGetData(`${URI}/InformeVendedores/2024-01-01/2024-06-10`);
  // console.log(data)
  //🔸 Setear información de la sesión del usuario activo
  const { sessionUser } = useSetSesion();
  let nombres = `${sessionUser?.nombre_1} ${sessionUser?.apellido_1}`;
  let usuario = `${sessionUser?.alias}`;
  let zona_usuario = `${sessionUser?.zona}`;

  const datosVendedorVentas = !loading && data?.data.filter( f => f.fk_vendedor == sessionUser?.id_persona)
  // console.log(datosVendedorVentas)

  let ventas = !loading ? datosVendedorVentas[0]?.ventas_realizadas : '...' ;
  let cobros = !loading ? formatPercents(datosVendedorVentas[0]?.facturas_saldadas , datosVendedorVentas[0]?.ventas_realizadas) : '...';
  let pendientes = !loading ? datosVendedorVentas[0]?.facturas_pendientes : '...' ;

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
          <p><b>Zona: </b> {zona_usuario} </p>
          <p><b>Ventas: </b> {ventas} </p>
          <p><b>Pendientes: </b> {pendientes} </p>
          <p><b>Cobros: </b> {cobros} </p>
        </section>

        <section className="banner_logout">
          {format_fecha()}
          <Logout texto_activo={false} />
        </section>
      </aside>

      {/* 🔸 Contenido */}
      <MainVentas id_vendedor={sessionUser?.id_persona}/>
    </main>
  );
}