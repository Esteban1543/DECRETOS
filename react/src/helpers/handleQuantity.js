
//🔸 Manejo de cantidad seleccionada por productos
export const handleQuantity = (product, accion, listado) => {
  // console.log(product, accion)
  const search = listado.find(
    (f) => f.cod_producto === product.cod_producto
  );
  console.log("search ", search?.cantidad);

  if (search && accion === "sumar") search.cantidad++;
  else if (search?.cantidad > 0 && accion === "restar") search.cantidad--;
  else if (accion === "remover") search.cantidad = 0;

  return listado
};