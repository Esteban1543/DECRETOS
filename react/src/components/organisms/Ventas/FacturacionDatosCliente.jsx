import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { solicitudPost } from "../../../helpers/solicitudPost.js";
import { URI } from "../../../config.js";
import { toast } from "sonner";
import HeaderFacturacion from "../../atoms/HeaderFacturacion";
import FooterBotones from "../FooterBotones";
import PropTypes from "prop-types";


export default function FacturacionDatosCliente({ handlePage, handleNumberBill, setSeccion, id_vendedor }) {
  const [activarBoton, setActivarBoton] = useState(false);

  //🔹 Datos para Select de categorias
  const [selectedTipoDoc, setSelectedTipoDoc] = useState({ name: "CC" });
  const tipo_doc = [{ name: "CC" }, { name: "CE" }, { name: "Otro" }];

  //🔹 Datos para Select de zonas
  const [selectedZone, setSelectedZone] = useState(null);
  const zonas = [
    { cod: "ZN01", name: "Sur" },
    { cod: "ZN02", name: "Norte" },
    { cod: "ZN03", name: "Oriente" },
    { cod: "ZN04", name: "Occidente" },
  ];

  // 🔸Datos Formulario
  const [formData, setFormData] = useState({
    fk_tipo_identificacion: selectedTipoDoc?.name,
    n_identificacion: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    correo: "",
    fk_zona_venta: selectedZone?.cod,
    fk_vendedor: id_vendedor
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //🔸 Establecer el valor del Select T_Doc en FormData
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      fk_tipo_identificacion: selectedTipoDoc?.name,
    }));
  }, [selectedTipoDoc]);

  //🔸 Establecer el valor del Select Zonas en FormData
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      fk_zona_venta: selectedZone?.cod,
    }));
  }, [selectedZone]);

  // 🔸Activar Boton
  useEffect(() => {
    !!formData.fk_zona_venta && setActivarBoton(true);
  }, [formData.fk_zona_venta]);

  // 🔸 Estado para Activar Inputs
  const [disableInput, setDisableInput] = useState(true);
  const [loadingButton, setloadingButton] = useState(false);

  //🔸 Buscar Cliente
  const searchClient = async () => {
    setloadingButton(true);

    //🔸 Ejecutar la peticion API
    const response = await solicitudPost(`${URI}/BuscarClienteIdentificacion`, { id: formData.n_identificacion });
    // console.log(response);

    setTimeout(() => {
      setloadingButton(false);
      setDisableInput(false);

      //🔸 Ingresar la información en el formulario, si existen datos del cliente
      if (response.status) {
        const {
          fk_tipo_identificacion,
          nombre_1,
          nombre_2,
          apellido_1,
          apellido_2,
          telefono,
          direccion,
          correo,
          fk_zona_venta,
        } = response.data[0];

        setFormData((prev) => ({
          ...prev,
          nombres: !nombre_2 ? nombre_1 : `${nombre_1} ${nombre_2}`,
          apellidos: !apellido_2 ? apellido_1 : `${apellido_1} ${apellido_2}`,
          telefono,
          direccion,
          correo,
        }));
        setSelectedTipoDoc({ name: fk_tipo_identificacion });
        const zona_definida = zonas.filter((f) => f.cod === fk_zona_venta);
        setSelectedZone(zona_definida[0]);

        toast.success(<h3>Cliente encontrado ✅</h3>);
        return;
      }

      //🔸 Resetear información de formulario en caso de que se haya consultado un cliente anteriormente
      setSelectedZone(null);
      setFormData((prev) => ({
        ...prev,
        fk_tipo_identificacion: selectedTipoDoc?.name,
        nombres: "nombre prueba",
        apellidos: "apellido prueba",
        telefono: "3051236545",
        direccion: "Calle de Prueba",
        correo: "facturasversallesddne@gmail.com",
        fk_zona_venta: selectedZone?.cod,
      }));

      // alert("Cliente no existe ✖️");
      toast.warning(<h3>Cliente no registrado❗</h3>);
    }, 600);
  };

  //🔸 Envío de Datos para crear cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("handleSubmit", formData);

    //🔸 Ejecutar la peticion API
    const response = await solicitudPost(`${URI}/CrearClienteDevolverFactura`, formData);
    // console.log(response.data[0])

    if(response.status) {
      handleNumberBill(response.data[0].cod_factura);
      // alert(`Datos de Cliente verificados ✅`);
      toast.success(<h3>Factura {response.data[0].cod_factura} inicializada ✅</h3>);
      handlePage(2);
      return
    }

    // alert(`Error al validar Datos de Cliente ❌`);
    toast.error(<h3>❌ Error al validar Datos de Cliente</h3>);
  };

  return (
    <>
      <HeaderFacturacion titulo="Datos Cliente" />

      <section className="container_form_datosCliente">

        <form onSubmit={handleSubmit} className="form_section_datosClientes">
          <article className="section_modal_user">
            <FloatLabel>
              <label htmlFor="id">N° Documento</label>

              <div className="p-inputgroup flex-1" style={{ width: "250px" }}>
                <InputText
                  id="id"
                  name="n_identificacion"
                  value={formData.n_identificacion}
                  onChange={handleChange}
                  // onBlur={searchClient}
                  placeholder="Buscar..."
                  keyfilter="pnum"
                  style={{boxShadow: '0 0 2px var(--blue-200)'}}
                />
                <Button
                  icon="pi pi-search"
                  outlined
                  severity="help"
                  aria-label="Search"
                  loading={loadingButton}
                  onClick={searchClient}
                />
              </div>
            </FloatLabel>

            <FloatLabel className="w-full md:w-14rem">
              <Dropdown
                inputId="tipo_doc"
                value={selectedTipoDoc}
                onChange={(e) => setSelectedTipoDoc(e.value)}
                options={tipo_doc}
                optionLabel="name"
                placeholder="Tipo Documento"
                checkmark={true}
                highlightOnSelect={true}
                style={{ width: "250px", fontSize: "14px" }}
                disabled={disableInput}
              />
              <label htmlFor="tipo_doc">Tipo de Documento</label>
            </FloatLabel>

            <FloatLabel>
              <InputText
                id="nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                disabled={disableInput}
              />
              <label htmlFor="nombres">Nombres</label>
            </FloatLabel>

            <FloatLabel>
              <InputText
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                disabled={disableInput}
              />
              <label htmlFor="apellidos">Apellidos</label>
            </FloatLabel>

            <FloatLabel>
              <InputText
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                disabled={disableInput}
                keyfilter="pnum"
              />
              <label htmlFor="telefono">Celular</label>
            </FloatLabel>

            <div>
              <FloatLabel>
                <InputText
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  disabled={disableInput}
                  keyfilter="email"
                />
                <label htmlFor="correo">Correo</label>
              </FloatLabel>
            </div>

            <FloatLabel>
              <InputText
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                disabled={disableInput}
              />
              <label htmlFor="direccion">Dirección</label>
            </FloatLabel>

            <Dropdown
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.value)}
              options={zonas}
              optionLabel="name"
              placeholder="Zonas"
              checkmark={true}
              highlightOnSelect={true}
              style={{ width: "250px" }}
              disabled={disableInput}
            />
          </article>

          <FooterBotones
            label1="Cancelar"
            label2="Continuar"
            boton_active={activarBoton}
            click_back={()=> setSeccion('ventas')}

            // pruebas diseño 📌
            // boton_active
            // click_send={()=>handlePage(2)}
          />
        </form>
      </section>
    </>
  );
}

FacturacionDatosCliente.propTypes = {
  handlePage: PropTypes.func.isRequired,
  handleNumberBill: PropTypes.func.isRequired,
  id_vendedor: PropTypes.number,
  setSeccion: PropTypes.func
}