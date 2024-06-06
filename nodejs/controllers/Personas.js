const conexion = require("../conection/conexion.js");
const bycrypt = require('bcrypt')

const Usuarios = (req, res) => {
    conexion.query(
      `
              SELECT u.alias, dp.*, z.zona
              FROM usuarios u
              INNER JOIN datos_persona dp ON pfk_usuario = id_persona
              INNER JOIN zonas_ventas z ON id_zona = fk_zona_venta
              ORDER BY id_persona DESC;
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
          message: "✔️ Usuarios",
          data: results,
        });
      }
    );
};

const Clientes = (req, res) => {
    conexion.query(
      `
          SELECT datos_persona.*, zona
          FROM datos_persona 
          INNER JOIN zonas_ventas ON id_zona = fk_zona_venta
          WHERE fk_tipo_persona = 1
          ORDER BY id_persona DESC;
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
          message: "✔️ Clientes",
          data: results,
        });
      }
    );
};

const ZonaVentas = (req, res) => {
    conexion.query(
      `
          SELECT *
          FROM zonas_ventas;
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
          message: "✔️ Zona ventas",
          data: results,
        });
      }
    );
};

const TipoIdentificacion = (req, res) => {
    conexion.query(
      `
          SELECT *
          FROM tipo_identificacion;
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
          message: "✔️ Tipo identificacion",
          data: results,
        });
      }
    );
};

const CrearUsuario = (req, res) => {
    const validations = {
      fk_tipo_identificacion: /^[a-zA-Z]{2,4}$/,
      n_identificacion: /^[0-9]{0,14}$/,
      nombres: /^[a-zA-Z]+(\s[a-zA-Z]+)*$/,
      apellidos: /^[a-zA-Z]+(\s[a-zA-Z]+)*$/,
      telefono: /^[0-9]{1,14}$/,
      direccion: /^.+$/,
      correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      fk_zona_venta: /^[a-zA-Z0-9]{4}$/,
      alias: /^[a-zA-Z0-9 ]*$/,
      contraseña: /^(?!\s)(?=\S*[0-9])(?=\S*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])\S{2,}$/,
    };
  
    const {
      fk_tipo_identificacion,
      n_identificacion,
      nombres,
      apellidos,
      telefono,
      direccion,
      correo,
      fk_zona_venta,
      alias,
      contraseña,
    } = req.body;
  
    const [nombre_1, nombre_2] = nombres.split(" ");
    const [apellido_1, apellido_2] = apellidos.split(" ");
  
    if (
      validations.fk_tipo_identificacion.test(fk_tipo_identificacion) &&
      validations.n_identificacion.test(n_identificacion) &&
      validations.nombres.test(nombre_1) &&
      validations.nombres.test(nombre_2) &&
      validations.apellidos.test(apellido_1) &&
      validations.apellidos.test(apellido_2) &&
      validations.telefono.test(telefono) &&
      validations.direccion.test(direccion) &&
      validations.correo.test(correo) &&
      validations.fk_zona_venta.test(fk_zona_venta) &&
      validations.alias.test(alias) &&
      validations.contraseña.test(contraseña)
    ) {
      conexion.query(
        `
              INSERT INTO datos_persona SET ?
          `,
        {
          fk_tipo_identificacion: fk_tipo_identificacion,
          n_identificacion: n_identificacion,
          nombre_1: nombre_1,
          nombre_2: nombre_2,
          apellido_1: apellido_1,
          apellido_2: apellido_2,
          telefono: telefono,
          direccion: direccion,
          correo: correo,
          fk_tipo_persona: 2,
          fk_zona_venta: fk_zona_venta,
          estado_persona: 1
        },
        function (err, results) {
          if (err) {
            return res.json({
              status: false,
              error: "⛔ No fue posible completar la query (Query 1)",
              type: err,
            });
          }
  
          conexion.query(
            `
                      SELECT id_persona 
                      FROM datos_persona 
                      WHERE n_identificacion = ?
              `,
            [n_identificacion],
            function (err, results) {
              if (err) {
                return res.json({
                  status: false,
                  error: "⛔ No fue posible completar la query (Query 2)",
                  type: err,
                });
              }
  
              const hash = bycrypt.hashSync(contraseña, 10);
  
              conexion.query(
                `
                      INSERT INTO usuarios SET ?
                  `,
                {
                  pfk_usuario: results[0].id_persona,
                  alias: alias,
                  contraseña: hash,
                  rol: 2,
                },
                function (err, results) {
                  if (err) {
                    return res.json({
                      status: false,
                      error: "⛔ No fue posible completar la query (Query 3)",
                      type: err,
                    });
                  }
  
                  return res.json({
                    status: true,
                    message: "✅ Se creo el usuario correctamente",
                  });
                }
              );
            }
          );
        }
      );
    } else {
      res.json({
        status: false,
        error: "⛔ Los datos ingresados no son validos",
      });
    }
};

