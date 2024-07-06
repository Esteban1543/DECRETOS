/* eslint-disable react/react-in-jsx-scope */
import '../../assets/styles/Redaccion.css';
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { DecretoType } from "../../helpers/Types";
import { URI } from '../../config.ts';
import { solicitudPost } from '../../helpers/solicitudPost.ts';

// Componentes 🧩
import Steper from "../organism/Steper";
import RedaccionEncabezado from "../organism/RedaccionEncabezado";
import RedaccionDecretos from "../organism/RedaccionDecretos";
import RedaccionConfirmacion from "../organism/RedaccionConfirmacion.tsx";

interface SeccionRedaccionActasProps {
  id_digitador?: number,
  correo_digitador: string,
  setContenido: React.Dispatch<React.SetStateAction<string>>,
  refetch: () => void
}


export default function SeccionRedaccionActas({ id_digitador, correo_digitador, setContenido, refetch }: SeccionRedaccionActasProps) {

  //🔸 Administrar la página que se necesita mostrar
  const [pagina, setPagina] = useState(1);
  const handlePage = (page: number) => setPagina(page);

  //🔸 Estado para Datos de Encabezado (formulario)
  const estado_inicial = {
    juzgado: '',
    juez: 'MANUELA GÓMEZ ÁNGEL RANGEL',
    ciudad: 'Tunja',
    origen: '',
    radicado: '2021-03',
    demandante: 'ROSALBA MENDOZA',
    demandado: 'OSCAR PLAZAS',
    proceso: '',
    provincia: '1'
  }
  const [datosEncabezado, setDatosEncabezado] = useState(estado_inicial);

  //🔸 Estado para almacenar los decretos que se anexan
  const [decretosAnexados, setDecretosAnexados] = useState<DecretoType[]>([]);

  //🔸 Envío de Datos API
  const handleSubmit = async (accion: string) => {

    if (accion === 'resetear') {
      setDatosEncabezado(estado_inicial);
      setDecretosAnexados([]);
      handlePage(1);
      refetch();
      return true
    }

    const datosActa = { id_digitador, correo_digitador, datosEncabezado, decretosAnexados }
    const response = await solicitudPost(`${URI}/createActa`, datosActa);
    // console.log(response);

    if (response && response.status) {
      toast.success(`La copia del acta con N° de Radicado: ${datosEncabezado.radicado}, se envío correctamente al correo.`);
      return true
    }

    toast.error(`
      El N° de Radicado: ${datosEncabezado.radicado} ya fue Registrado en la Base de Datos
      `);
    console.log(response);
    return false
  }

  return (
    <>

      <header className="header_contenido_digitador">
        <span className="header_title">Redacción de Acta</span>
        <Steper pagina={pagina} />
      </header>

      <section className="card_contenido_digitador">
        <article className="section_facturacion_container">
          {
            pagina === 1
              ? <RedaccionEncabezado
                handlePage={handlePage}
                datosEncabezado={datosEncabezado}
                setDatosEncabezado={setDatosEncabezado}
                setContenido={setContenido}
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
                <RedaccionConfirmacion
                  handlePage={handlePage}
                  datosEncabezado={datosEncabezado}
                  decretosAnexados={decretosAnexados}
                  fn_submit={handleSubmit}
                />
          }
        </article>
        <Toaster position="bottom-center" richColors closeButton />
      </section>
    </>
  )
}