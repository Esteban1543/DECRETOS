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
import { useNavigate } from "react-router-dom";
import { URI } from "../config";
import { toast, Toaster } from "sonner";


function Login() {
  const navigate = useNavigate();

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

  //🔸 Acciones de acuerdo al tipo de Rol del usuario
  const redirigir = async (rol: number) => {
    if (rol === 1) return navigate("/admin");
    else if (rol === 2) return navigate("/digitador");
    else {
      navigate("/");
      toast.info("El Rol asignado, no tiene acceso a ninguna sección del Aplicativo❌");
    }
  }

  //🔸 Envío de formulario API
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(formData)
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

      await redirigir(dataUser.rol)

    } catch (error) {
      console.log("Error al enviar los datos", error);
      toast.error('No se pudo completar la solicitud');
    }
  };


  return (
    <article className="container_login">

      <section className="cont_login" >

        <section className="cont_login_texto">
          <img src="./favicon.svg" alt="icono" width={'20%'} />

          <h3>
            Iniciar Sesión
          </h3>
          <h4>
            Sistema de Digitación
          </h4>

        </section>

        <form className="input_log" onSubmit={handleSubmit}>

          <TextField
            label="Usuario"
            name="user"
            onChange={handleChange}
            style={{ width: '80%' }}
            InputProps={{

              endAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />

          <FormControl
            variant="standard"
            style={{ width: '80%' }}
          >
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

          <Button
            variant="contained"
            size="large"
            type="submit"
            style={{ backgroundColor: 'var(--color-azul-deep2)', marginTop: '1rem', width: '50%' }}
          >Ingresar</Button>
        </form>

      </section>

      <Toaster richColors position="bottom-right" />
    </article>
  );
}

export default Login;