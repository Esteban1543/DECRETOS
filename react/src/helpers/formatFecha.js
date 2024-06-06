//🔸 Función que formatea la fecha actual para mayor estilización en UI
export const format_fecha = () => {
  const mesesDelAño = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const fecha_Actual = new Date().toISOString().split("T")[0];
  const datos_fecha = fecha_Actual.split("-"); // <-- YYYY-MM-DD
  // console.log(fecha_Actual)
  const mes_nombre = parseInt(datos_fecha[1]) - 1;
  return `${datos_fecha[2]} de ${mesesDelAño[mes_nombre]} de ${datos_fecha[0]}`;
};