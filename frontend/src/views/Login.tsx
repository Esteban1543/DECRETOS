/* eslint-disable react/react-in-jsx-scope */
import "../assets/styles/Login.css";
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { FormEvent } from "react";
import { useState, ChangeEvent } from "react";
import axios from "axios";
// import UserSvg from "/icons/user.svg";
import { URI } from "../config";
import { toast, Toaster } from "sonner";


function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //🔸 Estado para inputs de Formulario
  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });

  //🔸 Manejo de entradas/cambios en Inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const verificacionInputs = () => {
    if (formData.user === ''.trim() || formData.password === ''.trim()) return false;
    else return true
  }

  //🔸 Envío de formulario API
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData)
    if (!verificacionInputs()) return toast.warning("Diligencie todos los campos.");

    try {
      const response = await axios.post(`${URI}/Autentificiacion`, formData);
      console.log(response)

      //🔸 Devolver mensaje de Error en Login 
      if (!response.data.status) return toast.error('Credenciales Incorrectas'); //response.data?.error

      //🔸 Almacenar información de la sesión iniciada
      const dataUser = response.data.data;
      sessionStorage.setItem("user_sesion", JSON.stringify(dataUser));
      toast.success("Sesión iniciadad correctamente");

      //🔸 Acciones de acuerdo al tipo de Rol del usuario
      if (dataUser.rol === 1) window.location.href = "/admin";
      else if (dataUser.rol === 2) window.location.href = "/digitador";
      else toast.info("El Rol asignado, no tiene acceso a ninguna sección del Aplicativo❌");

    } catch (error) {
      console.log("Error al enviar los datos", error);
      toast.error('No se pudo completar la solicitud');
    }
  };

  return (
    <>
      <article className="contlog">

        <form className="contlogcard contlogin" onSubmit={handleSubmit}>
          <h3>
            Iniciar <br /> sesión
          </h3>

          <section className="inputlog">

            <TextField
              label="Usuario"
              name="user"
              onChange={handleChange}
              InputProps={{

                endAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />

            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <InputLabel>Contraseña</InputLabel>
              <Input
                name="password"
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

          </section>

          <Button
            variant="contained"
            size="large"
            type="submit"
            style={{ backgroundColor: 'var(--color-azul-deep2)' }}
          >Ingresar</Button>

        </form>

        <section className="contlogcard contview">
          <div>
            {/* <img src={rubikLogo} alt="Logo.png" /> */}
          </div>

          <h1> Bienvenido </h1>
          <h2>Sistema de Digitación</h2>

        </section>

      </article>
      <Toaster richColors position="bottom-right" />
    </>
  );
}

export default Login;