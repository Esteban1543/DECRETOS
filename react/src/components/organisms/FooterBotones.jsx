import PropTypes from 'prop-types';
import { Button } from "primereact/button";
import '../../assets/styles/FooterBotones.css';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useState } from 'react';

export default function FooterBotones({ label1, label2, boton_active, click_send, click_back, disable_button_back, loading }) {
  const [visible, setVisible] = useState(false);

  return (
    <footer className="footer_botones">

      <ConfirmDialog group="declarative"
        visible={visible}
        onHide={() => setVisible(false)}
        message="¿Está seguro de Cancelar el proceso de Factura?"
        // header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={() => click_back(true)}
        closable={false}
        reject={() => setVisible(false)}
      />

      {
        !disable_button_back &&
        <Button
          label={label1}
          icon="pi pi-times"
          // onClick={() => click_back(true)}
          onClick={() => setVisible(true)}
          size="small"
          outlined
          severity="info"
          type='button'
        // disabled
        />
      }
      <Button
        label={label2}
        icon="pi pi-check"
        onClick={() => click_send(true)}
        // type='submit'
        autoFocus
        size="small"
        severity="info"
        // outlined
        raised
        disabled={!boton_active}
        loading={loading}
      />
    </footer>
  )
}

FooterBotones.propTypes = {
  label1: PropTypes.string.isRequired,
  label2: PropTypes.string.isRequired,
  boton_active: PropTypes.bool,
  click_send: PropTypes.func,
  click_back: PropTypes.func,
  disable_button_back: PropTypes.bool,
  loading: PropTypes
}

