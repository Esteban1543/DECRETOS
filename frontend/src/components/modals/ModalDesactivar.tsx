import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { solicitudPatch } from '../../helpers/solicitudPatch';
import { URI } from '../../config';


interface ModalDesactivarProps {
  id_usuario: number,
  estado_usuario: number,
  refetch: () => void
}

export default function ModalDesactivar({ id_usuario, estado_usuario, refetch }: ModalDesactivarProps) {

  //🔸 Manejo de apertura y cierre para Modal
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeStateUser = async () => {

    //🔸 Seleccionar endpoint de acuerdo al estado del usuario
    const endpoint = estado_usuario == 1 ? '/deactivateUsuario' : '/activateUsuario';

    //🔸 Envío de datos
    const response = await solicitudPatch(`${URI}${endpoint}/${id_usuario}`);
    console.log(response);
    refetch();
    setOpen(false);
  }


  return (
    <>

      <Button
        variant="text"
        color='inherit'
        onClick={handleClickOpen}
      >
        Cambiar Estado
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <strong className='titulo_modal'>¿Está seguro de cambiar el estado del Usuario?</strong>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Un usuario inactivo, no podrá acceder al aplicativo aunque sus credenciales se ingresen correctamente en el Login.
          </DialogContentText>
        </DialogContent>

        <DialogActions>

          <Button
            color='error'
            onClick={handleClose}
          >Cancelar</Button>

          <Button
            onClick={handleChangeStateUser}
            autoFocus
          >Aceptar</Button>

        </DialogActions>

      </Dialog>
    </>
  );
}
