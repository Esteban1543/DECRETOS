
/*
Función para Formatear la descripcion del Decreto con los Datos de los Inputs
*/
// import { DecretoType } from "./Types";
// export const setearDescripcionDecreto = (desc: string, dataInputs: object) => {
//   export const setearDescripcionDecreto = (datos: DecretoType, demandado: string) => {

//     const {descripcion, dataInputs} = datos;
//   //🔸 Setear el nombre del DEMANDADO en los decretos
//   const desc_demandado = descripcion.replace("°##", demandado || '_____________');

//   //🔸 Setear los datos de los inputs en los decretos
//   let result = desc_demandado;
//   Object.values(dataInputs).forEach(value => {
//     result = result.replace('°', value);
//   });

  
//   return result;
// }


/*
Función para insertar la imagen en el documento Word (Buffer)
*/
export const fetchImageAsArrayBuffer = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return await blob.arrayBuffer();
};