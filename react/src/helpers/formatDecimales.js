
//🔸 Formatear cero a la izquierda en cifras menores a 10
export const formatDecimales = (length) => {
  return length < 10 ? `0${length}` : length
}