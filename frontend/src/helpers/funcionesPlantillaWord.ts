
/*
  Función para Formatear la descripcion del Decreto,
  con los Datos de los Inputs📌
*/
import { InputDataDecretoType } from "./Types.ts";

export const setearDescripcionDecreto = (desc: string, dataInputs: InputDataDecretoType, demandado: string) => {

  //🔸 Setear el nombre del DEMANDADO en los decretos
  const desc_demandado = desc.replace("°##", demandado || '--DATO SIN DILIGENCIAR--');

  //🔸 Setear los datos de los inputs en los decretos
  let result = desc_demandado;

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