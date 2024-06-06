const conexion = require("../conection/conexion.js");

const InformeFacturasClientes = (req, res) => {
    const { fecha_inicio, fecha_fin } = req.params;

  conexion.query(`
      SELECT 
          id_persona, n_identificacion, fk_tipo_identificacion, CONCAT(nombre_1,' ',apellido_1) as cliente, correo, telefono, z.zona,
          count(cod_Factura) as facturas_cliente,
          sum(epf.pago_total) as facturas_saldadas,
          (count(cod_Factura) - sum(epf.pago_total)) as facturas_pendientes
      FROM datos_persona dp  
      INNER JOIN zonas_ventas z ON fk_zona_venta = z.id_zona
      INNER JOIN facturas f ON f.fk_cliente = id_persona
      INNER JOIN estado_pago_factura epf ON epf.pfk_factura = cod_factura
      WHERE fk_tipo_persona = 1 AND fecha_registro between ? and ?
      GROUP BY f.fk_cliente
      ORDER BY id_persona DESC;
  `, [ fecha_inicio, fecha_fin ],
  function (err, results) {
    if (err) {
      return res.json({
        status: false,
        error: "⛔ No fue posible completar la query",
        type: err,
      });
    }

    return res.json({
      status: true,
      message: `✅ Se genero la consulta correctamente`,
      data: results,
    });
  }
);
};

const InformeClientesCompras = (req, res) => {
    const validations = {
      noVacio: /.+?/gm,
    };
  
    const { fk_cliente } = req.params;
    const { fecha_inicio, fecha_fin } = req.body;
  
    if (
      (validations.noVacio.test(fk_cliente),
      validations.noVacio.test(fecha_inicio),
      validations.noVacio.test(fecha_fin))
    ) {
      conexion.query(`
              SELECT 
                  f.cod_factura, 
                  f.fecha_registro, 
                  dpc.n_identificacion,
                  concat(dpc.nombre_1,' ', dpc.apellido_1) as cliente,
                  fk_vendedor,
                  concat(dpv.nombre_1,' ',dpv.apellido_1) as vendedor,
                  epf.total,
                  epf.numero_abonos,
                  epf.pago_total,
                  (epf.total - sum(valor_abono)) as saldo,
                  sum(valor_abono) as pago_abonos,
                  group_concat(metodo_pago) as metodos_pago_usados, 
              group_concat(fecha_abono) as fechas_de_abono, 
              group_concat(valor_abono) as valor_abonos
              FROM facturas f
              INNER JOIN datos_persona dpc ON dpc.id_persona = fk_cliente
              INNER JOIN datos_persona dpv ON dpv.id_persona = fk_vendedor
              INNER JOIN estado_pago_factura epf on epf.pfk_factura = f.cod_factura
              LEFT JOIN abonos_factura af ON af.fk_factura = epf.pfk_factura
              WHERE f.fk_cliente = ? and fecha_registro between ? and ?
              GROUP BY cod_factura
              ORDER BY cod_factura DESC;
          `,
        [fk_cliente, fecha_inicio, fecha_fin],
        function (err, results) {
          if (err) {
            return res.json({
              status: false,
              error: "⛔ No fue posible completar la query",
              type: err,
            });
          }
  
          return res.json({
            status: true,
            message: "✅ Se completo la consulta correctamente",
            data: results,
          });
        }
      );
    } else {
      return res.json({
        status: false,
        error: "⛔ Existen datos vacion",
      });
    }
};

