import { useEffect, useState } from "react";
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { formatPrices } from "../../../helpers/formatPrices.js";
import HeaderFacturacion from "../../atoms/HeaderFacturacion.jsx";
import FooterBotones from "../FooterBotones.jsx";
import PropTypes from "prop-types";
import { solicitudPost } from "../../../helpers/solicitudPost.js";
import { URI } from "../../../config.js";
import { toast } from "sonner";



export default function FacturacionPagos({ numFactura, nombre_cliente, id_cliente, cantidad_productos, subtotal, iva, handlePage, setSeccion }) {

  const total = Math.round(parseInt(subtotal) * (iva / 100)) + parseInt(subtotal);

  const [metodoPago, setMetodoPago] = useState(null);


  // 🔸 Manejo de datos en inputs
  const [formData, setFormData] = useState({
    numFactura,
    iva_aplicado: iva,
    subtotal,
    total,

    metodo_pago: metodoPago,
    pago_total: '',
    numero_abonos: '',
    valor_abono: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, Number(value));

    //🔸 Admitir solo valores numericos en input abonos
    if (name === 'numero_abonos') {
      if (!/^\d*$/.test(value)) return;
      if (Number(value) > 5) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  //🔸 Setear el valor del estado en el formData ante cambio de estado
  useEffect(() => {
    !!metodoPago && setFormData((prev) => ({
      ...prev,
      metodo_pago: metodoPago
    }))
  }, [metodoPago])

  //🔸 (In)Habiitar input de abonos de acuerdo al pago total 'radio buttom'
  const [disableAbonos, setDisableAbonos] = useState(true);
  useEffect(() => {
    if (formData.pago_total === '0') {
      setDisableAbonos(false);
      setFormData((prev) => ({
        ...prev,
        numero_abonos: '',
        valor_abono: ''
      }));
    }
    else if (formData.pago_total === '1') {
      setDisableAbonos(true);
      setFormData((prev) => ({
        ...prev,
        numero_abonos: 1,
        valor_abono: total
      }));
    }

  }, [formData.pago_total, total])

  //🔸 Envio de Datos API
  const handleSubmit = async () => {
    // console.log(formData)
    if (formData.valor_abono == '' || formData.valor_abono == null ) return toast.error('Valor a recibir no puede estar vacío');

    const response = await solicitudPost(`${URI}/IngresarDatosFactura`, formData);
    // console.log(response)

    if (response.status) {
      toast.success(<h3>Datos ingresado correctamente ✅</h3>);
      handlePage(4);
      return
    }

    toast.error(response?.error);
    console.log(response);
  }


  return (
    <>
      <HeaderFacturacion titulo="Métodos de Pagos" />

      <section className="container_pagos_factura">

        <section className="container_pagos_factura_datos">

          <article className="container_abonos_y_pagos">

            <section className="section_metodos_pago">
              <h3> Seleccione el Método de Pago </h3>

              <article className="container_metodos_pago">
                <div className="div_metodo_pago" onClick={() => setMetodoPago('Efectivo')} style={metodoPago === 'Efectivo' ? { outlineWidth: '2px' } : { outlineWidth: '0px' }}>
                  <img src="/images/icons/icon-efectivo2.png" alt="Icono Efectivo" width='25%' />
                  <span>Efectivo</span>
                </div>

                <div className="div_metodo_pago" onClick={() => setMetodoPago('Tarjeta')} style={metodoPago === 'Tarjeta' ? { outlineWidth: '2px' } : { outlineWidth: '0px' }}>
                  <img src="/images/icons/icon-tarjeta.png" alt="Icono Tarjeta" width='28%' />
                  <span>Tarjeta</span>
                </div>

                <div className="div_metodo_pago" onClick={() => setMetodoPago('Digital')} style={metodoPago === 'Digital' ? { outlineWidth: '2px' } : { outlineWidth: '0px' }}>
                  <img src="/images/icons/icon-digital.png" alt="Icono Digital" width='25%' />
                  <span>Digital</span>
                </div>

                <div className="div_metodo_pago" onClick={() => setMetodoPago('Otro')} style={metodoPago === 'Otro' ? { outlineWidth: '2px' } : { outlineWidth: '0px' }}>
                  <img src="/images/icons/icon-billetera.png" alt="Icono 'Otro' método de pago" width='26%' />
                  <span>Otro</span>
                </div>
              </article>
            </section>

            <section className="container_valores">

              <div className="opciones_valores">
                <h3>Pago completo</h3>

                <div className="container_radios">
                  <section>
                    <label htmlFor="si">Si</label>
                    {/* <input type="radio" name="pago_total" id="si" value='true' onChange={handleChange} /> */}
                    <RadioButton inputId="si" name="pago_total" value="1" onChange={handleChange} checked={formData.pago_total == '1'} />
                  </section>

                  <section>
                    <label htmlFor="no">No</label>
                    {/* <input type="radio" name="pago_total" id="no" value='false' onChange={handleChange} /> */}
                    <RadioButton inputId="no" name="pago_total" value="0" onChange={handleChange} checked={formData.pago_total == '0'} />
                  </section>
                </div>
              </div>

              <div className="opciones_valores">
                <h3> N° de Abonos </h3>
                <input className="input_abonos" type="text"
                  placeholder="Abonos" name="numero_abonos"
                  value={formData.numero_abonos}
                  onChange={handleChange}
                  style={disableAbonos && formData.pago_total !== 'true' ? { opacity: '.9', borderColor: 'grey' } : null}
                  disabled={disableAbonos}
                // max={4} min={1}
                />
              </div>

              <div className="opciones_valores">

                <span className="input_container">
                  <img src="/images/icons/icons-getcash.png" alt="Icono Efectivo" width='30px' />
                  <InputNumber
                    className="input_valor_recibido"
                    inputId="integeronly"
                    name="valor_abono"
                    value={formData.valor_abono}
                    onValueChange={(e) => handleChange(e)}
                    placeholder="Valor a recibir"
                    style={disableAbonos && formData.pago_total !== 'true' ? { opacity: '.9', borderColor: 'grey' } : null}
                    disabled={disableAbonos}
                    // maxLength={10}
                  />

                  {/* <input className="input_valor_recibido" 
                    type="text"
                    placeholder="Valor a recibir" 
                    name="valor_abono"
                    onChange={handleChange} 
                    // value={formatPrices(formData.valor_abono || 0)}
                    value={formData.valor_abono}
                    disabled={disableAbonos}
                  /> */}
                </span>

              </div>
            </section>

          </article>

          <article className="section_resumen_factura">
            <h3>Resumen Factura</h3>

            <section className="resumen_factura_datosCliente">
              <h4>Datos Cliente:</h4>
              <div>
                <p>{nombre_cliente}</p>
                <p>{id_cliente}</p>
              </div>
            </section>

            <section className="resumen_factura_detalle">
              <h4>Detallado:</h4>
              <div>
                <p>{cantidad_productos} Productos</p>
                {/* <p>{cantidad_productos}</p> */}
              </div>
            </section>

            <section className="resumen_factura_precios">
              <h4>Subtotal</h4>
              <span>$ {formatPrices(subtotal)}</span>
              <h4>Iva</h4>
              <span>{iva}%</span>
              <h4>Total</h4>
              <span>$ {formatPrices(total)}</span>

            </section>
          </article>

        </section>

        <FooterBotones
          label1="Cancelar"
          label2="Continuar"
          click_send={handleSubmit}
          click_back={()=> setSeccion('ventas')}
          // boton_active
          // boton_active={isFormComplete}
          boton_active={metodoPago && formData.valor_abono && formData.numero_abonos}

          // Pruebas 📌
        // click_send={() => handlePage(4)}
        />
      </section>
    </>
  );
}

FacturacionPagos.propTypes = {
  nombre_cliente: PropTypes.string.isRequired,
  id_cliente: PropTypes.number.isRequired,
  cantidad_productos: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
  iva: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  numFactura: PropTypes.number,
  handlePage: PropTypes.func.isRequired
};
