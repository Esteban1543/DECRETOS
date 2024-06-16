
/*
♨️ Función que formatea la fecha actual para estilización en UI con formato: DD de MM de AAA
*/

export const format_fecha = (): string => {

  const mesesDelAño = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

  const fecha_Actual = new Date().toISOString().split("T")[0];
  const datos_fecha = fecha_Actual.split("-"); // <-- YYYY-MM-DD
  const mes_nombre = parseInt(datos_fecha[1]) - 1;


  return `${datos_fecha[2]} de ${mesesDelAño[mes_nombre]} de ${datos_fecha[0]}`;
};

// // formatFecha.ts
// export const format_fecha = (): string => {
//   const mesesDelAño = [
//     "Enero",
//     "Febrero",
//     "Marzo",
//     "Abril",
//     "Mayo",
//     "Junio",
//     "Julio",
//     "Agosto",
//     "Septiembre",
//     "Octubre",
//     "Noviembre",
//     "Diciembre"
//   ];

//   const fecha_Actual = new Date().toISOString().split("T")[0];
//   const datos_fecha = fecha_Actual.split("-"); // <-- YYYY-MM-DD
//   const mes_nombre = parseInt(datos_fecha[1]) - 1;

//   return `${datos_fecha[2]} de ${mesesDelAño[mes_nombre]} de ${datos_fecha[0]}`;
// };