const InformeVendedorVentas = (req, res) => {
    const validations = {
      noVacio: /.+?/gm,
    };
  
    const { fk_vendedor } = req.params;
    const { fecha_inicio, fecha_fin } = req.body;
  
    if (
      (validations.noVacio.test(fk_vendedor),
      validations.noVacio.test(fecha_inicio),
      validations.noVacio.test(fecha_fin))
    ) {
      conexion.query(`
          SELECT 
              f.cod_factura, 
              f.fecha_registro, 
              dpc.n_identificacion,
              concat(dpc.nombre_1,' ', dpc.apellido_1) as cliente,
              fk_vendedor,
              concat(dpv.nombre_1,' ',dpv.apellido_1) as vendedor,
              epf.total,
              epf.numero_abonos,
              epf.pago_total,
              (epf.total - sum(valor_abono)) as saldo,
              sum(valor_abono) as pago_abonos,
              group_concat(metodo_pago) as metodos_pago_usados, 
          group_concat(fecha_abono) as fechas_de_abono, 
          group_concat(valor_abono) as valor_abonos
          FROM facturas f
          INNER JOIN datos_persona dpc ON dpc.id_persona = fk_cliente
          INNER JOIN datos_persona dpv ON dpv.id_persona = fk_vendedor
          INNER JOIN estado_pago_factura epf on epf.pfk_factura = f.cod_factura
          LEFT JOIN abonos_factura af ON af.fk_factura = epf.pfk_factura
          WHERE fk_vendedor = ? and fecha_registro between ? and ?
          GROUP BY cod_factura
          ORDER BY cod_factura DESC;
          `,
        [fk_vendedor, fecha_inicio, fecha_fin],
        function (err, results) {
          if (err) {
            return res.json({
              status: false,
              error: "⛔ No fue posible completar la query",
              type: err,
            });
          }
  
          return res.json({
            status: true,
            message: "✅ Se completo la consulta correctamente",
            data: results,
          });
        }
      );
    } else {
      return res.json({
        status: false,
        error: "⛔ Existen datos vacion",
      });
    }
};

const InformeVendedores = (req, res) => {
    const { fecha_inicio, fecha_fin } = req.params;
  
    conexion.query(`
          SELECT
              v.fk_vendedor,
              v.alias,
              v.n_identificacion,
              v.vendedor,
              v.fk_zona_venta,
              v.zona,
              v.ventas_realizadas,
              v.facturas_saldadas,
              v.facturas_pendientes,
              v.total_facturas,
              COALESCE(a.pago_abonos, 0) as pago_abonos,
              (v.total_facturas - a.pago_abonos) as saldo_pendiente
          FROM (
              SELECT
                  -- group_concat(fecha_registro) as fecha_registro,
                  fk_vendedor,
                  u.alias,
                  dpv.n_identificacion,
                  concat(dpv.nombre_1,' ',dpv.apellido_1) as vendedor,
                  fk_zona_venta,
                  z.zona,
                  count(cod_factura) as ventas_realizadas,
                  sum(epf.pago_total) as facturas_saldadas,
                  (count(cod_factura) - sum(epf.pago_total)) as facturas_pendientes,
                  sum(total) as total_facturas
              FROM facturas
              INNER JOIN usuarios u ON u.pfk_usuario = fk_vendedor
              INNER JOIN datos_persona dpv ON dpv.id_persona = fk_vendedor
              INNER JOIN zonas_ventas z ON fk_zona_venta = z.id_zona
              INNER JOIN estado_pago_factura epf ON epf.pfk_factura = cod_factura
              WHERE fecha_registro between ? and ?
              GROUP BY fk_vendedor
          ) v
          LEFT JOIN (
              SELECT 
                  f.fk_vendedor,
                  sum(af.valor_abono) as pago_abonos
              FROM abonos_factura af
              INNER JOIN estado_pago_factura epf ON af.fk_factura = epf.pfk_factura
              INNER JOIN facturas f ON f.cod_factura = epf.pfk_factura
              WHERE fecha_registro between ? and ?
              GROUP BY f.fk_vendedor
          ) a ON v.fk_vendedor = a.fk_vendedor
          ORDER BY v.fk_vendedor;
      `,
      [fecha_inicio, fecha_fin, fecha_inicio, fecha_fin],
      function (err, results) {
        if (err) {
          return res.json({
            status: false,
            error: "⛔ No fue posible completar la query",
            type: err,
          });
        }
  
        return res.json({
          status: true,
          message: `✅ Se genero la consulta correctamente`,
          data: results,
        });
      }
    );
};

