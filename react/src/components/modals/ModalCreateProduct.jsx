import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { URI } from "../../config.js";
import { solicitudPost } from "../../helpers/solicitudPost.js";

import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

export default function ModalCreateProduct({ handleOpen, op, refetch }) {
  //🔸 Datos para Select de categorias
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [
    { name: "Escolar" },
    { name: "Oficina" },
    { name: "Papeles" },
    { name: "Manualidades" },
  ];

  //🔸 Estado para input precio
  const [precio, setPrecio] = useState("");

  //🔸 Datos Formulario
  const initial_state = {
    fk_categoria: selectedCategory?.name,
    nombre_producto: "",
    precio_producto: precio,
    descripcion: "",
  }

  const [formData, setFormData] = useState(initial_state);

  //🔸 Manejo de ingresos en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //🔸 Establecer el valor del Select categoria en FormData al cambiar su value
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      fk_categoria: selectedCategory?.name,
    }));
  }, [selectedCategory]);

  //🔸 Establecer el valor del precio en FormData al cambiar su value
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      precio_producto: precio,
    }));
  }, [precio]);

  const clearData = (e) => {
    handleOpen(e);
    setSelectedCategory(null);
    setPrecio("");
  }

  //🔸 Envío de Datos API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // console.log("formData producto", formData);
    const post_response = await solicitudPost(`${URI}/CrearProducto`, formData);
    
    if(post_response?.status) {
      alert('Producto Creado ✅')
      refetch(true);
      clearData(e)
      setFormData(initial_state)
      return 
    }

    alert('Error al Crear Producto ✖️');
    console.log(post_response?.error);
  };

  // 🔸 Funcionalidad para activar Boton
  const [activarBoton, setactivarBoton] = useState(true);

  useEffect(() => {
    !!formData.descripcion && setactivarBoton(false);
  }, [formData.descripcion]);


  return (
    <OverlayPanel ref={op} style={{ boxShadow: "0 0 20px #5683DA" }}>
      <header className="titulo_modal_product">
        <h3>Crear Producto</h3>
        <img
          src="/images/create-product.png"
          alt="Crear Prodcuto"
          width="32px"
          height="32px"
        />
      </header>

      <form onSubmit={handleSubmit}>
        <div className="modal_content_products">
          <Dropdown
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.value)}
            options={categories}
            optionLabel="name"
            placeholder="Categoria"
            checkmark={true}
            highlightOnSelect
            style={{ minWidth: "188px" }}
          />

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <img
                src="/images/icons/icon-product1.png"
                alt="Producto"
                width="24px"
              />
            </span>
            <InputText
              placeholder="Producto"
              name="nombre_producto"
              value={formData.nombre_producto}
              onChange={handleChange}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">$</span>
            <InputNumber
              placeholder="Precio"
              name="precio_producto"
              value={formData.precio_producto}
              onChange={(e) => setPrecio(e.value)}
            />
            <span className="p-inputgroup-addon">col</span>
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-tag" />
            </span>
            <InputText
              placeholder="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>

          <Button
            label="Crear"
            severity="info"
            outlined
            type="submit"
            disabled={activarBoton}
          />
        </div>
      </form>
    </OverlayPanel>
  );
}

ModalCreateProduct.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  op: PropTypes.object,
  refetch: PropTypes.func.isRequired
}