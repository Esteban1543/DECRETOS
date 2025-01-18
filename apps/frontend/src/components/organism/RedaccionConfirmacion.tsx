/* eslint-disable react/react-in-jsx-scope */

import HeaderRedaccion from "../atoms/HeaderRedaccion";
import Button from '@mui/material/Button';
import { DatosEncabezadoType, DecretoType } from "../../helpers/Types";
import WordTemplate from "./WordTemplate";
import PrevisualizacionActa from "./PrevisualizacionActa";
import { useState } from "react";
import DescargaPDF from "../atoms/DescargaPDF";

interface RedaccionPrevPDFProps {
  handlePage: (page: number) => void,
  datosEncabezado: DatosEncabezadoType,
  decretosAnexados: DecretoType[],
  fn_submit: (accion: string) => Promise<boolean>
}

export default function RedaccionPrevPDF({ handlePage, datosEncabezado, decretosAnexados, fn_submit }: RedaccionPrevPDFProps) {
  const [loading, setLoading] = useState(false);
  const [salir, setSalir] = useState(false);

  const handleSubmitData = async (accion: string) => {
    setLoading(true);
    const respuesta = await fn_submit(accion)
    respuesta ? setSalir(true) : setSalir(false);
    setLoading(false);
  }

  return (
    <>
      <HeaderRedaccion titulo='Confirmar Acta' />

      <section className='container_factura_pdf'>

        <article className='container_prev_pdf'>
          <PrevisualizacionActa
            datosEncabezado={datosEncabezado}
            decretosAnexados={decretosAnexados}
          />
        </article>

        <aside className='aside_acciones_pdf'>

          <section className='section_imprimir'>
            <DescargaPDF
              datosEncabezado={datosEncabezado}
              decretosAnexados={decretosAnexados}
              activarBoton={salir}
            />
            <h4>Descargar PDF</h4>
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
            {
              !salir &&
              <Button
                variant="outlined"
                size='large'
                onClick={() => handlePage(2)}
                style={{ marginRight: '4.9%', borderColor: 'var(--color-azul-deep2)', color: 'var(--color-azul-deep2)' }}
                disabled={salir}
              >Atrás</Button>
            }

            {
              !salir
                ? (
                  <Button
                    variant="contained"
                    size='large'
                    onClick={() => handleSubmitData('enviar')}
                    style={!loading ? { background: 'var(--color-azul-deep2)' } : undefined}
                    disabled={loading}
                  >{!loading ? 'Confirmar' : 'Cargando..'}</Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="warning"
                    size='large'
                    // onClick={() => handlePage(2)}
                    onClick={() => handleSubmitData('resetear')}
                    style={{ width: '96%', marginLeft: 'auto' }}
                  >Salir</Button>
                )
            }
          </footer>

        </aside>

      </section>
    </>
  )
}
