import React from 'react'
import '../assets/styles/HeaderDasbh.css'
import '../assets/styles/DasbhAdmin.css'
import '../assets/styles/CardInformationDasbh.css'
import HeaderDasbhoard from '../components/organism/HeaderDasbhoard'
import CardInformationDasbh from '../components/organism/CardInformationDasbh'
import Redirigir from '../components/atoms/Redirigir'



const HomeAdmin = () => {

  return (
    <main className='container-dasbhoard'>
      <HeaderDasbhoard
        nombres='Nombre Prueba'
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
        Datos Encabezados
      </section>


      <article className='card_usuarios'>
        Usuarios
      </article>

      <article className='card_informes'>
        Informes
      </article>
    </main>
  )
}

export default HomeAdmin