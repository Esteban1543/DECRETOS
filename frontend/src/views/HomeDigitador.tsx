/* eslint-disable react/react-in-jsx-scope */
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

// Hojas de Estilos ✨
import "../assets/styles/HomeDigitador.css";

// Componentes 🧩
import CircleUser from "../components/atoms/CircleUser.tsx";
import Logout from "../components/atoms/Logout.tsx";
import ContenidoHomeDigitador from "../components/templates/ContenidoHomeDigitador.tsx";

// Hooks 🔗
import { useGetData } from "../hooks/useGetData.tsx";
import { useSetSesion } from "../hooks/useSetSesion.tsx";

// Funciones helpers 📄
import { format_fecha } from '../helpers/formatFecha.ts'
import { URI } from "../config.ts";
import { ActasType } from "../helpers/Types.ts";


export default function HomeDigitador() {

  // //🔸 Setear información de la sesión del usuario activo
  const { sessionUser } = useSetSesion();

  const id_digitador = sessionUser ? parseInt(sessionUser.n_identificacion) : 0;
  const identificacion = sessionUser && `${sessionUser?.fk_tipo_identificacion} ${sessionUser?.n_identificacion}`;
  const nombres = sessionUser && `${sessionUser?.nombre_1} ${sessionUser?.apellido_1}`;
  const usuario = sessionUser && `${sessionUser?.alias}`;
  const correo = sessionUser && `${sessionUser?.correo}`;
  const telefono = sessionUser && `${sessionUser?.telefono}`;

  //🔸Fetch de Datos Tabla
  const { data, loading, refetch } = useGetData<ActasType>(`${URI}/actasdigitador/${id_digitador}`);
  const num_actas = !loading && data?.status ? (data?.data?.length || 0) : '...';
  // console.log(data?.data)

  return (
    <main className="main_vendedor">

      {/*🔸 Banner Vendedor */}
      <aside className="banner_informacion">

        <section className="banner_perfil">
          <CircleUser inicial={nombres?.charAt(0).toUpperCase() || 'P'} medida="120px" />
          <span>{nombres}</span>
        </section>

        <section className="banner_datos_usuario">
          <b>
            <AccountCircleOutlinedIcon />
            Usuario
          </b>

          <p>{usuario} </p>
          <b>
            <ContactEmergencyOutlinedIcon />
            Identificación
          </b>

          <p>{identificacion} </p>
          <b>
            <PermPhoneMsgOutlinedIcon />
            Teléfono
          </b>

          <p>{telefono} </p>
          <b>
            <MarkEmailReadOutlinedIcon />
            Correo
          </b>

          <p style={{ fontSize: '.8rem' }}>
            <a href={`mailto:${correo}`}>{correo}</a>
          </p>

          <hr style={{ width: '100%' }} />

          <b className="b_actas_digitadas">
            <InventoryOutlinedIcon />
            Actas digitadas:
            <span>{num_actas}</span>
          </b>
        </section>

        <section className="banner_logout">
          {format_fecha()}
          <Logout texto_activo={false} />
        </section>
      </aside>

      {/* 🔸 Contenido */}
      <ContenidoHomeDigitador
        id_digitador={id_digitador}
        correo_digitador={correo || 'null'}
        datosTabla={data?.data || []}
        refetch={refetch}
      />

    </main>
  );
}