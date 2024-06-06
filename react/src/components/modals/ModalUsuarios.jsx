import '../../assets/styles/ModalUsuarios.css'

import { useState } from "react";
import { TabView, TabPanel } from 'primereact/tabview';
import { Dialog } from 'primereact/dialog';
import { URI } from "../../config";
import { useGetData } from "../../hooks/useGetData";
import { solicitudPost } from "../../helpers/solicitudPost";
import { formatDecimales } from "../../helpers/formatDecimales";
import CardDesplegable from "../organisms/CardDesplegable";
import FooterBotones from "../organisms/FooterBotones";
import FormularioDatosPersona from "../organisms/FormularioDatosPersona";
import Redirigir from "../atoms/Redirigir";
import PropTypes from "prop-types";
import { Toaster, toast } from 'sonner';

export default function ModalUsuarios({setnumeroUsuarios}) {
  const [visible, setVisible] = useState(false);

  //🔸 Fetching de Datos para listar Usuarios
  const { loading, data, error, refetch } = useGetData(`${URI}/Usuarios`);
  // console.log(data, loading, error, refetch);

  //🔸 Usuarios Activos / Inactivos
  const usuarios_activos = !loading && data.data.filter(f => f.estado_persona == 1);
  const usuarios_inactivos = !loading && data.data.filter(f => f.estado_persona == 0);

  if (!loading && !data.status) {
    console.log(error)
    toast.error(`Error al cargar Usuarios ❌`);
    // alert('Error al cargar Usuarios ❌');
  }
  else !loading && setTimeout(()=> setnumeroUsuarios(data.data.length) , 800);

  const initial_state = {
    fk_tipo_identificacion: "",
    n_identificacion: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    correo: "facturasversallesddne@gmail.com",
    fk_zona_venta: "",
    alias: "",
    contraseña: "ventas123",
  }

  //🔸 Datos Formulario
  const [formData, setFormData] = useState(initial_state);

  //🔸 Envío de Datos API
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("formData componente padre ", formData);
    const response = await solicitudPost(`${URI}/CrearUsuario`, formData);
    // console.log(response);

    if (response.status) {
      toast.success(`Usuario Credo ✅`);
      refetch(true);
      setFormData(initial_state);
      return
    }

    toast.error(`${response?.error}`);
    console.log(response);
  };


  return (
    <>
    {/* 🔸 Boton modal */}
      <Redirigir
        click={() => setVisible(true)}
        // disableBorder
      />

      {/* 🔸 Modal  */}
      <Dialog
        header="Usuarios"
        visible={visible}
        onHide={() => { if (!visible) return; setVisible(false); }}
        style={{ width: '86%', height: '87.7%', marginTop: '1%', boxShadow: "0 0 5px #5683DA" }}
        // style={{ width: '86%', height: '87.7%', marginTop: '1%' }}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        modal={false}
        draggable={false}
      >
        <TabView>

          <TabPanel header="Listado">
            <section className="container_cardDesplegable_usuarios">
              {
                loading
                  ? <h2>Cargando...</h2>
                  : !!data.data && data.data.map((r) => (
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
                      info='usuarios'
                      estado_persona={r.estado_persona}
                      remove = {r.n_identificacion != '444555666' ? true : false}
                      refetch={()=> refetch(true)}
                    />
                  ))
              }
            </section>
          </TabPanel>

          <TabPanel header="Agregar">
            <section className="container_agregar_usuarios">

              <div className="container_formulario_usuario">

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
                    click_back={() => setVisible(false)}
                    disable_button_back
                  />
                </form>
              </div>

              <div className="banner_usuarios">
                <img src="/images/icons/icon-usuarios.png" alt="Usuarios" height='100%' />

                <section>
                  <h3>{usuarios_activos ? formatDecimales(usuarios_activos?.length) : '...'}</h3>
                  <span>Activos</span>
                </section>

                <section>
                  <h3>{usuarios_inactivos ? formatDecimales(usuarios_inactivos?.length) : '...'}</h3>
                  <span>Inactivos</span>
                </section>
              </div>
            </section>
          </TabPanel>

        </TabView>

        <Toaster richColors position='top-center'/>
      </Dialog>
    </>
  )
}

ModalUsuarios.propTypes = {
  setnumeroUsuarios: PropTypes.func
}