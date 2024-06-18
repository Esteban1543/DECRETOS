import { useEffect, useState } from "react";
import '../../assets/styles/Redaccion.css';
import { DecretoType } from "../../helpers/Types";

// Componentes TSX 📚
import Steper from "../organism/Steper";
import RedaccionEncabezado from "../organism/RedaccionEncabezado";
import RedaccionDecretos from "../organism/RedaccionDecretos";
import RedaccionPrevPDF from "../organism/RedaccionPrevPDF";


interface SeccionRedaccionActasProps {
  id_digitador: number
}


export default function SeccionRedaccionActas({ id_digitador }: SeccionRedaccionActasProps) {

  //🔸 Administrar la página que se necesita mostrar
  const [pagina, setPagina] = useState(1);
  const handlePage = (page: number) => setPagina(page);

  //🔸 Estado para Datos de Encabezado (formulario)
  // const estado_inicial = {
  //   juzgado: 'Juzgado Ochenta y Tres (83) Civil Municipal de Bogotá D.C. Transitorio Sesenta y Cinco (65) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.',
  //   juez: 'MANUELA GÓMEZ ÁNGEL RANGEL',
  //   ciudad: 'Bogotá D.C.',
  //   origen: 'Juzgado Primero Municipal de Pequeñas Causas Civiles y Competencia Múltiple de Tunja',
  //   radicado: '123131321',
  //   demandante: 'NOMBRE DEMANDANTE',
  //   demandado: 'NOMBRE DEMANDADO',
  //   proceso: 'EJECUTIVO DE MÍNIMA CUANTÍA',
  //   cod_folio: '123131'
  // }
  const estado_inicial = {
    juzgado: '',
    juez: 'MANUELA GÓMEZ ÁNGEL RANGEL',
    ciudad: '',
    origen: '',
    radicado: '',
    demandante: '',
    demandado: '',
    proceso: '',
    cod_folio: ''
  }
  const [datosEncabezado, setDatosEncabezado] = useState(estado_inicial);

  //🔸 Estado para almacenar los decretos que se anexan
  const [decretosAnexados, setDecretosAnexados] = useState<DecretoType[]>([]);


  // useEffect(() => {
  //   // console.log(datosEncabezado);
  //   // console.log(id_digitador)
  //   console.log('decretosAnexados ', decretosAnexados)
  // }, [datosEncabezado, id_digitador, decretosAnexados]);

  // const handleSubmit = () => {
  //   console.log({ id_digitador, datosEncabezado, decretosAnexados });
  // }

  return (
    <article className="container_facturacion">

      <header className="header_facturacion">
        <span className="header_title">Redacción de Acta</span>
        <Steper pagina={pagina} />
      </header>

      <section className="facturacion_card">
        <article className="section_facturacion_container">
          {
            pagina === 1
              ? <RedaccionEncabezado
                handlePage={handlePage}
                datosEncabezado={datosEncabezado}
                setDatosEncabezado={setDatosEncabezado}
              />
              : pagina === 2
                ?
                <RedaccionDecretos
                  nombre_demandado={datosEncabezado.demandado}
                  handlePage={handlePage}
                  decretosAnexados={decretosAnexados}
                  setDecretosAnexados={setDecretosAnexados}
                />
                : pagina === 3 &&
                <RedaccionPrevPDF
                  handlePage={handlePage}
                  datosEncabezado={datosEncabezado}
                  decretosAnexados={decretosAnexados}
                // fn_submit={handleSubmit}
                />
          }

          {/* <Toaster position="bottom-center" richColors /> */}
        </article>
      </section>
    </article>
  )
}