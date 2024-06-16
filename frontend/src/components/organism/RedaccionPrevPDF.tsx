
import HeaderRedaccion from "../atoms/HeaderRedaccion";
import Button from '@mui/material/Button';
import { DatosEncabezadoType, DecretoType } from "../../helpers/Types";
// import Docx from "./Docx";
// import PDF1 from "./PDF1";
import WordTemplate from "./WordTemplate";

interface RedaccionPrevPDFProps {
  handlePage: (page: number) => void,
  datosEncabezado: DatosEncabezadoType,
  decretosAnexados: DecretoType[]
}

export default function RedaccionPrevPDF({ handlePage, datosEncabezado, decretosAnexados }: RedaccionPrevPDFProps) {

  // console.log(datosEncabezado, decretosAnexados)

  return (
    <>
      <HeaderRedaccion titulo='Confirmar Acta' />

      <section className='container_factura_pdf'>

        <article className='container_prev_pdf'>
          <section style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
            <h3>Pendiente...</h3>

            {/* <Docx/> */}
            {/* <PDF1/> */}
          </section>
        </article>

        <aside className='aside_acciones_pdf'>

          <section className='section_imprimir'>
            <button className='print_button' disabled>
              <img src="/icons/icon-print.png" alt="Imprimir" height={'55px'} width={'61px'} />
            </button>

            <h4>Imprimir</h4>
          </section>

          <section className="section_descargar_word">
            <WordTemplate
              datosEncabezado={datosEncabezado}
              decretosAnexados={decretosAnexados}
            />

            <h4>Descargar Word</h4>

          </section>

          <section className='section_otro_correo'>

          </section>

          <footer className='footer_redaccion_container'
            style={{width: '92%'}}
          >
            <Button
              variant="outlined"
              size='large'
              onClick={() => handlePage(2)}
              style={{marginRight: '4.9%'}}
            >Volver</Button>

            <Button
              variant="contained"
              size='large'
              onClick={() => handlePage(1)}
              disabled
            >Confirmar</Button>
          </footer>

        </aside>

      </section>
    </>
  )
}
