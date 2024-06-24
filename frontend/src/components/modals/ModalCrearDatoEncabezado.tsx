import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { solicitudPatch } from '../../helpers/solicitudPatch';
import { URI } from '../../config';


interface ModalCrearDatoEncabezadoProps {
  tipo: string
}

export default function ModalCrearDatoEncabezado({ tipo }: ModalCrearDatoEncabezadoProps) {

  //🔸 Manejo de apertura y cierre para Modal
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [dato, setDato] = React.useState('');

  const handleSubmit = async () => {
    console.log(dato);
    //🔸 Seleccionar endpoint de acuerdo al estado del usuario
    // const endpoint = estado_usuario == 1 ? '/deactivateUsuario' : '/activateUsuario';

    //🔸 Envío de datos
    // const response = await solicitudPatch(`${URI}${endpoint}/${id_usuario}`);
    // console.log(response);
    // refetch();
    setOpen(false);
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        +
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <h3>Agregar {tipo}</h3>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            El nuevo dato aparecerá en las opciones que tiene el formulario de Redacción para su uso.
            <span style={{ color: 'red', display: 'block', fontSize: '.8rem' }}>*Escribe los datos con los signos necesarios.</span>
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            name={tipo}
            label="Nuevo dato"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setDato(e.target.value)}
          />
        </DialogContent>

        <DialogActions>

          <Button
            color='error'
            onClick={handleClose}
          >Cancelar</Button>

          <Button
            onClick={handleSubmit}
            autoFocus
          >Agregar</Button>

        </DialogActions>
      </Dialog>
    </>
  );
}