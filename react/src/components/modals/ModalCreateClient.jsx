import "../../assets/styles/ModalCreateUser.css";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { URI } from "../../config";
import { solicitudPost } from "../../helpers/solicitudPost";
import FormularioDatosPersona from "../organisms/FormularioDatosPersona";
import FooterBotones from "../organisms/FooterBotones.jsx";

export default function ModalCreateClient() {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);

  // 🔸Datos Formulario
  const  initial_state = {
    fk_tipo_identificacion: "",
    n_identificacion: "",
    nombres: "Jhoan Esteban",
    apellidos: "Vargas Parra",
    telefono: 5453535,
    direccion: "Calle 67",
    correo: "example@example.com",
    fk_zona_venta: "",
    // alias: "alias",
    // contraseña: "ventas123",
  }
  const [formData, setFormData] = useState(initial_state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData componente padre ", formData);
    const response = await solicitudPost(`${URI}/CrearCliente`, formData);
    console.log(response);

    if (response.status) {
      alert("Cliente Credo ✅");
      setVisible(false);
      setFormData(initial_state)
      return;
    }
    alert(response.error);
  };

  return (
    <div className="card">
      <div className="flex flex-wrap justify-content-center gap-2 mb-2">
        <Button
          icon="pi pi-plus"
          rounded
          text
          aria-label="Filter"
          onClick={() => show("right")}
          // label="Crear Cliente"
        />
      </div>

      <Dialog
        header="Crear Cliente"
        visible={visible}
        position={"top"}
        onHide={() => setVisible(false)}
        // maximizable
        draggable={false}
        resizable={true}
        style={{ marginTop: '20vh' }}
      >
        <div style={{ maxWidth: "660px", margin: "auto" }}>
          <form onSubmit={handleSubmit}>
            <FormularioDatosPersona
              setFormData={setFormData}
              formData={formData}
              tipo_formulario='cliente'
            />

            <FooterBotones
              label1="Cancelar"
              label2="Crear"
              boton_active
              click_back={()=>setVisible(false)}
              click_send={(e)=> handleSubmit(e)}
            />
          </form>
        </div>
      </Dialog>
    </div>
  );
}