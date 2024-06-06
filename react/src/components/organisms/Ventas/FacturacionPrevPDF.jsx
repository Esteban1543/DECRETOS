
import PropTypes from 'prop-types'
import HeaderFacturacion from '../../atoms/HeaderFacturacion'
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from "primereact/checkbox";
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { useGetData } from "../../../hooks/useGetData.jsx";
import { URI } from "../../../config.js";
import { solicitudPost } from '../../../helpers/solicitudPost.js';
import { toast } from 'sonner';
import PreviaPDF from './PreviaPDF.jsx';

export default function FacturacionPrevPDF({ setSeccion, numFactura }) {

  //🔸 Generar factura en Backend
  const generarPdfBackend = useGetData(`${URI}/CrearFacturaPdf/${numFactura}`);
  console.log(generarPdfBackend);

  // const [enableButton, setEnableButton] = useState(true);

  //🔸 Datos Formulario
  const [formData, setFormData] = useState({
    numFactura,
    enviar_copia: '',
    segundo_correo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // useEffect(() => {
  //   if (formData.enviar_copia == 'true' ) setEnableButton(true)
  //   else setEnableButton(true)
  // }, [formData.enviar_copia, formData.segundo_correo])


  // 🔸 Enviar datos API
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const handleSubmit = async () => {
    setLoadingSubmit(true);
    
    // console.log(formData);
    const response = await solicitudPost(`${URI}/EnviarFacturaGmail`, formData);
    setLoadingSubmit(false);
    console.log(response);

    if (response.status) {
      toast.success(`La factura ${numFactura} se envío exitosamente vía email 📨`);

      setSeccion('ventas');
      return
    }

    toast.error(`Algo salío mal ❌ ${response?.error}`);
    console.log(response);
  }

  return (
    <>
      <HeaderFacturacion titulo='Factura Completada!' />

      <section className='container_factura_pdf'>
        <article className='container_prev_pdf'>
          {
            !generarPdfBackend.loading
              ? <PreviaPDF data={generarPdfBackend} />
              : (
                <section style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <h3>Cargando...</h3>
                </section>
            )
          }
        </article>

        <aside className='aside_acciones_pdf'>
          {/* <section className='section_imprimir'>
            <button className='print_button'>
              <img src="/images/icons/icon-print.png" alt="Imprimir" height={'55px'} width={'61px'} />
            </button>

            <h4>Imprimir</h4>
          </section> */}

          <section>
            <img src="/images/icons/icon-email.png" alt="Imprimir" height={'55px'} />
            <h4>Copia a otro correo</h4>

            <div className="container_radios" style={{ width: '180px' }}>
              <section>
                <label htmlFor="si">Si</label>
                <RadioButton inputId="si" name="enviar_copia" value="true" onChange={handleChange} checked={formData.enviar_copia == 'true'} />
              </section>

              <section>
                <label htmlFor="no">No</label>
                <RadioButton inputId="no" name="enviar_copia" value="false" onChange={handleChange} checked={formData.enviar_copia == 'false'} />
              </section>
            </div>

          </section>

          <section className='section_otro_correo'>
            {/* <div className='section_check_correo'>
              <label htmlFor="otro_correo">Copia a otro correo</label>
              <Checkbox
                className='span_check_prime'
                inputId='otro_correo'
                onChange={e => setChecked(e.checked)}
                checked={checked}
                invalid={!checked}
              />
            </div> */}

            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-at"></i>
              </span>
              <InputText
                placeholder="example@gmail.com"
                name="segundo_correo"
                value={formData.segundo_correo}
                onChange={handleChange}
                disabled={formData.enviar_copia == 'false'}
              />
            </div>
          </section>

          {/* <button onClick={handleSubmit}>Finalizar</button> */}
          <Button
            label="Finalizar"
            severity="info"
            onClick={handleSubmit}
            raised
            icon="pi pi-check"
            disabled={!formData.enviar_copia}
            loading={loadingSubmit}
          />
        </aside>
      </section>
    </>
  )
}

FacturacionPrevPDF.propTypes = {
  setSeccion: PropTypes.func.isRequired,
  numFactura: PropTypes.number.isRequired
}