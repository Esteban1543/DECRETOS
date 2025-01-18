
/*
♨️ Datos para setear información de Fechas 
*/
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

const diasLetras: { [key: number]: string } = {
  1: "uno",
  2: "dos",
  3: "tres",
  4: "cuatro",
  5: "cinco",
  6: "seis",
  7: "siete",
  8: "ocho",
  9: "nueve",
  10: "diez",
  11: "once",
  12: "doce",
  13: "trece",
  14: "catorce",
  15: "quince",
  16: "dieciséis",
  17: "diecisiete",
  18: "dieciocho",
  19: "diecinueve",
  20: "veinte",
  21: "veintiuno",
  22: "veintidós",
  23: "veintitrés",
  24: "veinticuatro",
  25: "veinticinco",
  26: "veintiséis",
  27: "veintisiete",
  28: "veintiocho",
  29: "veintinueve",
  30: "treinta",
  31: "treinta y uno"
};

// Fecha Pc📌
const fecha_GMT = new Date();
fecha_GMT.setHours(fecha_GMT.getHours() - 5); //Ajuste a Zona Horaria Colombiana

const fecha_Actual = fecha_GMT.toISOString().split('T')[0];
const datos_fecha = fecha_Actual.split("-"); // <-- AAAA-MM-DD
const mes_nombre = parseInt(datos_fecha[1]) - 1;

/*
♨️ Función que formatea la fecha actual para estilización en UI con formato: DD de MM de AAAA
*/

export const format_fecha = (): string => {
  return `${datos_fecha[2]} de ${mesesDelAño[mes_nombre]} de ${datos_fecha[0]}`;
};

/*
♨️ Función que formatea la fecha actual para el Acta con formato: dieciséis (DD) de junio de dos mil veinticuatro (AAAA).
*/

export const formatFechaActa = () => {
  const dia_number = parseInt(datos_fecha[2]);
  const anio_number = parseInt(datos_fecha[0].slice(2,));

  return `${diasLetras[dia_number]} (${datos_fecha[2]}) de ${mesesDelAño[mes_nombre]} de dos mil ${diasLetras[anio_number]} (${datos_fecha[0]}).`
};