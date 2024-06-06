import { URI } from "../../config";
import { solicitudPost } from "../../helpers/solicitudPost";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "../../assets/styles/ModalCreateUser.css";
import FormularioDatosPersona from "../organisms/FormularioDatosPersona.jsx";
import FooterBotones from "../organisms/FooterBotones";

export default function ModalCreateUser() {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);

  // 🔸Datos Formulario
  const [formData, setFormData] = useState({
    fk_tipo_identificacion: "",
    n_identificacion: "",
    nombres: "Jhoan Esteban",
    apellidos: "Vargas Parra",
    telefono: 5453535,
    direccion: "Calle 67",
    correo: "example@example.com",
    fk_zona_venta: "",
    alias: "Alias",
    contraseña: "ventas123",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData componente padre ", formData);
    const response = await solicitudPost(`${URI}/CrearUsuario`, formData);
    console.log(response);

    if (response.status) {
      alert("Usuario Credo ✅");
      setVisible(false)
      return;
    }
    alert(response.error);
  };

  // const handleReceived = (formData) => {
  //   console.log("formData ->", formData);
  // };

  return (
    <div className="card">
      <div className="flex flex-wrap justify-content-center gap-2 mb-2">
        <Button
          icon="pi pi-plus"
          rounded
          outlined
          aria-label="Filter"
          onClick={() => show("right")}
        />
      </div>

      <Dialog
        header="Crear Usuario"
        visible={visible}
        position={"right"}
        onHide={() => setVisible(false)}
        // maximizable
        draggable={false}
        resizable={true}
        style={{ marginRight: "7.5vw", marginTop: '4.9rem'  }}
      >
        <div style={{ maxWidth: "660px", margin: "auto" }}>
          <form onSubmit={handleSubmit}>
            <FormularioDatosPersona
              setFormData={setFormData}
              formData={formData}
              tipo_formulario='usuario'
            />

            <FooterBotones
              label1="Cancelar"
              label2="Crear"
              boton_active
              click_back={()=>setVisible(false)}
            />
          </form>
        </div>
      </Dialog>
    </div>
  );
}
