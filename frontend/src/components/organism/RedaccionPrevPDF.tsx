
import HeaderRedaccion from "../atoms/HeaderRedaccion";
import Button from '@mui/material/Button';
import { DatosEncabezadoType, DecretoType } from "../../helpers/Types";
import WordTemplate from "./WordTemplate";
import PrevisualizacionActa from "./PrevisualizacionActa";
import { useState } from "react";

interface RedaccionPrevPDFProps {
  handlePage: (page: number) => void,
  datosEncabezado: DatosEncabezadoType,
  decretosAnexados: DecretoType[]
}

export default function RedaccionPrevPDF({ handlePage, datosEncabezado, decretosAnexados }: RedaccionPrevPDFProps) {

  const [salir, setSalir] = useState(false);

  const handleSubmitData = () => {
    setSalir(true)
    setTimeout(() => {
      // handlePage(1)
    }, 1000);
  }

  return (
    <>
      <HeaderRedaccion titulo='Confirmar Acta' />

      <section className='container_factura_pdf'>

        <article className='container_prev_pdf'>
          {/* <section style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
            <h3>Pendiente...</h3>            
          </section> */}
          <PrevisualizacionActa
            datosEncabezado={datosEncabezado}
            decretosAnexados={decretosAnexados}
          />
        </article>

        <aside className='aside_acciones_pdf'>

          <section className='section_imprimir'>
            <button className='print_button' disabled>
              <img src="/icons/icon-print.png" alt="Imprimir" height={'55px'} width={'61px'} />
            </button>

            <h4>❌Imprimir</h4>
          </section>

          <section className="section_descargar_word">
            <WordTemplate
              datosEncabezado={datosEncabezado}
              decretosAnexados={decretosAnexados}
              activarBoton={salir}
            />

            <h4>Descargar Word</h4>

          </section>

          <section className='section_warning'>
            <span>
              <b>Aviso:</b> Una vez confirmada la información, no se podrán realizar más modificaciones.
            </span>
          </section>

          <footer className='footer_redaccion_container'
            style={{ width: '92%' }}
          >
            <Button
              variant="outlined"
              size='large'
              onClick={() => handlePage(2)}
              style={{ marginRight: '4.9%' }}
              disabled={salir}
            >Volver</Button>

            {
              !salir
                ? (
                  <Button
                    variant="contained"
                    size='large'
                    onClick={handleSubmitData}

                  // disabled
                  >Confirmar</Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="warning"
                    size='large'
                    onClick={() => window.location.reload()}
                  >Salir</Button>
                )
            }
          </footer>

        </aside>

      </section>
    </>
  )
}
