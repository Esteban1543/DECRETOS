import * as React from 'react';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
// import FormHelperText from '@mui/material/FormHelperText';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../../assets/styles/ModalDatosEncabezados.css';
import { URI } from '../../config.ts';
import { solicitudPost } from '../../helpers/solicitudPost.ts';
import { toast } from 'sonner';

interface ModalCrearUsuarioProps {
  refetch: () => void
}

export default function ModalCrearUsuario({ refetch }: ModalCrearUsuarioProps) {

  //🔸 Manejo de apertura y cierre para Modal
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //🔸 Estado para los inputs del formulario
  const estado_inicial = {
    fk_tipo_identificacion: "",
    n_identificacion: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    correo: "",
    alias: "",
    contraseña: "digic123"
  }
  const [datosForm, setDatosForm] = React.useState(estado_inicial);

  //🔸 Manejo de Datos en Formulario (inputs)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDatosForm((prevData) => ({
      ...prevData,
      [name]: value.toString() //.toLowerCase(),
    }));
  };
  const handleChangeSelect = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setDatosForm((prev) => ({
      ...prev,
      fk_tipo_identificacion: value
    })

    );
  };

  //🔸 Verificar diligenciamiento de campos/inputs
  const [activarBoton, setactivarBoton] = React.useState(false);
  React.useEffect(() => {
    const validarCamposLlenos = () => {
      return Object.values(datosForm).every(valor => valor.trim() !== '');
    };

    const formulario_lleno = validarCamposLlenos();
    formulario_lleno ? setactivarBoton(true) : setactivarBoton(false);
  }, [datosForm]);

  //🔸 Envío de Datos API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(datosForm);

    const response = await solicitudPost(`${URI}/newUsuario`, datosForm);
    if (response.status) {
      toast.success('Usuario creado correctamente');
      refetch()
      setDatosForm(estado_inicial)
      return
    }

    toast.error('No se pudo crear el nuevo Usuario')
    console.log(response)
  }

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        aria-label="agregar"
      >
        <PersonAddIcon 
        fontSize="inherit" 
        sx={{ color: 'var(--color-azul-deep2)' }}
        />
      </IconButton>

      <Dialog
        fullWidth
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            <strong className='titulo_modal'>Crear Usuario</strong>
          </DialogTitle>

          <DialogContent>
            <article className="section_inputs_encabezados"
              style={{ minHeight: '50vh' }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo Doc</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={datosForm.fk_tipo_identificacion}
                  label="Tipo Doc"
                  onChange={handleChangeSelect}
                >
                  <MenuItem value={'CC'}>Cédula de Ciudadanía</MenuItem>
                  <MenuItem value={'CE'}>Cédula de Extranjería</MenuItem>
                  <MenuItem value={'Otro'}>Otro Documento</MenuItem>
                </Select>
              </FormControl>

              <TextField
                name='n_identificacion'
                label="N° Identificación *"
                placeholder="1024658965"
                onChange={handleChange}
                value={datosForm.n_identificacion}
              // helperText="Ingrese solo Letras"
              />

              <TextField
                name='nombres'
                label="Nombres *"
                placeholder="Juan Perez"
                onChange={handleChange}
                value={datosForm.nombres}
              // helperText="Ingrese numero de radicado con lineas ( - )"
              />

              <TextField
                name='apellidos'
                label="Apellidos *"
                placeholder="Sandoval Jiménez"
                onChange={handleChange}
                value={datosForm.apellidos}
              // helperText="Ingrese solo Letras"
              />

              <TextField
                name='telefono'
                label="Telefono *"
                placeholder="3054562312"
                onChange={handleChange}
                value={datosForm.telefono}
              // helperText="Ingrese solo Letras"
              />

              <TextField
                name='correo'
                label="Correo *"
                type='email'
                placeholder="prueba@correo.com"
                onChange={handleChange}
                value={datosForm.correo}
              // helperText="Ingrese el código alfanumérico"
              />

              <TextField
                name='alias'
                label="Alias / Usuario *"
                placeholder="Digitador 5"
                onChange={handleChange}
                value={datosForm.alias}
              // helperText="Ingrese el código alfanumérico"
              />

              <TextField
                name='contraseña'
                label="Contraseña *"
                onChange={handleChange}
                value={datosForm.contraseña}
                // helperText="Ingrese el código alfanumérico"
                type='password'
              />
            </article>
          </DialogContent>

          <DialogActions
            style={{ borderTop: '1px solid #ccc', marginInline: '4%', paddingBlock: '2%' }}
          >
            <Button
              variant="outlined"
              color='error'
              onClick={handleClose}
            >Cerrar</Button>

            <Button
              type='submit'
              variant="contained"
              color='info'
              onClick={handleClose}
              disabled={!activarBoton}
            >Crear</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}