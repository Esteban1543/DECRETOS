const conexion = require("../conection/conexion.js");
const bycrypt = require('bcrypt')

const Autentificiacion = (req, res) => {
    const validations = {
      user: /^[a-zA-Z0-9 ]*$/,
      password: /^(?!\s)(?=\S*[0-9])(?=\S*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])\S{2,}$/,
    };
  
    const { user, password } = req.body;
  
    if (validations.user.test(user) && validations.password.test(password)) {
      conexion.query(
        `
              SELECT * 
              FROM usuarios 
              WHERE alias = ?;
          `,
        [user],
        function (err, results) {
          if (err) {
            return res.json({
              status: false,
              error: "⛔ No fue posible completar la query",
              type: err,
            });
          }
  
          if (!results[0]) {
            return res.status(500).json({
              status: false,
              error: "⛔ La cuenta no esta creada",
            });
          }
  
          const passCompare = bycrypt.compareSync(
            password,
            results[0].contraseña
          );
  
          if (!passCompare) {
            return res.status(500).json({
              status: false,
              error: "⛔ Los credenciales no son correctas",
            });
          }
  
          const rol = results[0].rol;
  
          conexion.query(
            `
                  SELECT 
                    id_persona, 
                    fk_tipo_identificacion, 
                    n_identificacion, 
                    nombre_1, 
                    nombre_2, 
                    apellido_1, 
                    apellido_2, 
                    telefono, 
                    direccion, 
                    correo, 
                    fk_zona_venta, 
                    zona, 
                    alias,
                    estado_persona
                  FROM datos_persona
                  INNER JOIN zonas_ventas ON fk_zona_venta = id_zona
                  INNER JOIN usuarios ON id_persona = pfk_usuario
                  WHERE pfk_usuario = ?;
              `,
            [results[0].pfk_usuario],
            function (err, results) {
              if (err) {
                return res.json({
                  status: false,
                  error: "⛔ No fue posible completar la query",
                  type: err,
                });
              }

              if(results[0].estado_persona == '0'){
                return res.json({
                  status: false,
                  error: "⛔ El usuario esta desactivado",
                  type: err,
                });
              }
  
              return res.json({
                status: true,
                message: "✅ Se verifico correctamente",
                data: {
                  rol: rol,
                  results,
                },
              });
            }
          );
        }
      );
    } else
      return res.json({
        status: false,
        error: `⛔ Los datos no son validos`,
      });
  };

  module.exports = {
    Autentificiacion
  }