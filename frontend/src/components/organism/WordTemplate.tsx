import { Tooltip } from '@mui/material';
import React from 'react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, ImageRun } from 'docx';
import { DecretoType, DatosEncabezadoType } from '../../helpers/Types';
import { fetchImageAsArrayBuffer, setearDescripcionDecreto } from '../../helpers/funcionesPlantillaWord.ts';
import { formatNumeracionDecretos } from '../../helpers/formatNumeracion.ts';
import { formatFechaActa } from '../../helpers/formatFecha.ts';
const imageBuffer = await fetchImageAsArrayBuffer('/images/Logo-Republica.png');

interface WordTemplateProps {
  datosEncabezado: DatosEncabezadoType,
  decretosAnexados: DecretoType[],
  activarBoton: boolean
}


const WordTemplate: React.FC<WordTemplateProps> = ({ datosEncabezado, decretosAnexados, activarBoton }) => {

  //🔸 Generar los parrafos necesarios según los decretos anexados
  const parrafos_decretosAnexados = decretosAnexados.map((decreto, index) => {
    if (!decreto.dataInputs) return new Paragraph({
      text: "No hay Decretos anexados",
      alignment: AlignmentType.CENTER,
    });

    const descripcion_con_datos = setearDescripcionDecreto(decreto.descripcion, decreto?.dataInputs, datosEncabezado.demandado);

    return new Paragraph({
      children: [
        new TextRun({
          text: `${formatNumeracionDecretos(index + 1)}: ${descripcion_con_datos.slice(0, 33)}`,
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


  //🔸 Generar la estructura del dodumento Word
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
              text: datosEncabezado.juzgado,
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 240,
              }
            }),

            // Ciudad y Fecha 📌
            new Paragraph({
              text: `${datosEncabezado.ciudad}, ${formatFechaActa()}`,
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
                  text: "",
                  break: 1
                }),
                new TextRun({
                  text: "________________________________",
                  break: 1
                }),
                new TextRun({
                  text: datosEncabezado.juez,
                  break: 1
                }),
                new TextRun({
                  text: "Juez",
                  break: 1
                }),
              ],
              alignment: AlignmentType.CENTER,
              heading: HeadingLevel.HEADING_1,
              spacing: {
                line: 1.5 * 12 * 20,
              }
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
    <Tooltip
      title={!activarBoton && "Para descargar, debe confirma el documento"}
      placement="top"
    >
      <button
        className={activarBoton ? 'word_button word_button_active' : 'word_button'}
        onClick={generateDocument}
        disabled={!activarBoton}
        style={!activarBoton ? { opacity: '.5' } : undefined}
      >
        <img
          src="/icons/word.svg"
          alt="Archivo Word"
          height={'55px'}
          width={'61px'}
        />
      </button>
    </Tooltip>
  );
};

export default WordTemplate;