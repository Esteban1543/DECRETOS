import '../../assets/styles/ModalVentas.css';
import { Dialog } from 'primereact/dialog';
// import PropTypes from 'prop-types';
import Redirigir from '../atoms/Redirigir'
import { useState } from 'react';
import RelacionPersonaRegistros from '../templates/RelacionPersonaRegistros';

export default function ModalClientesFactura() {
  const [visible, setVisible] = useState(false);

  return (
    <article className='article_modal_informes'>
      {/* 🔸 Boton modal */}
      <Redirigir
        click={() => setVisible(true)}
        // disableBorder
      />

      {/* 🔸 Modal  */}
      <Dialog
        header={false}
        // header='Ventas por vendedor'
        visible={visible}
        onHide={() => { if (!visible) return; setVisible(false); }}
        // style={{ width: '86%', height: '75%', marginTop: '7%', boxShadow: 'none' }}
        style={{ width: '86%', height: '87.7%', marginTop: '1%', boxShadow: "0 0 5px #5683DA" }}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        modal={false}
        draggable={false}
      // closeOnEscape={false}
      // closable={false}
      >
        <RelacionPersonaRegistros
          endpoint_card1='/InformeFacturasClientes'
          endpoint_card2='/InformeClientesCompras'
          titulo_card1='Facturas Clientes'
          titulo_card2='Facturas'
        />
      </Dialog>
    </article>
  )
}

ModalClientesFactura.propTypes = {}