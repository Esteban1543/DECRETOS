
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Redirigir from '../atoms/Redirigir';
import { useNavigate } from 'react-router-dom';

export default function AlertDialog() {
  
//🔸 Manejo de apetura y cierre de modal
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const redirigir = useNavigate();

  return (
    <>
     
      <Redirigir
        click={handleClickOpen}
      />
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Cambiar a modo Digitador!
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h4>Modo Digitador: Redacción de Actas</h4>            
            Al aceptar, accederás a la sección de Redacción con vista de Digitador. 
            Podrás crear Actas sin necesidad de iniciar sesión con otro usuario y regresar al modo Administrador en el momento que desees.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={()=> redirigir('/digitador')} autoFocus>
            Redirigir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

