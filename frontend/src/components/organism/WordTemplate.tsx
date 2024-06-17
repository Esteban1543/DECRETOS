
import React from 'react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, ImageRun } from 'docx';
import { DecretoType, DatosEncabezadoType, InputDataDecretoType } from '../../helpers/Types';
import { fetchImageAsArrayBuffer } from '../../helpers/funcionesPlantillaWord';
import { numeracionDecretos } from '../../helpers/formatNumeracion';
const imageBuffer = await fetchImageAsArrayBuffer('/images/Logo-Republica.png');


interface WordTemplateProps {
  datosEncabezado: DatosEncabezadoType,
  decretosAnexados: DecretoType[]
}


const WordTemplate: React.FC<WordTemplateProps> = ({ datosEncabezado, decretosAnexados }) => {

  // console.log(datosEncabezado, decretosAnexados)

  // const setearDescripcionDecreto = (desc: string, dataInputs: InputDataDecretoType) => {
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
    // const descripcion_con_datos = setearDescripcionDecreto(decretosAnexados, datosEncabezado.demandado); //Para modular funcion

    return new Paragraph({
      children: [
        new TextRun({
          text: `${numeracionDecretos(index + 1)}: ${descripcion_con_datos.slice(0, 33)}`,
          bold: true,
          // break: 1
        }),

        new TextRun(descripcion_con_datos.slice(33,)),
      ],
      spacing: {
        line: 1.5 * 12 * 20,
        after: 300
      }
    });
  });


  const generateDocument = async () => {

    const doc = new Document({
      creator: 'Digitador x',
      title: 'Acta de Embargo',
      background: {
        color: "FFFFFF",
      },
      styles: {
        default: {

          title: {
            run: {
              size: "13.5pt",
              bold: true,
              color: "000000",
            },
            // paragraph: {
            //   spacing: {
            //     before: 10
            //   }
            // }
          },
          heading1: {
            run: {
              // size: "13pt",
              bold: true,
            },
            paragraph: {
              spacing: {
                after: 120,
              },
            },
          },
          listParagraph: {
            run: {
              color: "#FF0000",
            },
          },
          document: {
            run: {
              size: "12pt",
              font: "Arial",

            },
            paragraph: {
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                before: 240,
                after: 120,
                // line: 1.5 * 12 * 20,
              },
            },
          },
        },
      },

      sections: [
        {
          properties: {},
          children: [
            // Título Principal 📌
            new Paragraph({
              text: "República de Colombia",
              children: [
                new TextRun({
                  text: "Rama Judicial del Poder Público",
                  break: 1
                }),
              ],
              alignment: AlignmentType.CENTER,
              heading: HeadingLevel.TITLE
            }),

            // Espacio para Logo 📌
            new Paragraph({
              children: [
                new ImageRun({
                  data: imageBuffer,
                  transformation: {
                    width: 100,
                    height: 100,
                  },
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),

            //Juzgado Emitente 📌
            new Paragraph({
              text: "Juzgado Ochenta y Tres (83) Municipal de Pequeñas Causas y Competencia Múltiple de Bogotá D.C.",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 240,
              }
            }),

            // Ciudad y Fecha 📌
            new Paragraph({
              text: "Bogotá D.C., dieciséis (16) de junio de dos mil veinticuatro (2024).",
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
            }),

            //Datos Encabezado 📌
            new Paragraph({
              children: [
                new TextRun({
                  text: `Origen: \t\t ${datosEncabezado.origen}`,
                  break: 1
                }),

                new TextRun({
                  text: `Radicación: \t ${datosEncabezado.radicado}`,
                  break: 1
                }),

                new TextRun({
                  text: `Demandante: \t ${datosEncabezado.demandante}`,
                  break: 1
                }),

                new TextRun({
                  text: `Demandado: \t ${datosEncabezado.demandado}`,
                  break: 1
                }),

                new TextRun({
                  text: `Proceso: \t\t ${datosEncabezado.proceso}`,
                  break: 1
                }),
              ],

              alignment: AlignmentType.LEFT,
              heading: HeadingLevel.HEADING_1,
              indent: {
                left: 720,
                right: 720,
              }

            }),

            //Texto Inicial 📌
            new Paragraph({
              children: [
                new TextRun({
                  text: "El juzgado, atendiendo la solicitud cautelar que precede, por estimarlas procedentes",
                  break: 1
                }),
                new TextRun({
                  text: " ",
                  break: 1
                }),
                new TextRun({
                  text: "DISPONE:",
                  break: 1,
                  bold: true,
                }),
                new TextRun({
                  text: " ",
                  break: 1
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: {
                line: 1.5 * 12 * 20,
              }
            }),

            //Decretos 📌
            ...parrafos_decretosAnexados,

            // Conclusión 📌
            new Paragraph({
              children: [
                new TextRun({
                  text: "-NOTIFÍQUESE-",
                  break: 1
                }),
                new TextRun({
                  text: "MANUELA GÓMEZ ÁNGEL RANGEL",
                  break: 1
                }),
                new TextRun({
                  text: "Juez",
                  break: 1
                }),
              ],
              alignment: AlignmentType.CENTER,
              heading: HeadingLevel.HEADING_1
            }),


          ],
        },
      ],
    });


    try {
      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'documento.docx');
    } catch (error) {
      console.error("Error al generar el documento:", error);
      alert('Error al generar el documento ❌');
    }

  };


  return (
    // <div>
    //   <button onClick={generateDocument}>Generar Documento</button>
    // </div>
    <button
      className='word_button'
      onClick={generateDocument}
    >
      <img src="/icons/word.svg" alt="Archivo Word" height={'55px'} width={'61px'} />
    </button>
  );
};

export default WordTemplate;