import React from 'react';
import { DatosEncabezadoType, DecretoType } from '../../helpers/Types';
import { numeracionDecretos } from '../../helpers/formatNumeracion';
const logoSrc = "/images/Logo-Republica.png";

interface PrevisualizacionActaProps {
  datosEncabezado: DatosEncabezadoType,
  decretosAnexados: DecretoType[]
}

const PrevisualizacionActa: React.FC<PrevisualizacionActaProps> = ({ datosEncabezado, decretosAnexados }) => {
  console.log(datosEncabezado, decretosAnexados)

  const setearDescripcionDecreto = (desc: string, dataInputs: object) => {

    //🔸 Setear el nombre del DEMANDADO en los decretos
    const desc_demandado = desc.replace("°##", datosEncabezado.demandado || '_____________');

    //🔸 Setear los datos de los inputs en los decretos
    let result = desc_demandado;
    Object.values(dataInputs).forEach(value => {
      result = result.replace('°', value);
    });
    return result;
  }

  const parrafos_decretosAnexados = decretosAnexados.map((decreto, index) => {

    const descripcion_con_datos = setearDescripcionDecreto(decreto.descripcion, decreto?.dataInputs);
    return descripcion_con_datos
  })


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
        <h4>Juzgado Ochenta y Tres (83) Municipal de Pequeñas Causas y Competencia Múltiple de Bogotá D.C.</h4>
      </section>

      {/* Ciudad y Fecha 📌 */}
      <section style={{ textAlign: 'center', marginBottom: '4%', fontSize: '1.08rem' }}>
        <h5>Bogotá D.C., dieciséis (16) de junio de dos mil veinticuatro (2024).</h5>
      </section>

      {/* Datos Encabezado 📌 */}
      <section style={{ marginLeft: '60px', marginRight: '60px' }}>
        <h4>Origen: {datosEncabezado.origen}</h4>
        <h4>Radicación: {datosEncabezado.radicado}</h4>
        <h4>Demandante: {datosEncabezado.demandante}</h4>
        <h4>Demandado: {datosEncabezado.demandado}</h4>
        <h4>Proceso: {datosEncabezado.proceso}</h4>
      </section>

      {/* Texto Inicial 📌 */}
      <section style={{ textAlign: 'center', lineHeight: '1.5' }}>
        <p>El juzgado, atendiendo la solicitud cautelar que precede, por estimarlas procedentes</p>
        {/* <p>&nbsp;</p> */}
        <p><strong>DISPONE:</strong></p>
        {/* <p>&nbsp;</p> */}
      </section>

      <section>
        {
          parrafos_decretosAnexados.map((m, i) => (
            <p className='p_decretos'>
              <b>{numeracionDecretos(i + 1)}: {m.slice(0, 33)}</b>
              {m.slice(33,)}
            </p>
          ))
        }
      </section>

      {/* Conclusión 📌 */}
      <footer style={{ textAlign: 'center' }}>
        <h5>-NOTIFÍQUESE-</h5>
        <br /><br />
        <h5>________________________________</h5>
        <h5>MANUELA GÓMEZ ÁNGEL RANGEL</h5>
        <h5>Juez</h5>
      </footer>

    </article>
  );
};

export default PrevisualizacionActa;