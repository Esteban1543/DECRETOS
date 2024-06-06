/* 
  📌 Funcion para formatear los porcentajes
*/

export const formatPercents = (parte, total) => {
  // console.log(parte, total);

  if (total === 0) return 0;
  let porcentaje = Math.round((parseInt(parte) / parseInt(total)) * 100);
  return `${porcentaje}%`;
}