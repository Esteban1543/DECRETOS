import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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

    //🔸 Verificar que no haya campo vacío
    if (dato == ''.trim() || dato.length < 4) return toast.warning('El campo debe estar diligenciado.');

    //🔸 Envío de datos
    const response: ResponsePatch = await solicitudPost(`${URI}/addProcesos`, {
      tipo: tipo === 'juzgado' ? 'origen' : tipo,
      dato
    });
    // console.log(response);
    response.status
      ? toast.success('Dato agregado correctamente')
      : toast.error('No se pudo ingresar el nuevo Dato')
      ;
    setOpen(false);
  }

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        // size="large"
        aria-label="agregar"
      >
        <AddCircleOutlineIcon
          fontSize='large'
          sx={{ color: 'var(--color-azul-deep2)' }}
        />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <strong className='titulo_modal'>Agregar {tipo}</strong>
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