
import { useState } from "react";
import { TabView, TabPanel } from 'primereact/tabview';
import { Dialog } from 'primereact/dialog';
import CardDesplegable from "../organisms/CardDesplegable";
import '../../assets/styles/ModalUsuarios.css'
import '../../assets/styles/ModalCreateUser.css'
import { URI } from "../../config";
import FooterBotones from "../organisms/FooterBotones";
import FormularioDatosPersona from "../organisms/FormularioDatosPersona";
import { solicitudPost } from "../../helpers/solicitudPost";
import Redirigir from "../atoms/Redirigir";
import PropTypes from "prop-types";
import { formatDecimales } from "../../helpers/formatDecimales";

export default function ModalClientes({ dataClientes, refetchClientes }) {
  const [visible, setVisible] = useState(false);
  // console.log(dataClientes)

  // 🔸Datos Formulario
  const initial_state = {
    fk_tipo_identificacion: "",
    n_identificacion: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    correo: "facturasversallesddne@gmail.com",
    fk_zona_venta: ""
  }
  const [formData, setFormData] = useState(initial_state);

  //🔸 Envío de Datos API
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("formData componente padre ", formData);
    const response = await solicitudPost(`${URI}/CrearCliente`, formData);

    if (response.status) {
      alert("Cliente Credo ✅");
      // setVisible(false);
      setFormData(initial_state)
      refetchClientes(true);
      return;
    }

    alert(response.error);
  };

  return (
    <>
      {/* 🔸 Boton modal */}
      <Redirigir
        click={() => setVisible(true)}
      // enableBorder
      />

      {/* 🔸 Modal  */}
      <Dialog
        header="Clientes"
        visible={visible}
        onHide={() => { if (!visible) return; setVisible(false); }}
        // style={{ width: '86%', height: '87.7%', marginTop: '1%' }}
        style={{ width: '86%', height: '87.7%', marginTop: '1%', boxShadow: "0 0 5px #5683DA" }}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        modal={false}
        draggable={false}
      >
        <TabView>

          <TabPanel header="Listado" style={{ outline: '' }}>
            <section className="container_cardDesplegable_usuarios">
              {
                dataClientes.loading
                  ? <h2>Cargando...</h2>
                  : !!dataClientes.data.data && dataClientes.data.data.map((r) => (
                    <CardDesplegable
                      key={r.n_identificacion}
                      usuario={`${r.nombre_1} ${r.apellido_1}`}
                      alias={r.alias}
                      zona={r.alias != 'Admin' ? `Zona ${r.zona}` : '🔒'}
                      nombres={`${r.nombre_1} ${r.nombre_2 || ''}`}
                      apellidos={`${r.apellido_1} ${r.apellido_2 || ''}`}
                      identificacion={`${r.fk_tipo_identificacion} - ${r.n_identificacion}`}
                      telefono={r.telefono}
                      correo={r.correo}
                      direccion={r.direccion}
                      info='clientes'
                    />
                  ))
              }
            </section>
          </TabPanel>

          <TabPanel header="Agregar">
            <section className="container_agregar_usuarios" style={{minHeight:'63vh'}}>
              <div className="container_formulario_usuario" style={{display: 'grid', alignContent: 'center', paddingInline: '2rem'}}>
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
                    click_back={() => setVisible(false)}
                    click_send={(e) => handleSubmit(e)}
                    disable_button_back
                  />
                </form>
              </div>

              <div className="banner_usuarios">
                <img src="/images/icons/icon-usuarios.png" alt="Usuarios" height='100%' />

                <section>
                  <h3>{!dataClientes.loading ? formatDecimales(dataClientes.data.data.length) : '...'}</h3>
                  <span>Activos</span>
                </section>

                <section>
                  <h3>0</h3>
                  <span>Inactivos</span>
                </section>
              </div>
            </section>
          </TabPanel>

        </TabView>
      </Dialog>
    </>
  )
}

ModalClientes.propTypes = {
  dataClientes: PropTypes.object.isRequired,
  refetchClientes: PropTypes.func.isRequired
}