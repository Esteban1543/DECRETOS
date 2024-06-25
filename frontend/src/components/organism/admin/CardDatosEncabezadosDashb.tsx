/* eslint-disable react/react-in-jsx-scope */
import '../../../assets/styles/CardDatosEncabezadosDasb.css';
import GavelIcon from '@mui/icons-material/Gavel';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ModalCrearDatoEncabezado from '../../modals/ModalCrearDatoEncabezado.tsx';
import ModalDatosEncabezados from '../../modals/ModalDatosEncabezados.tsx';


const CardDatosEncabezadosDashb = () => {

  return (
    <article className='container_datosEncabezados_dasb'>

      <header className='header_card_datosEncabezados'>
        <h2>Datos Encabezados</h2>
        <ModalDatosEncabezados/>
      </header>

      <article className='cont_lista_datosEncabezados'>

        <section className='row_datos_encabezados'>
          <ApartmentIcon fontSize='large' />
          <h3>Ciudades</h3>
          <ModalCrearDatoEncabezado tipo='ciudad' />
        </section>

        <section className='row_datos_encabezados'>
          <GavelIcon fontSize='large' />
          <h3>Juzgado</h3>
          <ModalCrearDatoEncabezado tipo='juzgado' />
        </section>

        <section className='row_datos_encabezados'>
          <AccountTreeIcon fontSize='large' />
          <h3>Procesos</h3>
          <ModalCrearDatoEncabezado tipo='proceso' />
        </section>

      </article>
    </article>
  )
}

export default CardDatosEncabezadosDashb