import React from 'react'

// Hojas de Estilos ✨
import '../assets/styles/HeaderDasbh.css'
import '../assets/styles/DasbhAdmin.css'
import '../assets/styles/CardInformationDasbh.css'

// Hooks 🔗
import { useSetSesion } from '../hooks/useSetSesion.tsx'

// Componentes 🧩
import HeaderDasbhoard from '../components/organism/HeaderDasbhoard.tsx'
import CardInformationDasbh from '../components/organism/CardInformationDasbh.tsx'
import Redirigir from '../components/atoms/Redirigir.tsx'
import CardDatosEncabezadosDashb from '../components/organism/admin/CardDatosEncabezadosDashb.tsx'
import CardUsuariosDasb from '../components/organism/admin/CardUsuariosDasb.tsx'
import CardInformesDasb from '../components/organism/admin/CardInformesDasb.tsx'


const HomeAdmin = () => {

  // //🔸 Setear información de la sesión del usuario activo
  const { sessionUser } = useSetSesion();

  const id_digitador = sessionUser ? parseInt(sessionUser.n_identificacion) : 0;
  const nombres = sessionUser && `${sessionUser?.nombre_1} ${sessionUser?.apellido_1}`;

  return (
    <main className='container-dasbhoard'>

      <HeaderDasbhoard
        nombres={nombres || 'P'}
      />

      <CardInformationDasbh
        titulo_card='Actas'
        cifra={0}
        color='#8AB7D7'
        color2='#4c63b6'
        icon_name='icon-ventas.png'
        tag
      >
        <Redirigir />
      </CardInformationDasbh>

      <section className='card_datosEncabezados'>
        <CardDatosEncabezadosDashb />
      </section>


      <article className='card_usuarios'>
        <CardUsuariosDasb />
      </article>

      <article className='card_informes'>
        <CardInformesDasb />
      </article>
    </main>
  )
}

export default HomeAdmin