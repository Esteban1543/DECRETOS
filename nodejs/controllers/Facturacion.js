const conexion = require("../conection/conexion.js");
const { transporter } = require("../assets/mail/mail.js");

const CrearClienteDevolverFactura = (req, res) => {
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
  
      //DATOS VENDEDOR
      fk_vendedor,
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
            if (err.code === "ER_DUP_ENTRY") {
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
                              estado_persona = ?
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
                  1,
                  n_identificacion,
                  
                ],
                function (err, results) {
                  if (err) {
                    return res.json({
                      status: false,
                      error:
                        "⛔ No fue posible completar la query (Query 1 (EDITAR))",
                      type: err,
                    });
                  }
                }
              );
            } else {
              return res.json({
                status: false,
                error:
                  "⛔ No fue posible completar la query (Query 1 (INGRESAR))",
                type: err,
              });
            }
          }
  
          conexion.query(
            `
                  SELECT id_persona FROM datos_persona 
                  WHERE n_identificacion = ? AND fk_tipo_persona = 1;
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
  
              if (results.length === 0) {
                return res.json({
                  status: false,
                  error: "⛔ No fue encontrar a usuario (Query 2)",
                  type: err,
                });
              }
  
              const fechaActual = new Date();
              const fechaFormato = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1).toString().padStart(2, "0")}-${fechaActual.getDate().toString().padStart(2, "0")} ${fechaActual.getHours().toString().padStart(2, "0")}:${fechaActual.getMinutes().toString().padStart(2, "0")}:${fechaActual.getSeconds().toString().padStart(2, "0")}`;
  
              const datos_factura = {
                fk_cliente: results[0].id_persona,
                fecha_registro: fechaFormato,
                fk_vendedor: fk_vendedor,
              };
  
              conexion.query(
                `
                      INSERT INTO facturas SET ?
                  `,
                {
                  fk_cliente: datos_factura.fk_cliente,
                  fecha_registro: datos_factura.fecha_registro,
                  fk_vendedor: datos_factura.fk_vendedor,
                },
                function (err, results) {
                  if (err) {
                    return res.json({
                      status: false,
                      error: "⛔ No fue posible completar la query (Query 3)",
                      type: err,
                    });
                  }
  
                  conexion.query(`
                              SELECT cod_factura 
                              FROM facturas 
                              WHERE fk_cliente = ? AND fecha_registro = ? AND fk_vendedor = ?;
                          `,
                    [
                      datos_factura.fk_cliente,
                      datos_factura.fecha_registro,
                      datos_factura.fk_vendedor,
                    ],
                    function (err, results) {
                      if (err) {
                        return res.json({
                          status: false,
                          error: "⛔ No fue posible completar la query (Query 4)",
                          type: err,
                        });
                      }
  
                      return res.json({
                        status: true,
                        message: "✅ Se creo el cliente y la factura (Query 4)",
                        data: results,
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    } else {
      return res.json({
        status: false,
        error: "⛔ Los datos ingresados no son validos",
      });
    }
  };

  const CrearFactura = async (req, res) => {
    const { numFactura, productos } = req.body;
    let error = false;
    let typeErr;
  
    if (productos.length > 0) {
      for (const producto of productos) {
        try {
          await new Promise((resolve, reject) => {
            conexion.query(
              `INSERT INTO detalle_factura SET ?`,
              {
                fk_factura: numFactura,
                fk_producto: producto.cod_producto,
                cantidad: producto.cantidad,
                subtotal_producto: producto.precio_producto * producto.cantidad,
              },
              function (err, results) {
                if (err) {
                  typeErr = err;
                  return reject(err);
                }
                resolve(results);
              }
            );
          });
        } catch (err) {
          error = true;
          break;
        }
      }
    } else {
      error = true;
    }
  
    if (error) {
      return res.json({
        status: false,
        error: "⛔ No fue posible completar la query (1)",
        type: typeErr,
      });
    } else {
      conexion.query(`
          SELECT f.cod_factura, concat(dp.nombre_1,' ',dp.apellido_1) as cliente, dp.n_identificacion, sum(df.cantidad) as cant_productos, SUM(df.subtotal_producto) as subtotal
          FROM facturas f
          INNER JOIN datos_persona dp ON id_persona = fk_cliente
          INNER JOIN detalle_factura df ON fk_factura = cod_factura
          WHERE cod_factura = ?;
        `,
        [numFactura],
        function (err, results) {
          if (err) {
            return res.json({
              status: false,
              error: "⛔ No fue posible completar la query (Query 2)",
              type: err,
            });
          }
  
          return res.json({
            status: true,
            message: "✅ La productos se cargaron correctamente a la factura",
            data: results,
          });
        }
      );
    }
};

const IngresarDatosFactura = (req, res) => {
    const validations = {
      noVacio: /.+?/gm,
    };

    const {
      numFactura,
      iva_aplicado,
      subtotal,
      total,
      metodo_pago,
      pago_total,
      numero_abonos,
      valor_abono,
    } = req.body;

    if(valor_abono <= total){
      if (
        (validations.noVacio.test(numFactura),
        validations.noVacio.test(iva_aplicado),
        validations.noVacio.test(subtotal),
        validations.noVacio.test(total),
        validations.noVacio.test(metodo_pago),
        validations.noVacio.test(pago_total),
        validations.noVacio.test(numero_abonos),
        validations.noVacio.test(valor_abono))
      ) {
        conexion.query(`
            INSERT INTO estado_pago_factura SET ?`,
          {
            pfk_factura: numFactura,
            iva_aplicado: iva_aplicado,
            subtotal: subtotal,
            total: total,
            pago_total: pago_total,
            numero_abonos: numero_abonos,
          },
          function (err, results) {
            if (err) {
              return res.json({
                status: false,
                error: "⛔ No fue posible completar la query (Query 1)",
                type: err,
              });
            }
    
            const fechaActual = new Date();
            const fechaFormato = `${fechaActual.getFullYear()}-${(
              fechaActual.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}-${fechaActual
              .getDate()
              .toString()
              .padStart(2, "0")}`;
    
            conexion.query(
              `
                    INSERT INTO abonos_factura SET ?
                `,
              {
                fk_factura: numFactura,
                metodo_pago: metodo_pago,
                valor_abono: valor_abono,
                fecha_abono: fechaFormato,
              },
              function (err, results) {
                if (err) {
                  return res.json({
                    status: false,
                    error: "⛔ No fue posible completar la query (Query 2)",
                    type: err,
                  });
                }
    
                return res.json({
                  status: true,
                  message: "✅ Los datos de la factura se cargaron correctamente",
                });
              }
            );
          }
        );
      } else {
        return res.json({
          status: false,
          error: "⛔ Existen datos vacion",
        });
      }
    }else{
      return res.json({
        status: false,
        error: "⛔ El valor supera al monto total",
      });
    }
};

const GenerarAbonoFactura = (req, res) => {
    const validations = {
      noVacio: /.+?/gm,
    };
  
    const { formData, pendiente } = req.body;
    const { numFactura, metodo_pago, valor_abono } = formData;
    
    const fecha_abono = new Date(); 

    if(valor_abono <= pendiente){
      if (
        (validations.noVacio.test(numFactura),
        validations.noVacio.test(metodo_pago),
        validations.noVacio.test(valor_abono))
      ) {
        conexion.query(`
            INSERT INTO abonos_factura SET ?
            `,
          {
            fk_factura: numFactura,
            metodo_pago: metodo_pago,
            valor_abono: valor_abono,
            fecha_abono: fecha_abono,
          },
          function (err, results) {
            if (err) {
              return res.json({
                status: false,
                error: "⛔ No fue posible completar la query (1)",
                type: err,
              });
            }
    
            conexion.query(`
              select 
                f.cod_factura, 
                  dp.n_identificacion,
                  concat(dp.nombre_1,' ',dp.apellido_1) as cliente,
                  dp.telefono,
                  dp.correo,
                  zv.zona
              from facturas f
              inner join datos_persona dp on dp.id_persona = f.fk_cliente
              inner join zonas_ventas zv on zv.id_zona = dp.fk_zona_venta
              where cod_factura = ?;
            `, [numFactura], async function(err, results){
              if (err) {
                return res.json({
                  status: false,
                  error: "⛔ No fue posible completar la query (2)",
                  type: err,
                });
              }
  
              const datos_factura = results[0];
  
              try {
                const info = await transporter.sendMail({
                          from: `<facturacionddne@gmail.com>`,
                          to: `${datos_factura.correo}`,
                          subject: `Abono ${numFactura} ${fecha_abono}`,
                          html: `
                            <!DOCTYPE html>
                            <html>
                            <body>
                              <p>Estimado/a ${datos_factura.cliente}</p>
                              <br>
                              <p>Junto a este correo electrónico le enviamos detalles del abono correspondiente a la transaccion que realizó recientemente.</p>
                              <div style="border: 2px black solid; width: 240px; border-radius: 20px;">
                                <ul style="list-style: none;">
                                    <li><strong>COD:</strong> ${datos_factura.cod_factura}</li>
                                    <li><strong>ID:</strong> ${datos_factura.n_identificacion}</li>
                                    <li><strong>NOMBRE:</strong> ${datos_factura.cliente}</li>
                                    <li><strong>TELEFONO:</strong> ${datos_factura.telefono}</li>
                                    <li><strong>ZONA:</strong> ${datos_factura.zona}</li>
                                    <li><strong>FECHA:</strong> ${fecha_abono.toLocaleDateString('es-CO', { year: 'numeric', month: 'numeric', day: 'numeric' })}</li>
                                    <li><strong>PAGO:</strong> ${metodo_pago}</li>
                                    <li><strong>VALOR:</strong> ${valor_abono}</li>
                                  </ul>
                              </div>
                            </body>
                            </html>
                          `
                      });

                conexion.query(`
                  update estado_pago_factura SET pago_total = 0 WHERE pfk_factura = ?;
                `, [ numFactura ], function(err, results){
                  if (err) {
                    return res.json({
                      status: false,
                      error: "⛔ No fue posible completar la query (3)",
                      type: err,
                    });
                  }

                  return res.json({
                    status: true,
                    message: "✅ Se envio el correo correctamente",
                  });

                })
  
              } catch (error) {
                res.json({
                  status: false,
                  message: "⛔ Error al enviar el correo",
                  type: error,
                });
              }
            })
          }
        );
      } else {
        return res.json({
          status: false,
          error: "⛔ Existen datos vacios",
        });
      }
    }else{
      return res.json({
        status: false,
        error: "⛔ El valor supera al monto pendiente",
      });
    }
};

module.exports = {
    CrearClienteDevolverFactura,
    CrearFactura,
    IngresarDatosFactura,
    GenerarAbonoFactura
}