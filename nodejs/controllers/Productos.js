const conexion = require("../conection/conexion.js");

const Productos = (req, res) => {
    conexion.query(
      `
          SELECT * 
          FROM productos 
          ORDER BY cod_producto DESC;
      `,
      function (err, results) {
        if (err) {
          return res.json({
            status: false,
            error: "⛔ No fue posible completar la query",
            type: err,
          });
        }
  
        res.json({
          status: true,
          message: "✔️ Productos",
          data: results,
        });
      }
    );
};

const Categorias = (req, res) => {
    conexion.query(
      `
          SELECT *
          FROM categorias;
      `,
      function (err, results) {
        if (err) {
          return res.json({
            status: false,
            error: "⛔ No fue posible completar la query",
            type: err,
          });
        }
  
        res.json({
          status: true,
          message: "✔️ Categorias",
          data: results,
        });
      }
    );
};

const CrearProducto = (req, res) => {
    const validations = {
      fk_categoria: /^[a-zA-Z]{1,30}$/,
      nombre_producto: /^[a-zA-Z1-9 ]{1,45}$/,
      descripcion: /^\s*[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]{1,50}$/,
      precio_producto: /^[1-9][0-9]*$/,
    };
  
    const { fk_categoria, nombre_producto, descripcion, precio_producto } =
      req.body;
  
    if (
      validations.fk_categoria.test(fk_categoria) &&
      validations.nombre_producto.test(nombre_producto) &&
      validations.descripcion.test(descripcion) &&
      validations.precio_producto.test(precio_producto)
    ) {
      conexion.query(
        `
              INSERT INTO productos SET ?
          `,
        {
          fk_categoria: fk_categoria,
          nombre_producto: nombre_producto,
          descripcion: descripcion,
          precio_producto: precio_producto,
        },
        function (err, results) {
          if (err) {
            return res.json({
              status: false,
              error: "⛔ No fue posible completar la query (Query 1)",
              type: err,
            });
          }
  
          return res.json({
            status: true,
            message: "✅ Se creo el producto correctamente",
          });
        }
      );
    } else {
      return res.json({
        status: false,
        error: "⛔ Los datos ingresados no son validos",
      });
    }
};

module.exports = {
    Productos,
    Categorias,
    CrearProducto
}