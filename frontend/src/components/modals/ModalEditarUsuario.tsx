import * as React from 'react';

import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
// import FormHelperText from '@mui/material/FormHelperText';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Tooltip from '@mui/material/Tooltip';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../../assets/styles/ModalDatosEncabezados.css';
import { UsuariosType } from '../../helpers/Types.ts';
import { URI } from '../../config.ts';
import { solicitudPatch } from '../../helpers/solicitudPatch.ts';
import { toast } from 'sonner';

interface ModalEditarUsuarioProps {
  refetch: () => void,
  datos_usuario: UsuariosType
}

export default function ModalEditarUsuario({ refetch, datos_usuario }: ModalEditarUsuarioProps) {

  //🔸 Manejo de apertura y cierre para Modal
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //🔸 Estado para los inputs del formulario
  // console.log(datos_usuario)
  const estado_inicial = {
    n_identificacion: datos_usuario.n_identificacion,
    nombres: !datos_usuario.nombre_2 ? datos_usuario.nombre_1 : `${datos_usuario.nombre_1} ${datos_usuario.nombre_2}`,
    apellidos: !datos_usuario.apellido_2 ? datos_usuario.apellido_1 : `${datos_usuario.apellido_1} ${datos_usuario.apellido_2}`,
    telefono: datos_usuario.telefono,
    correo: datos_usuario.correo,
    alias: datos_usuario.alias,
    contraseña: ""
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

  //🔸 Verificar diligenciamiento de campos/inputs
  const [activarBoton, setactivarBoton] = React.useState(false);
  React.useEffect(() => {
    const validarCamposLlenos = () => {
      return Object.values(datosForm).every(valor => valor.toString().trim() !== '');
    };

    const formulario_lleno = validarCamposLlenos();
    formulario_lleno ? setactivarBoton(true) : setactivarBoton(false);
  }, [datosForm]);

  //🔸 Envío de Datos API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(datosForm);

    const response = await solicitudPatch(`${URI}/editUsuario`, datosForm);
    if (response.status) {
      toast.success('Usuario editado correctamente');
      refetch();
      // setDatosForm(estado_inicial);
      return
    }

    toast.error('No se pudo editar el Usuario');
    console.log(response);
  }

  return (
    <>
      <Tooltip title="Editar Usuario" placement="left">
        <IconButton
          onClick={handleClickOpen}
          aria-label="agregar"
          style={{ position: 'absolute', top: 0, right: 0 }}
        >
          <ManageAccountsIcon
            sx={{ color: 'var(--color-azul-deep2)' }}
          />
        </IconButton>
      </Tooltip >

      <Dialog
        fullWidth
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            <strong className='titulo_modal'>Editar Usuario</strong>
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
                  value={datos_usuario.fk_tipo_identificacion}
                  label="Tipo Doc"
                  // onChange={handleChangeSelect}
                  disabled
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
            >Editar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}