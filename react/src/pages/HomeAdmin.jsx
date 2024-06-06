import { useGetData } from "../hooks/useGetData";
import { URI } from "../config";
import { useSetSesion } from '../hooks/useSetSesion.jsx'
import { formatDecimales } from "../helpers/formatDecimales.js";

// Componentes 🧩
import HeaderDasbhoard from "../components/organisms/Admin/HeaderDasbhoard.jsx";
import CardInformationDasbh from "../components/organisms/Admin/CardInformationDasbh";
import CardUsuariosDasbh from "../components/organisms/Admin/CardUsuariosDasbh.jsx";
import CardProductosDasbh from "../components/organisms/Admin/CardProductosDasbh";
import CardInformesDasbh from "../components/organisms/Admin/CardInformesDasbh";
import ModalClientes from "../components/modals/ModalClientes.jsx";
import ModalVentasVendedor from "../components/modals/ModalVentasVendedor.jsx";

// Styles ✨
import "../assets/styles/DasbhAdmin.css";
import "../assets/styles/HeaderDasbh.css";
import "../assets/styles/CardInformationDasbh.css";
import "../assets/styles/CardInformesDasbh.css";
import "../assets/styles/CardProductosDasbh.css";
import "../assets/styles/CardUsuariosDasbh.css";
import ModalClientesFactura from "../components/modals/ModalClientesFacturas.jsx";

function HomeAdmin() {

  //🔸 Datos para Cards de información
  const dataClientes = useGetData(`${URI}/Clientes`); // { data, loading, error }
  const dataVentas = useGetData(`${URI}/VentasPorVendedorFechas/2024-01-01/2024-07-01`);
  const dataCobros = useGetData(`${URI}/InformeFacturaSaldadas/2024-01-01/2024-07-01`);
  // console.log(dataVentas)
  //   const montos = dataVentas.data?.data?.filter( f => f.saldo != '0')
  //   console.log(montos)
  const refetchClientes = () => {
    dataClientes.refetch(true);
  }

  //🔸 Setear información de la sesión del usuario activo
  const { sessionUser } = useSetSesion();
  // console.log(sessionUser)

  return (
    <main className="container-dasbhoard">

      <HeaderDasbhoard nombres={`${sessionUser?.nombre_1} ${sessionUser?.apellido_1}`} />

      <section className="dashb_section-cards">

        <CardInformationDasbh
          titulo_card='Ventas'
          cifra={dataVentas.loading ? '...' : formatDecimales(dataVentas?.data?.data?.length)}
          // cifra={0}
          color='#8AB7D7'
          color2='#4c63b6'
          icon_name='icon-ventas.png'
          tag
        >
          <ModalVentasVendedor />
        </CardInformationDasbh>

        <CardInformationDasbh
          titulo_card='Cobros'
          cifra={dataCobros.loading ? '...' : `${formatDecimales(dataCobros?.data?.data?.length)}`}
          // cifra={0}
          color='#fef1c3'
          color2='#f9c404'
          icon_name='icon-cobros.png'
          tag
        >
          <ModalClientesFactura/>
        </CardInformationDasbh>

        <CardInformationDasbh
          titulo_card='Clientes'
          cifra={dataClientes.loading ? '...' : formatDecimales(dataClientes?.data?.data?.length)}
          color='#cbebe1'
          color2='#27ab83'
          icon_name='icon-clients.png'
        >
          <ModalClientes dataClientes={dataClientes} refetchClientes={refetchClientes} />
        </CardInformationDasbh>

      </section>

      <section className="dashb_last-row">

        <section className="section_products_users">
          <CardProductosDasbh />
          <CardUsuariosDasbh />
        </section>

        <CardInformesDasbh
          nombres={`${sessionUser?.nombre_1}`}
        />
      </section>
      {/* <code className="sello">©️Versalles</code> */}
    </main>
  );
}

export default HomeAdmin;