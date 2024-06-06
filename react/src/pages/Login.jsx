import "../assets/styles/Login.css";
import "../assets/styles/config.css";
import "primeicons/primeicons.css";

import user from "../assets/icons/user.svg";
import key from "../assets/icons/key.svg";
import Logo from "../../public/favicon.png";

import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import axios from "axios";

import { URI } from "../config";
import InputLogin from "../components/atoms/InputLogin";

function Login() {
  // Configuracion de los toast
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "¡Correcto!",
      detail: "Inicio de sesión exitoso",
      life: 4000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "¡Error!",
      detail: "Usuario no renocido",
      life: 3000,
    });
  };

  const showErrordata = (message) => {
    toast.current.show({
      severity: "error",
      summary: "¡Error!",
      detail: message,
      life: 3000,
    });
  };

  const showWarn = () => {
    toast.current.show({
      severity: "warn",
      summary: "¡Algo salio mal!",
      detail: "Error al enviar datos",
      life: 3000,
    });
  };

  // Envio de datos
  const url = `${URI}/Autentificiacion`;

  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url, formData);

      if (!response.data.status) {
        showErrordata(response.data.error.split('⛔')[1]);

      } else if (response.data.status) {
        const dataUser = response.data.data;
        sessionStorage.setItem("user_sesion", JSON.stringify(dataUser));

        if (dataUser.rol === 1) {
          window.location.href = "/admin/home";
          showSuccess();
        } else if (dataUser.rol === 2) {
          window.location.href = "/ventas/home";
          showSuccess();
        } else {
          alert("Rol no reconocido");
          showError();
        }
      }
    } catch (error) {
      console.log("Error al enviar los datos", error);
      showWarn();
    }
  };

  return (
    <>
      <div className="contlog">
        <Toast ref={toast} />
        <form className="contlogcard contlogin" onSubmit={handleSubmit}>
          <h3>
            Iniciar <br /> sesión
          </h3>
          <div className="inputlog">
            <InputLogin
              icon={user}
              tipo={"text"}
              LoginPlaceholder={"Usuario"}
              loginName={"user"}
              loginId={"user"}
              onchange={handleChange}
              loginValue={formData.user}
            />

            <InputLogin
              icon={key}
              tipo={"password"}
              LoginPlaceholder={"Contraseña"}
              loginName={"password"}
              loginId={"password"}
              onchange={handleChange}
              loginValue={formData.password}
            />
          </div>
          <button type="submit">Ingresar</button>
        </form>
        <div className="contlogcard contview">
          <div>
            <img src={Logo} alt="Logo.png" />
          </div>
          <h1> Bienvenido </h1>
          <h2>Sistema de gestion documentos</h2>
        </div>
      </div>
    </>
  );
}

export default Login;
