import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DialogTitle from '@mui/material/DialogTitle';
import { solicitudPost } from '../../helpers/solicitudPost';
import { URI } from '../../config';
import { toast } from 'sonner';


interface ModalEliminarDatosEncabezadosProps {
  tipo: string,
  dato: string,
  refetch: () => void,
  estado: number
}

export default function ModalEliminarDatosEncabezados({ tipo, dato, estado, refetch }: ModalEliminarDatosEncabezadosProps) {
  // console.log(tipo, dato)
  //🔸 Manejo de apertura y cierre para Modal
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //🔸 Envío de datos
  const handleSubmit = async () => {

    const response = await solicitudPost(`${URI}/desactivateProcesos`, {
      tipo: tipo === 'juzgado' ? 'origen' : tipo,
      dato
    });
    // console.log(response);
    response.status
      ? toast.success('Dato inhabilitado correctamente')
      : toast.error('No se pudo inhabilitar el Dato')
    ;
    refetch();
    setOpen(false);
  }


  return (
    <>
      <Button
        variant="text"
        color='inherit'
        onClick={handleClickOpen}
        disabled={estado === 1 ? false : true}
      >
        {
          estado === 1
            ? <VisibilityIcon color='success' />
            : <VisibilityOffIcon color='disabled' />
        }
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='xs'
        fullWidth={false}
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
