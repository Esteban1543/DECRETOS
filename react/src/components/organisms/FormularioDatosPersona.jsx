import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";

export default function FormularioDatosPersona({ setFormData, formData, tipo_formulario,}) {

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

  //🔸 Gestionar cambios en inputs
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


  return (
    <article className="section_modal_user">
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
        />
        <label htmlFor="tipo_doc">Tipo de Documento</label>
      </FloatLabel>

      <FloatLabel>
        <InputText
          id="id"
          name="n_identificacion"
          value={formData.n_identificacion}
          onChange={handleChange}
        />
        <label htmlFor="id">N° Documento</label>
      </FloatLabel>

      <FloatLabel>
        <InputText
          id="nombres"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
        />
        <label htmlFor="nombres">Nombres</label>
      </FloatLabel>

      <FloatLabel>
        <InputText
          id="apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
        />
        <label htmlFor="apellidos">Apellidos</label>
      </FloatLabel>

      <FloatLabel>
        <InputText
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
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
      />

      {tipo_formulario === "usuario" && (
        <>
          <FloatLabel>
            <InputText
              id="alias"
              name="alias"
              value={formData.alias}
              onChange={handleChange}
            />
            <label htmlFor="alias">Alias</label>
          </FloatLabel>

          <FloatLabel>
            <InputText
              id="contraseña"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              type="password"
            />
            <label htmlFor="contraseña">Contraseña</label>
          </FloatLabel>
        </>
      )}
    </article>
  );
}

FormularioDatosPersona.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  tipo_formulario: PropTypes.string
};