const VentasPorVendedorFechas = (req, res) => {
    const validations = {
        noVacio: /.+?/gm
    }

    const { fecha_inicio, fecha_fin } = req.params;

    if(
        validations.noVacio.test(fecha_inicio),
        validations.noVacio.test(fecha_fin)
    ){
        conexion.query(`
            SELECT
                fk_vendedor,
                u.alias,
                concat(dpv.nombre_1,' ',dpv.apellido_1) as vendedor,
                fk_zona_venta,
                z.zona
                from facturas
            INNER JOIN usuarios u ON u.pfk_usuario = fk_vendedor
            INNER JOIN datos_persona dpv ON dpv.id_persona = fk_vendedor
            INNER JOIN zonas_ventas z ON fk_zona_venta = z.id_zona
            WHERE fecha_registro BETWEEN ? AND ?;
			`, [fecha_inicio, fecha_fin], function(err, results){
            if(err){
                return res.json({ 
                    status: false,
                    error: '⛔ No fue posible completar la query', 
                    type: err
                });
            }

            return res.json({
                status: true,
                message: '✅ Se genero la consulta correctamente',
                data: results
            })
        })
    }
}

const InformeFactura = (req, res) => {
    const validations = {
      noVacio: /.+?/gm,
    };
  
    const { numFactura } = req.body;
  
    if (validations.noVacio.test(numFactura)) {
      conexion.query(`
          SELECT 
              f.cod_factura,
              f.fecha_registro, 
              dp.n_identificacion, 
              dp.fk_tipo_identificacion, 
              CONCAT(dp.nombre_1, ' ', dp.apellido_1) AS nombres, 
              SUM(DISTINCT df.cantidad) AS cantidad_productos, 
              epf.total, 
              epf.numero_abonos, 
              SUM(DISTINCT af.valor_abono) AS total_abonos, 
              GROUP_CONCAT(DISTINCT af.fecha_abono) AS fecha_abonos, 
              GROUP_CONCAT(DISTINCT af.valor_abono) AS abonos
          FROM facturas f
          INNER JOIN datos_persona dp ON dp.id_persona = f.fk_cliente
          INNER JOIN detalle_factura df ON df.fk_factura = f.cod_factura
          INNER JOIN estado_pago_factura epf ON epf.pfk_factura = df.fk_factura
          INNER JOIN abonos_factura af ON af.fk_factura = epf.pfk_factura
          WHERE f.cod_factura = ?
          GROUP BY f.cod_factura;
          `,
        [numFactura],
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
              error: "⛔ No se encontro la factura",
            });
          }
  
          return res.json({
            status: true,
            message: "✅ Se completo la consulta correctamente",
            data: results,
          });
        }
      );
    } else {
      return res.json({
        status: false,
        error: "⛔ Existen datos vacion",
      });
    }
};

const InformeFacturaSaldadas = (req, res) => {
    const validations = {
      noVacio: /.+?/gm,
    };
  
    const { fecha_inicio, fecha_fin } = req.params;
  
    if (
      (validations.noVacio.test(fecha_inicio),
      validations.noVacio.test(fecha_fin))
    ) {
      conexion.query(`
          SELECT 
              fk_factura, 
              f.fk_vendedor,
              epf.numero_abonos, 
              group_concat(metodo_pago) as metodos_pago_usados, 
              group_concat(fecha_abono) as fechas_de_abono, 
              group_concat(valor_abono) as valor_abonos,
              epf.subtotal, 
              epf.total, 
              (epf.total - sum(valor_abono)) as saldo,
              sum(valor_abono) as pago_abonos,
              epf.pago_total
          FROM abonos_factura af
          INNER JOIN estado_pago_factura epf ON pfk_factura = fk_factura
          INNER JOIN facturas f ON epf.pfk_factura = f.cod_factura
          WHERE f.fecha_registro BETWEEN ? AND ?
          GROUP BY fk_factura
          HAVING saldo = 0;
          `,
        [fecha_inicio, fecha_fin],
        function (err, results) {
          if (err) {
            return res.json({
              status: false,
              error: "⛔ No fue posible completar la query",
              type: err,
            });
          }
  
          return res.json({
            status: true,
            message: `✅ Se genero la consulta correctamente`,
            data: results,
          });
        }
      );
    }
};