const CrearCliente = (req, res) => {
    const validations = {
      fk_tipo_identificacion: /^[a-zA-Z]{2,4}$/,
      n_identificacion: /^[0-9]{0,14}$/,
      nombres: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+(\s[a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*$/,
      apellidos: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+(\s[a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*$/,
      telefono: /^[0-9]{1,14}$/,
      direccion: /^.+$/,
      correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      fk_zona_venta: /^[a-zA-Z0-9]{4}$/,
    };
  
    const {
      fk_tipo_identificacion,
      n_identificacion,
      nombres,
      apellidos,
      telefono,
      direccion,
      correo,
      fk_zona_venta,
    } = req.body;
  
    const [nombre_1, nombre_2] = nombres.split(" ");
    const [apellido_1, apellido_2] = apellidos.split(" ");
  
    if (
      validations.fk_tipo_identificacion.test(fk_tipo_identificacion) &&
      validations.n_identificacion.test(n_identificacion) &&
      validations.nombres.test(nombre_1) &&
      validations.nombres.test(nombre_2) &&
      validations.apellidos.test(apellido_1) &&
      validations.apellidos.test(apellido_2) &&
      validations.telefono.test(telefono) &&
      validations.direccion.test(direccion) &&
      validations.correo.test(correo) &&
      validations.fk_zona_venta.test(fk_zona_venta)
    ) {
      conexion.query(
        `
              INSERT INTO datos_persona SET ?
          `,
        {
          fk_tipo_identificacion: fk_tipo_identificacion,
          n_identificacion: n_identificacion,
          nombre_1: nombre_1,
          nombre_2: nombre_2,
          apellido_1: apellido_1,
          apellido_2: apellido_2,
          telefono: telefono,
          direccion: direccion,
          correo: correo,
          fk_tipo_persona: 1,
          fk_zona_venta: fk_zona_venta,
          estado_persona: 1
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
            message: "✅ Se creo el cliente correctamente",
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

const EditarCliente = (req, res) => {
    const validations = {
      fk_tipo_identificacion: /^[a-zA-Z]{2,4}$/,
      n_identificacion: /^[0-9]{0,14}$/,
      nombres: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+(\s[a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*$/,
      apellidos: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+(\s[a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*$/,
      telefono: /^[0-9]{1,14}$/,
      direccion: /^.+$/,
      correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      fk_zona_venta: /^[a-zA-Z0-9]{4}$/,
    };
  
    const {
      fk_tipo_identificacion,
      n_identificacion,
      nombres,
      apellidos,
      telefono,
      direccion,
      correo,
      fk_zona_venta,
    } = req.body;
  
    const [nombre_1, nombre_2] = nombres.split(" ");
    const [apellido_1, apellido_2] = apellidos.split(" ");
  
    if (
      validations.fk_tipo_identificacion.test(fk_tipo_identificacion) &&
      validations.n_identificacion.test(n_identificacion) &&
      validations.nombres.test(nombre_1) &&
      validations.nombres.test(nombre_2) &&
      validations.apellidos.test(apellido_1) &&
      validations.apellidos.test(apellido_2) &&
      validations.telefono.test(telefono) &&
      validations.direccion.test(direccion) &&
      validations.correo.test(correo) &&
      validations.fk_zona_venta.test(fk_zona_venta)
    ) {
      conexion.query(
        `
              UPDATE datos_persona
              SET 
                  fk_tipo_identificacion = ?,
                  nombre_1 = ?,
                  nombre_2 = ?,
                  apellido_1 = ?,
                  apellido_2 = ?,
                  telefono = ?,
                  direccion = ?,
                  correo = ?,
                  fk_tipo_persona = ?,
                  fk_zona_venta = ?,
                  estado_persona = 1
              WHERE
                  n_identificacion = ?;
          `,
        [
          fk_tipo_identificacion,
          nombre_1,
          nombre_2,
          apellido_1,
          apellido_2,
          telefono,
          direccion,
          correo,
          1,
          fk_zona_venta,
          n_identificacion,
        ],
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
            message: "✅ Se edito el cliente correctamente",
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

const BuscarClienteIdentificacion = (req, res) => {
    const validations = {
      identificacion: /^\d+$/,
    };
  
    const { id } = req.body;
  
    if (validations.identificacion.test(id)) {
      conexion.query(
        `
              SELECT * FROM datos_persona 
              WHERE n_identificacion = ? AND fk_tipo_persona = 1;
          `,
        [id],
        function (err, results) {
          if (err) {
            return res.json({
              status: false,
              error: "⛔ No fue posible completar la query",
              type: err,
            });
          }
  
          if (results.length === 0) {
            return res.json({
              status: false,
              error: "⛔ No se encontro cliente",
            });
          }
  
          res.json({
            status: true,
            message: "✅ Se encontro el cliente",
            data: results,
          });
        }
      );
    } else {
      res.json({
        status: false,
        error: "⛔ Los datos ingresados no son validos",
      });
    }
};

const BuscarClienteNombre = (req, res) => {
    const validations = {
      noVacio: /^.+$/,
    };
  
    const { nombres, apellidos } = req.body;
  
    const [nombre_1, nombre_2] = nombres.split(" ");
    const [apellido_1, apellido_2] = apellidos.split(" ");
  
    console.log(nombre_1, nombre_2, apellido_1, apellido_2)
  
    if (
      validations.noVacio.test(nombres) &&
      validations.noVacio.test(apellidos)
    ) {
  
      conexion.query(`
          SELECT * FROM datos_persona 
          WHERE 
            ${nombre_1 === undefined ? 'nombre_1 IS NULL' : `nombre_1 = '${nombre_1}'`} AND 
            ${nombre_2 === undefined ? 'nombre_2 IS NULL' : `nombre_1 = '${nombre_2}'`} AND 
            ${apellido_1 === undefined ? 'apellido_1 IS NULL' : `apellido_1 = '${apellido_1}'`} AND 
            ${apellido_2 === undefined ? 'apellido_2 IS NULL' : `apellido_1 = '${apellido_2}'`} AND 
            fk_tipo_persona = 1;
        `,
        function (err, results) {
          if (err) {
            return res.json({
              status: false,
              error: "⛔ No fue posible completar la query",
              type: err,
            });
          }
  
          if (results.length === 0) {
            return res.json({
              status: false,
              error: "⛔ No se encontro cliente",
            });
          }
  
          res.json({
            status: true,
            message: "✅ Se encontro el cliente",
            data: results,
          });
        }
      );
    } else {
      res.json({
        status: false,
        error: "⛔ Los datos ingresados no son validos",
      });
    }
};

const BorrarPersona = (req, res) => {
  const { id_persona } = req.params;

  if(id_persona.length > 0){
    conexion.query(`
        UPDATE datos_persona 
        SET estado_persona = 0
        WHERE n_identificacion = ?;
    `, [id_persona], function(err, results){
      if (err) {
        return res.json({
          status: false,
          error: "⛔ No fue posible completar la query",
          type: err,
        });
      }

      return res.json({
        status: true,
        message: "✅ Se borro persona",
      });
    })
  }else{
    return res.json({
      status: false,
      error: "⛔ No se puedo activar persona"
    });
  }
}

const ActivarPersona = (req, res) => {
  const { id_persona } = req.params;

  if(id_persona.length > 0){
    conexion.query(`
        UPDATE datos_persona 
        SET estado_persona = 1
        WHERE n_identificacion = ?;
    `, [id_persona], function(err, results){
      if (err) {
        return res.json({
          status: false,
          error: "⛔ No fue posible completar la query",
          type: err,
        });
      }

      return res.json({
        status: true,
        message: "✅ Se borro persona",
      });
    })
  }else{
    return res.json({
      status: false,
      error: "⛔ No se puedo activar persona"
    });
  }
}

module.exports = {
    Usuarios,
    Clientes,
    ZonaVentas,
    TipoIdentificacion,
    CrearUsuario,
    CrearCliente,
    EditarCliente,
    BuscarClienteIdentificacion,
    BuscarClienteNombre,
    BorrarPersona,
    ActivarPersona
}

