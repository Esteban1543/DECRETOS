import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Redirigir from '../atoms/Redirigir.tsx';
import RelacionPersonaRegistros from '../organism/admin/RelacionPersonaRegistros.tsx';

export default function ModalInformeActas() {

  //🔸 Manejo de apertura y cierre para Modal
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <>

      <Redirigir
        click={handleClickOpen}
        disableBorder
      />

      <Dialog
        fullWidth
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}

      >
        <DialogTitle>
          <strong className='titulo_modal'>Informe Digitadores</strong>
        </DialogTitle>

        <DialogContent>
          <RelacionPersonaRegistros
            endpoint_card1='/contadoractasdigitador'
            endpoint_card2='/actasdigitador'
            titulo_card1='Digitadores'
            titulo_card2='Actas'
          />

        </DialogContent>
        <DialogActions>
          <Button
            color='error'
            onClick={handleClose}
          >Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
