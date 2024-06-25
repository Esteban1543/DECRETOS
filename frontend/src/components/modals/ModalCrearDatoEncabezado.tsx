import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { solicitudPost } from '../../helpers/solicitudPost';
import { URI } from '../../config';
import { toast } from 'sonner';
import { ResponsePatch } from '../../helpers/Types';

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
    console.log({ tipo, dato });

    //🔸 Envío de datos
    const response: ResponsePatch = await solicitudPost(`${URI}/addProcesos`, {
      tipo: tipo === 'juzgado' ? 'origen' : tipo,
      dato
    });
    console.log(response);
    response.status
      ? toast.success('Dato agregado correctamente')
      : toast.error('No se pudo ingresar el nuevo Dato')

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