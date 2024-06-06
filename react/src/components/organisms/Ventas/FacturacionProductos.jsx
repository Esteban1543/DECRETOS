import { useState, useEffect } from "react";
import { URI } from "../../../config";
import { useGetData } from "../../../hooks/useGetData";
import { solicitudPost } from "../../../helpers/solicitudPost";
import PropTypes from "prop-types";
import HeaderFacturacion from "../../atoms/HeaderFacturacion";
import FooterBotones from "../FooterBotones";
import TablaDetalleFactura from "./TablaDetalleFactura";
import ModalAñadirProductos from "../../modals/ModalAñadirProductos.jsx";
import { toast } from "sonner";

export default function FacturacionProductos({ handlePage, numFactura, iva, setIva, setInfoFactura, setSeccion }) {
  const [listaProductos, setListaProductos] = useState(null);

  //🔸 Fetching de Datos
  const { loading, data, error } = useGetData(`${URI}/Productos`);
  // console.log(data)

  useEffect(() => {
    if (!loading && data.status) {
      //🔸 Agregar la propiedad de cantidad a cada objeto de productos
      const productosConCantidad = data.data.map(objeto => {
        const objetosConCantidad = { ...objeto };
        objetosConCantidad.cantidad = 0;
        // objetosConCantidad.numFactura = numFactura
        return objetosConCantidad
      })
      setListaProductos(productosConCantidad);
      // console.log(productosConCantidad);
    } else if (!loading && !data.status) {
      alert("Error en la solicitud de Datos ✖️ en: /Productos");
      console.log(error);
    }
  }, [data, error, loading]);

  //🔸 Filtrar productos que hayan sido seleccionados de acuerdo a su cantidad.
  const [productosFinal, setProductosFinal] = useState(null);
  // console.log(productosFinal);

  //🔸 Recibir Listado de productos seleccionaados
  const handleData = () => {
    // console.log(listaProductos)
    const productosSeleccionados = listaProductos.filter(f => f.cantidad > 0)
    setProductosFinal(productosSeleccionados);
  };

  //🔸 Envío de Datos API
  const handleSubmit = async () => {
    console.log('productosFinal a enviar API', { numFactura, productos: productosFinal })

    //🔸 Ejecutar la peticion API
    const response = await solicitudPost(`${URI}/CrearFactura`, { numFactura, productos: productosFinal });

    if(response.status) {
      setInfoFactura(response.data[0])
      console.log(response.message);
      // alert(`Productos agregados exitosamente ✅`);
      toast.success(<h3>Productos agregados exitosamente ✅</h3>)
      handlePage(3);
      return
    }

    // alert(`Error al agregar los productos ❌`);
    toast.warning(<h3>❌ No hay productos para agregar</h3>);

    // handlePage(3); // Prar pruebas 📌
  };

  //🔸 Manejo de cantidad seleccionada por productos
  const handleQuantity = (product, accion, numManual) => {
    // console.log(numManual)
    const search = listaProductos.find((f) => f.cod_producto === product.cod_producto);

    if (search && accion === "sumar") search.cantidad++;
    else if (search?.cantidad > 0 && accion === "restar") search.cantidad--;
    else if (accion === "remover") search.cantidad = 0;
    else if (accion === "manual") search.cantidad = numManual;

    handleData()
  };

  return (
    <>
      <HeaderFacturacion titulo="Agregar productos" />

      <section className="container_añadir_productos">
        <div className="section_añadir_productos_botones">
          <button
            className="añadir_productos_botones"
            disabled
          >
            <img src="/images/icons/icon-search.png" alt="Search" height="80%" />
            Buscar Producto ❌
          </button>
          <ModalAñadirProductos fn_handleData={handleData} lista_productos={listaProductos} />
        </div>

        <div className="añadir_productos_tabla">
          <TablaDetalleFactura datosTabla={productosFinal} handleQuantity={handleQuantity} iva={iva} setIva={setIva}/>
        </div>

        <FooterBotones
          label1="Cancelar"
          label2="Continuar"
          click_send={handleSubmit}
          boton_active={productosFinal?.length >= 1}
          click_back={()=> setSeccion('ventas')}
          
          // click_back={() => handlePage(1)}
          // click_send={()=> handlePage(3)}
        />
      </section>
    </>
  );
}

FacturacionProductos.propTypes = {
  handlePage: PropTypes.func.isRequired,
  numFactura: PropTypes.number.isRequired,
  iva: PropTypes.number.isRequired,
  setIva: PropTypes.func.isRequired,
  setInfoFactura: PropTypes.func.isRequired,
  setSeccion: PropTypes.func
};