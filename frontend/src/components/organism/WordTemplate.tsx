import { Tooltip } from '@mui/material';
import React from 'react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, ImageRun, Table, WidthType, BorderStyle } from 'docx';
import { DecretoType, DatosEncabezadoType } from '../../helpers/Types.ts';
import { fetchImageAsArrayBuffer, unificarParrafoDecreto, crearFila } from '../../helpers/funcionesPlantillaWord.ts';
import { formatNumeracionDecretos } from '../../helpers/formatNumeracion.ts';
import { formatFechaActa } from '../../helpers/formatFecha.ts';
const imageBuffer = await fetchImageAsArrayBuffer('/images/Logo-Republica.png');

interface WordTemplateProps {
  datosEncabezado: DatosEncabezadoType,
  decretosAnexados: DecretoType[],
  activarBoton: boolean
}


const WordTemplate: React.FC<WordTemplateProps> = ({ datosEncabezado, decretosAnexados, activarBoton }) => {

  /*
  🔸 Generar los parrafos necesarios según los decretos anexados
  */
  // const parrafos_decretosAnexados = decretosAnexados.flatMap((decreto, index) => {

  //   //🔸Verificacion en caso de que no llegasen los decretos
  //   if (!decreto.dataInputs) {
  //     return new Paragraph({
  //       text: "No hay Decretos anexados",
  //       alignment: AlignmentType.CENTER,
  //     });
  //   }

  //   //🔸 Unificar los datos de los inputs con el resto del decreto
  //   const descripcion_con_datos = unificarParrafoDecreto(decreto.descripcion, decreto?.dataInputs, datosEncabezado.demandado);

  //   //🔸 Formatear en parrafos las secciones de la ley que conlleva cada decreto
  //   const parrafos_leyes = decreto.leyes ? decreto.leyes.map((ley) =>
  //     new Paragraph({
  //       children: [
  //         new TextRun({
  //           text: ley.replace(/°##/g, datosEncabezado.demandado),
  //           // text: ley,
  //         }),
  //       ],
  //       spacing: {
  //         line: 1.5 * 12 * 20,
  //         after: 300,
  //       },
  //       alignment: AlignmentType.JUSTIFIED,
  //     })
  //   ) : [];

  //   return [
  //     new Paragraph({
  //       children: [
  //         new TextRun({
  //           text: `${formatNumeracionDecretos(index + 1)}: ${descripcion_con_datos.slice(0, 33)}`,
  //           bold: true,
  //         }),
  //         new TextRun({
  //           text: descripcion_con_datos.slice(33),
  //         }),
  //       ],
  //       spacing: {
  //         line: 1.5 * 12 * 20,
  //         after: 300,
  //       },
  //       alignment: AlignmentType.JUSTIFIED,
  //     }),
  //     ...parrafos_leyes
  //   ];
  // });

  // const parrafos_decretosAnexados = decretosAnexados.flatMap((decreto, index) => {

  //   //🔸Verificacion en caso de que no llegasen los decretos
  //   if (!decreto.dataInputs) {
  //     return new Paragraph({
  //       text: "No hay Datos para anexar",
  //       alignment: AlignmentType.CENTER,
  //     });
  //   }

  //   // console.log(decreto)
  //   const desc_demandado = decreto.descripcion.replace(/°##/g, datosEncabezado.demandado || '--DATO SIN DILIGENCIAR--');
  //   const separar_decreto = desc_demandado.split('°');
  //   console.log(separar_decreto)

  //   const datos_ingresados: Array<string> = []
  //   Object.values(decreto.dataInputs).forEach(input => {
  //     datos_ingresados.push(input.toString())
  //   })

  //   console.log(datos_ingresados)

  //   //🔸 Unificar los datos de los inputs con el resto del decreto
  //   const descripcion_con_datos = unificarParrafoDecreto(decreto.descripcion, decreto?.dataInputs, datosEncabezado.demandado);

  //   //🔸 Formatear en parrafos las secciones de la ley que conlleva cada decreto
  //   const parrafos_leyes = decreto.leyes ? decreto.leyes.map((ley) =>
  //     new Paragraph({
  //       children: [
  //         new TextRun({
  //           text: ley.replace(/°##/g, datosEncabezado.demandado),
  //           // text: ley,
  //         }),
  //       ],
  //       spacing: {
  //         line: 1.5 * 12 * 20,
  //         after: 300,
  //       },
  //       alignment: AlignmentType.JUSTIFIED,
  //     })
  //   ) : [];

  //   return [
  //     separar_decreto.flatMap( (m, i) => [
  //       new Paragraph({
  //         children: [
  //           new TextRun({
  //             text: `${formatNumeracionDecretos(index + 1)}: ${m.slice(0, 33)}`,
  //             bold: true,
  //           }),
  //           new TextRun({
  //             text: m,
  //           }),
  //           new TextRun({
  //             text: datos_ingresados[i],
  //             bold: true
  //           }),
  //         ],
  //         spacing: {
  //           line: 1.5 * 12 * 20,
  //           after: 300,
  //         },
  //         alignment: AlignmentType.JUSTIFIED,
  //       }),
  //     ])
  //     // new Paragraph({
  //     //   children: [
  //     //     new TextRun({
  //     //       text: `${formatNumeracionDecretos(index + 1)}: ${descripcion_con_datos.slice(0, 33)}`,
  //     //       bold: true,
  //     //     }),
  //     //     new TextRun({
  //     //       text: descripcion_con_datos.slice(33),
  //     //     }),
  //     //   ],
  //     //   spacing: {
  //     //     line: 1.5 * 12 * 20,
  //     //     after: 300,
  //     //   },
  //     //   alignment: AlignmentType.JUSTIFIED,
  //     // }),
  //     // ...parrafos_leyes
  //   ];
  // });

  const parrafos_decretosAnexados = decretosAnexados.flatMap((decreto, index) => {
    //🔸Verificacion en caso de que no llegasen los decretos
    if (!decreto.dataInputs) {
      return new Paragraph({
        text: `No hay Datos para anexar al Decreto ${decreto}`,
        alignment: AlignmentType.CENTER,
      });
    }

    //🔸 Preparar la descripción y los datos en arrays
    const desc_demandado = decreto.descripcion.slice(33,).replace(/°##/g, datosEncabezado.demandado || '--DATO SIN DILIGENCIAR--');
    const separar_decreto = desc_demandado.split('°');
    const datos_ingresados = Object.values(decreto.dataInputs).map(input => input.toString());
    // console.log(separar_decreto)
    // console.log(decreto.dataInputs)
    // console.log(datos_ingresados)
    //🔸 Unificar los datos de los inputs con el resto del decreto generando la negrilla correspondiente
    const combinedTextRuns = separar_decreto.map((m, i) => {
      const textRunParts = [
        new TextRun({
          text: m,
        })
      ];

      if (datos_ingresados[i]) {
        textRunParts.push(new TextRun({
          text: datos_ingresados[i],
          bold: true,
        }));
      }

      return textRunParts;
    }).flat(); // flat es para aplanar el array de arrays en un solo nivel de profundidad

    //🔸 Formatear en parrafos las secciones de la ley que conlleva cada decreto
    const parrafos_leyes = decreto.leyes ? decreto.leyes.map((ley) =>
      new Paragraph({
        children: [
          new TextRun({
            text: ley.replace(/°##/g, datosEncabezado.demandado),
            // text: ley,
          }),
        ],
        spacing: {
          line: 1.5 * 12 * 20,
          after: 300,
        },
        alignment: AlignmentType.JUSTIFIED,
      })
    ) : [];

    return [
      new Paragraph({
        children: [
          new TextRun({
            text: `${formatNumeracionDecretos(index + 1)}: ${decreto.descripcion.slice(0, 33)}`,
            bold: true,
          }),
          ...combinedTextRuns,
        ],
        spacing: {
          line: 1.5 * 12 * 20,
          after: 300,
        },
        alignment: AlignmentType.JUSTIFIED,
      }),
      ...parrafos_leyes
    ]
  });


  /*
  🔸 Crear tabla para alinear Datos Encabezado
  */
  const tabla_datosEncabezado = new Table({
    rows: [
      crearFila('Origen', datosEncabezado.origen),
      crearFila('Radicación', datosEncabezado.radicado),
      crearFila('Demandante', datosEncabezado.demandante),
      crearFila('Demandado', datosEncabezado.demandado),
      crearFila('Proceso', datosEncabezado.proceso),
    ],
    width: {
      size: 82,
      type: WidthType.PERCENTAGE,
    },
    alignment: AlignmentType.CENTER,
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
    },
  });


  /*
  🔸 Generar la estructura del dodumento Word
  */
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
          properties: {
            page: {
              size: {
                width: 12240, // 8.5 pulgadas en twips
                height: 20160 // 14 pulgadas en twips
              }
            }
          },
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
              spacing: {
                before: 50,
                after: 50,
              },
              alignment: AlignmentType.CENTER,
            }),

            //Juzgado Emitente 📌
            new Paragraph({
              text: datosEncabezado.juzgado,
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: {
                before: 50,
                after: 240,
              }
            }),

            // Ciudad y Fecha 📌
            new Paragraph({
              text: `${datosEncabezado.ciudad}, ${formatFechaActa()}`,
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: {
                before: 400,
                after: 600,
              },
            }),

            //Datos Encabezado 📌
            tabla_datosEncabezado,

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
                  // bold: true,
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
                  text: "NOTIFÍQUESE y CÚMPLASE,",
                  break: 1
                }),
                new TextRun({
                  text: `-${datosEncabezado.provincia}-`,
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
      saveAs(blob, `AutoDecretaMedida_${datosEncabezado.radicado}.docx`);
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