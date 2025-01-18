
export const formatNumeracionDecretos = (numero: number) => {

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