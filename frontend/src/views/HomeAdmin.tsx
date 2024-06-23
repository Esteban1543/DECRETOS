/* eslint-disable react/react-in-jsx-scope */


// Hojas de Estilos ✨
import '../assets/styles/HeaderDasbh.css'
import '../assets/styles/DasbhAdmin.css'
import '../assets/styles/CardInformationDasbh.css'

// Hooks 🔗
import { useSetSesion } from '../hooks/useSetSesion.tsx'
import { useGetData } from '../hooks/useGetData.tsx'

// Componentes 🧩
import HeaderDasbhoard from '../components/organism/HeaderDasbhoard.tsx'
import CardInformationDasbh from '../components/organism/CardInformationDasbh.tsx'
import ModalRedaccionAdmin from '../components/modals/ModalRedaccionAdmin.tsx'
import CardDatosEncabezadosDashb from '../components/organism/admin/CardDatosEncabezadosDashb.tsx'
import CardUsuariosDasb from '../components/organism/admin/CardUsuariosDasb.tsx'
import CardInformesDasb from '../components/organism/admin/CardInformesDasb.tsx'

// Tipado 📄
import { ActasType } from '../helpers/Types.ts'
import { URI } from '../config.ts'


const HomeAdmin = () => {

  //🔸 Setear información de la sesión del usuario activo
  const { sessionUser } = useSetSesion();
  // const id_digitador = sessionUser ? parseInt(sessionUser.n_identificacion) : 0;
  const nombres = sessionUser && `${sessionUser?.nombre_1} ${sessionUser?.apellido_1}`;

  //🔸 Fecth de Datos Actas
  const { loading, data, error } = useGetData<ActasType>(`${URI}/actasdigitadas`);
  if (error) {
    console.log(error)
    return null
  }
  const num_actas = !loading && data?.status ? (data.data?.length || 0) : '...';

  // console.log(data)

  return (
    <main className='container-dasbhoard'>

      <HeaderDasbhoard
        nombres={nombres || 'P'}
      />

      <CardInformationDasbh
        titulo_card='Actas'
        cifra={num_actas}
        // color='#fef1c3'
        // color2='#f9c404'
        color='#cbebe1'
        color2='#27ab83'
        tag
      >
        <ModalRedaccionAdmin />
      </CardInformationDasbh>

      <section className='card_datosEncabezados'>
        <CardDatosEncabezadosDashb />
      </section>


      <article className='card_usuarios'>
        <CardUsuariosDasb />
      </article>

      <article className='card_informes'>
        <CardInformesDasb
          datosTabla={data?.data || []}
        />
      </article>
    </main>
  )
}

export default HomeAdmin