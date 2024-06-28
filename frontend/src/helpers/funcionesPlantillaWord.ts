
/*
  Función para unificar la descripcion del Decreto,
  con los Datos ingresados de los Inputs 📌
*/
import { InputDataDecretoType } from "./Types.ts";

export const unificarParrafoDecreto = (desc: string, dataInputs: InputDataDecretoType, demandado: string) => {

  //🔸 Setear el nombre del DEMANDADO en los decretos
  const remover_signos_desc = desc.replace(/##/g, '');

  //🔸 Setear los datos de los inputs en los decretos
  let result = remover_signos_desc;

  Object.values(dataInputs).forEach(value => {
    result = result.replace('°', value?.toString() || '--DATO SIN DILIGENCIAR--');
  });

  return result;
}


/*
  Función para insertar la imagen 
  en el documento Word (Buffer) 📌
*/
export const fetchImageAsArrayBuffer = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return await blob.arrayBuffer();
};


/*
  Función para crear las filas 
  de la Tabla en Word para alinear
  los Datos del Encabezado 📌
*/
import { Paragraph, TextRun, TableRow, TableCell, WidthType, BorderStyle } from 'docx';

export function crearFila(label: string, value: string) {
  return new TableRow({
    children: [

      // Columna 1 📌
      new TableCell({
        width: {
          size: 25,
          type: WidthType.PERCENTAGE,
        },
        borders: {
          top: { style: BorderStyle.NONE, color: "ffffff" },
          bottom: { style: BorderStyle.NONE, color: "ffffff" },
          right: { style: BorderStyle.NONE, color: "ffffff" },
        },
        children: [
          new Paragraph({
            children: [new TextRun({ text: label + ':', bold: true })],
            spacing: {
              before: 50,
              after: 50,
            },
          }),
        ],
      }),

      // Columna 2 📌
      new TableCell({
        width: {
          size: 75,
          type: WidthType.PERCENTAGE,
        },
        borders: {
          top: { style: BorderStyle.NONE, color: "ffffff" },
          bottom: { style: BorderStyle.NONE, color: "ffffff" },
          left: { style: BorderStyle.NONE, color: "ffffff" },
        },
        children: [
          new Paragraph({
            children: [new TextRun({ text: value, bold: true })],
            spacing: {
              before: 50,
              after: 50,
            },
          }),
        ],
      }),
    ],
  });
}