export const numeroLetras = (numero: number) => {

  const numerosLetras: { [key: number]: string } = {
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

  return numerosLetras[numero] || "Número fuera de rango";
};

export const numeracionDecretos = (numero: number) => {

  const numerosLetras: { [key: number]: string } = {
    1: "PRIMERO",
    2: "SEGUNDO",
    3: "TERCERO",
    4: "CUARTO",
    5: "QUINTO",
    6: "SEXTO",
    7: "SEPTIMO",
    8: "OCTAVO",
    9: "NOVENO",
    10: "DECIMO"
  };

  return numerosLetras[numero] || "Número fuera de rango";
}