
import PropTypes from 'prop-types'
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import BotonesVentas from "../organisms/Ventas/BotonesVentas"
import HeaderFacturacion from "../atoms/HeaderFacturacion"
import FooterBotones from "../organisms/FooterBotones"
import { useEffect, useState } from "react";
import { solicitudPost } from "../../helpers/solicitudPost";
import { URI } from "../../config";
import '../../assets/styles/Facturacion.css'
import { formatPrices } from '../../helpers/formatPrices';
import { Toaster, toast } from 'sonner';

export default function SeccionAbonos({ setSeccion }) {
  const [metodoPago, setMetodoPago] = useState(null);
  const [loadingButton, setloadingButton] = useState(false);

  const initial_state = {
    numFactura: '',
    metodo_pago: metodoPago,
    valor_abono: ''
    // fecha_abono Asignada en Backend 📍
  }
  const [formData, setFormData] = useState(initial_state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
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

  const [datosFactura, setDatosFactura] = useState(null);
  // console.log(datosFactura)
  const searchBill = async () => {
    setloadingButton(true);
    // console.log(formData);
    //🔸 Ejecutar la peticion API
    const response = await solicitudPost(`${URI}/InformeFactura/`, { numFactura: formData.numFactura });
    console.log(response);

    setTimeout(() => {
      setloadingButton(false)

      if (response.status) {
        setDatosFactura(response.data[0])
        toast.success(`Datos de Factura cargados correctamente`);
        return
      }

      toast.info(`No se encontro registrada la Factura: ${formData.numFactura}`);
      clearData();
    }, 600);
  }

  const clearData = () => {
    setDatosFactura(null);
    setMetodoPago(null);
    setFormData(initial_state);
  }

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const handleSubmit = async () => {
    setLoadingSubmit(true)
    // console.log({formData, pendiente: datosFactura?.total - parseInt(datosFactura?.total_abonos)});

    //🔸 Ejecutar la peticion API
    const response = await solicitudPost(`${URI}/GenerarAbonoFactura`, { formData, pendiente: datosFactura?.total - parseInt(datosFactura?.total_abonos) });
    // const response = await solicitudPost(`${URI}/GenerarAbonoFactura`, formData);
    setLoadingSubmit(false);

    if (response.status) {
      toast.success(`Abono Realizado`);
      clearData();
      return
    }

    toast.error(`${response.error}`);
    // console.log(response);
  }

  return (
    <article className="container_facturacion">

      <header className="header_facturacion">
        <span className="header_title">Abonos</span>
        <BotonesVentas setSeccion={setSeccion} />
      </header>

      <section className="facturacion_card" >

        <article className="section_facturacion_container">
          <HeaderFacturacion titulo="Realizar Abonos" />

          <section className="container_pagos_factura">

            <section className="container_pagos_factura_datos">

              {/*🔸 Seccion de Datos */}
              <article className="container_abonos_y_pagos" style={{ gridTemplateRows: '15% auto 12%', alignItems: 'baseline' }}>

                <div className="opciones_valores">
                  <h3> N° de factura </h3>
                  {/* <input className="input_abonos" type="text" placeholder="Factura: 1015" name="numFactura" /> */}
                  <form>
                    <div className="p-inputgroup flex-1" style={{ width: "250px" }}>
                      <InputText
                        id="id"
                        name="numFactura"
                        value={formData.numFactura}
                        onChange={handleChange}
                        placeholder="1015"
                        keyfilter="pnum"
                      />
                      <Button
                        icon="pi pi-search"
                        outlined
                        severity="secondary"
                        aria-label="Search"
                        loading={loadingButton}
                        onClick={searchBill}
                        disabled={formData.numFactura === ''}
                      />
                    </div>
                  </form>
                </div>

                <section className="section_metodos_pago" style={{ height: '90%' }}>
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

                  {/* <div className="opciones_valores">
                    <span className="input_container">
                      <img src="/images/icons/icons-getcash.png" alt="Icono Efectivo" width='30px' />
                      <input className="input_valor_recibido" type="text" placeholder="Valor a recibir" name="valor_abono" onChange={handleChange} />
                    </span>
                  </div> */}

                  <span className="input_container">
                    <img src="/images/icons/icons-getcash.png" alt="Icono Efectivo" width='30px' />
                    <InputNumber
                      className="input_valor_recibido"
                      // inputId="integeronly"
                      name="valor_abono"
                      value={formData.valor_abono}
                      onValueChange={(e) => handleChange(e)}
                      placeholder="Valor a recibir"
                    />

                  </span>
                </section>

              </article>

              {/*🔸 Seccion resumen factura */}
              <article className="section_resumen_factura">
                <h3>Resumen Factura</h3>

                {
                  datosFactura ? (
                    <>
                      <section className="resumen_factura_datosCliente">
                        <h4>Datos Cliente:</h4>
                        <div>
                          <p>{datosFactura?.nombres}</p>
                          <p>{datosFactura?.n_identificacion}</p>
                        </div>
                      </section>

                      <section className="resumen_factura_detalle">
                        <h4>Detallado:</h4>
                        <div>
                          <p>Productos:</p>
                          <p>{datosFactura?.cantidad_productos}</p>
                        </div>
                      </section>

                      <section className="resumen_factura_precios">
                        <h4>Total</h4>
                        <span>$ {datosFactura && formatPrices(datosFactura?.total)}</span>
                        <h4>Abonado</h4>
                        <span>$ {datosFactura && formatPrices(datosFactura?.total_abonos)}</span>
                        {
                          datosFactura?.total != datosFactura?.total_abonos &&
                          <>
                            <h4>Pendiente</h4>
                            <span>$ {formatPrices(parseInt(datosFactura?.total) - parseInt(datosFactura?.total_abonos))}</span>
                          </>
                        }

                      </section>
                    </>
                  ) : (
                    <section style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <h5 style={{ textAlign: 'center' }}>No hay datos de Factura 📌</h5>
                    </section>
                  )
                }

              </article>

            </section>

            <FooterBotones
              label1="Atrás"
              label2="Finalizar"
              click_back={() => setSeccion('ventas')}
              boton_active={datosFactura && formData.metodo_pago && formData.valor_abono != ''}
              click_send={handleSubmit}
              loading={loadingSubmit}
            />
          </section>
        </article>
        <Toaster richColors position='top-center' />
      </section>
    </article>
  )
}

SeccionAbonos.propTypes = {
  setSeccion: PropTypes.func
}