const InformeVentasMes = (req, res) => {
  conexion.query(`
    select
      fk_vendedor,
      u.alias,
      concat(dpv.nombre_1,' ',dpv.apellido_1) as vendedor,
      'Enero' as mes,
      COALESCE(COUNT(cod_factura), 0) AS ventas
    from facturas
    INNER JOIN usuarios u ON u.pfk_usuario = fk_vendedor
    INNER JOIN datos_persona dpv ON dpv.id_persona = fk_vendedor
    where fecha_registro between '2024-01-01' and '2024-01-31' -- Ene
    group by fk_vendedor

    UNION ALL

    select
      fk_vendedor,
      u.alias,
      concat(dpv.nombre_1,' ',dpv.apellido_1) as vendedor,
      'Febrero' as mes,
      COALESCE(COUNT(cod_factura), 0) AS ventas
    from facturas
    INNER JOIN usuarios u ON u.pfk_usuario = fk_vendedor
    INNER JOIN datos_persona dpv ON dpv.id_persona = fk_vendedor
    where fecha_registro between '2024-02-01' and '2024-02-29' -- Feb
    group by fk_vendedor

    UNION ALL

    select
      fk_vendedor,
      u.alias,
      concat(dpv.nombre_1,' ',dpv.apellido_1) as vendedor,
      'Marzo' as mes,
      COALESCE(COUNT(cod_factura), 0) AS ventas
    from facturas
    INNER JOIN usuarios u ON u.pfk_usuario = fk_vendedor
    INNER JOIN datos_persona dpv ON dpv.id_persona = fk_vendedor
    where fecha_registro between '2024-03-01' and '2024-03-31' -- Mar
    group by fk_vendedor

    UNION ALL

    select
      fk_vendedor,
      u.alias,
      concat(dpv.nombre_1,' ',dpv.apellido_1) as vendedor,
      'Abril' as mes,
      COALESCE(COUNT(cod_factura), 0) AS ventas
    from facturas
    INNER JOIN usuarios u ON u.pfk_usuario = fk_vendedor
    INNER JOIN datos_persona dpv ON dpv.id_persona = fk_vendedor
    where fecha_registro between '2024-04-01' and '2024-04-30' -- Abr
    group by fk_vendedor

    UNION ALL

    select
      fk_vendedor,
      u.alias,
      concat(dpv.nombre_1,' ',dpv.apellido_1) as vendedor,
      'Mayo' as mes,
      COALESCE(COUNT(cod_factura), 0) AS ventas
    from facturas
    INNER JOIN usuarios u ON u.pfk_usuario = fk_vendedor
    INNER JOIN datos_persona dpv ON dpv.id_persona = fk_vendedor
    where fecha_registro between '2024-05-01' and '2024-05-31' -- Abr
    group by fk_vendedor

    UNION ALL

    select
      fk_vendedor,
      u.alias,
      concat(dpv.nombre_1,' ',dpv.apellido_1) as vendedor,
      'Junio' as mes,
      COALESCE(COUNT(cod_factura), 0) AS ventas
    from facturas
    INNER JOIN usuarios u ON u.pfk_usuario = fk_vendedor
    INNER JOIN datos_persona dpv ON dpv.id_persona = fk_vendedor
    where fecha_registro between '2024-06-01' and '2024-06-29' -- Abr
    group by fk_vendedor
    order by fk_vendedor
    ;
  `, function(err, results){
    if (err) {
      return res.json({
        status: false,
        error: "⛔ No fue posible completar la query",
        type: err,
      });
    }

    return res.json({
      status: true,
      message: `✅ Se genero la consulta correctamente`,
      data: results,
    });
  })
}

module.exports = {
    InformeFacturasClientes,
    InformeClientesCompras,
    InformeVendedorVentas,
    InformeVendedores,
    VentasPorVendedorFechas,
    InformeFactura,
    InformeFacturaSaldadas,
    InformeVentasMes
}