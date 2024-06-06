import { useState } from "react";
import "../../../assets/styles/Facturacion.css";
import FacturacionDatosCliente from "./FacturacionDatosCliente";
import FacturacionProductos from "./FacturacionProductos";
import FacturacionPagos from "./FacturacionPagos";
import PropTypes from 'prop-types'
import { Toaster } from "sonner";
import FacturacionPrevPDF from "./FacturacionPrevPDF";

export default function Facturacion({ pagina, setPagina, setSeccion, id_vendedor }) {

  const [infoFactura, setInfoFactura] = useState(null);
  const [numFactura, setNumFactura] = useState(null);
  const [iva, setIva] = useState(19);

  //🔸 Administrar la página que se necesita con base al proceso de facturación
  const handlePage = (page) => setPagina(page);

  //🔸 Numero de Factura para Peticiones Http
  const handleNumberBill = (bill) => setNumFactura(bill);


  return (
    <article className="section_facturacion_container">
      {
        pagina === 1
          ? <FacturacionDatosCliente
            id_vendedor={id_vendedor}
            handlePage={handlePage}
            handleNumberBill={handleNumberBill}
            setSeccion={setSeccion}
          />
          : pagina === 2
            ? (
              <FacturacionProductos
                handlePage={handlePage}
                numFactura={numFactura}
                iva={iva}
                setIva={setIva}
                setInfoFactura={setInfoFactura}
                setSeccion={setSeccion}
              />
            ) : pagina === 3 ? (
              <FacturacionPagos
                // Datos de la consulta API
                numFactura={numFactura}
                nombre_cliente={infoFactura?.cliente}
                id_cliente={infoFactura?.n_identificacion}
                cantidad_productos={infoFactura?.cant_productos}
                subtotal={infoFactura?.subtotal}
                //Valor de estado
                iva={iva}
                //Funciones de estados en Facturacion
                handlePage={handlePage}
                setSeccion={setSeccion}
              />
            )
              : (
                <FacturacionPrevPDF
                  setSeccion={setSeccion}
                  numFactura={numFactura}
                />
              )
      }
      <Toaster position="bottom-center" richColors />
    </article>
  );
}

Facturacion.propTypes = {
  pagina: PropTypes.number.isRequired,
  setPagina: PropTypes.func.isRequired,
  setSeccion: PropTypes.func.isRequired,
  id_vendedor: PropTypes.number
}