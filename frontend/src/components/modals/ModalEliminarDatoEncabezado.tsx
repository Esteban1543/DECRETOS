import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DialogTitle from '@mui/material/DialogTitle';
import { solicitudPost } from '../../helpers/solicitudPost';
import { URI } from '../../config';


interface ModalEliminarDatosEncabezadosProps {
  tipo: string,
  dato: string,
  refetch: () => void,
}

export default function ModalEliminarDatosEncabezados({ tipo, dato, refetch }: ModalEliminarDatosEncabezadosProps) {
  // console.log(tipo, dato)
  //🔸 Manejo de apertura y cierre para Modal
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //🔸 Envío de datos
  const handleSubmit = async () => {

    const response = await solicitudPost(`${URI}/desactivateProcesos`, { tipo, dato });
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
        disabled
      >
        <VisibilityOffIcon />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Está seguro de inactivar el dato?
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El dato no aparecerá disponible en las opciones del formulario de Redacción.
          </DialogContentText>
        </DialogContent>

        <DialogActions>

          <Button
            color='error'
            onClick={handleClose}
          >Cancelar</Button>

          <Button
            onClick={handleSubmit}
            autoFocus
          >Aceptar</Button>

        </DialogActions>

      </Dialog>
    </>
  );
}
