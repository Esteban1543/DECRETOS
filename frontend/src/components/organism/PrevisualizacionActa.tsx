import React from 'react';
import { DatosEncabezadoType, DecretoType } from '../../helpers/Types.ts';
import { formatNumeracionDecretos } from '../../helpers/formatNumeracion.ts';
import { generarArraysDeDatos } from '../../helpers/funcionesPlantillaWord.ts';
import { formatFechaActa } from '../../helpers/formatFecha.ts';
const logoSrc = "/images/Logo-Republica.png";

interface PrevisualizacionActaProps {
  datosEncabezado: DatosEncabezadoType,
  decretosAnexados: DecretoType[]
}

const PrevisualizacionActa: React.FC<PrevisualizacionActaProps> = ({ datosEncabezado, decretosAnexados }) => {

  //🔸 Función para devolver los decretos con sus datos anexados
  const parrafos_decretosAnexados = decretosAnexados.map((decreto) => {
    if (!decreto.dataInputs) return null

    // const descripcion_con_datos = unificarParrafoDecreto(decreto.descripcion, decreto?.dataInputs, datosEncabezado.demandado);
    const descripcion_con_datos = generarArraysDeDatos(decreto.descripcion, decreto?.dataInputs);
    return { descripcion_con_datos, leyes: decreto.leyes }
  })

  //🔸 Extraer nombre de Empresa para la segunda sección de Decreto Salario
  const nombre_empresa = decretosAnexados.find(f => f.tipo === 'Salario')?.dataInputs?.empresa;
  // console.log(nombre_empresa)

  return (
    <article
      className='container_prev_acta'
    >

      {/* Título Principal 📌 */}
      <header style={{ textAlign: 'center' }}>
        <h3>República de Colombia</h3>
        <h3>Rama Judicial del Poder Público</h3>
      </header>

      {/* Espacio para Logo 📌 */}
      <section style={{ textAlign: 'center' }}>
        <img src={logoSrc} alt="Logo" width="100" height="100" />
      </section>

      {/* Juzgado Emitente 📌 */}
      <section style={{ textAlign: 'center', marginBottom: '2%', width: '80%', marginInline: 'auto' }}>
        <h4>{datosEncabezado.juzgado}</h4>
      </section>

      {/* Ciudad y Fecha 📌 */}
      <section style={{ textAlign: 'center', marginBottom: '4%', fontSize: '1.08rem' }}>
        <h5>{datosEncabezado.ciudad}, {formatFechaActa()}</h5>
      </section>

      {/* Datos Encabezado 📌 */}
      <section
        style={{ marginLeft: '60px', marginRight: '60px', display: 'grid', gridTemplateColumns: '25% 75%' }}
      >
        <h4>Origen: </h4>
        <h4>{datosEncabezado.origen}</h4>
        <h4>Radicación: </h4>
        <h4>{datosEncabezado.radicado}</h4>
        <h4>Demandante: </h4>
        <h4>{datosEncabezado.demandante}</h4>
        <h4>Demandado: </h4>
        <h4>{datosEncabezado.demandado}</h4>
        <h4>Proceso: </h4>
        <h4>{datosEncabezado.proceso}</h4>
      </section>

      {/* Texto Inicial 📌 */}
      <section style={{ textAlign: 'center', lineHeight: '1.5' }}>
        <p style={{ textWrap: 'nowrap' }}>El juzgado, atendiendo la solicitud cautelar que precede, por estimarlas procedentes</p>
        {/* <p>&nbsp;</p> */}
        <p><strong>DISPONE:</strong></p>
        {/* <p>&nbsp;</p> */}
      </section>

      <section>
        {
          parrafos_decretosAnexados.map((m, i) => (
            <>
              <p
                className='p_decretos'
                key={i + '.decreto'}
              >
                <b>{formatNumeracionDecretos(i + 1)}: {m?.descripcion_con_datos.separar_decreto[0].slice(0, 33)}</b>
                {
                  m?.descripcion_con_datos.separar_decreto.map((dato, ii) => (
                    <>
                      {ii === 0 ? dato.slice(33,) : dato}
                      <b>
                        {m.descripcion_con_datos.datos_ingresados[ii]}
                      </b>
                    </>
                  ))
                }
              </p>

              {
                m?.leyes?.map((ley, index) => (
                  <p
                    key={index + 'ley'}
                    className='p_decretos'
                  >{ley.replace(/°##/g, datosEncabezado.demandado).replace('°#°', nombre_empresa || '_________________')}</p>
                ))
              }
            </>
          ))
        }
      </section>

      {/* Conclusión 📌 */}
      <footer style={{ textAlign: 'center' }}>
        <h5>NOTIFÍQUESE y CÚMPLASE,</h5>
        <h5>-{datosEncabezado.provincia}-</h5>
        <br /><br />
        <h5>________________________________</h5>
        <h5>{datosEncabezado.juez}</h5>
        <h5>Juez</h5>
      </footer>

    </article>
  );
};

export default PrevisualizacionActa;