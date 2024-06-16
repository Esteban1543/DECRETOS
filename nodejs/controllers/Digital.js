const conexion = require("../conection/conexion.js");
const path = require("path");
const contruirPDF = require("../assets/libs/pdfkit.js");
const contruirWORD = require("../assets/libs/pdfkit_2.js")
const { transporter } = require("../assets/mail/mail.js");
const { closePath } = require("pdfkit");
// const { client } = require('../assets/mail/whatsapp.js')

const CrearFacturaPdf = (req, res) => {
	const { numFactura } = req.params;

	conexion.query(`
		SELECT 
			f.cod_factura,
			DATE(f.fecha_registro) AS fecha,
			TIME(f.fecha_registro) AS hora,
			CONCAT(dpc.nombre_1,' ',dpc.apellido_1) AS cliente,
			dpc.n_identificacion,
			dpc.telefono,
			dpc.direccion,
			dpc.correo,
			CONCAT(dpv.nombre_1,' ',dpv.apellido_1) AS vendedor,
			GROUP_CONCAT(af.metodo_pago) as metodo_pago,
			epf.numero_abonos,
			SUM(df.subtotal_producto) as subtotal,
			epf.total,
			(SUM(af.valor_abono) - epf.total) AS pendiente,
			epf.iva_aplicado
		FROM facturas f
		INNER JOIN datos_persona dpc ON dpc.id_persona = f.fk_cliente
		INNER JOIN datos_persona dpv ON dpv.id_persona = f.fk_vendedor
		INNER JOIN abonos_factura af ON af.fk_factura = f.cod_factura
		INNER JOIN detalle_factura df ON df.fk_factura = f.cod_factura
		INNER JOIN estado_pago_factura epf ON epf.pfk_factura = f.cod_factura
		WHERE f.cod_factura = ?
		GROUP BY f.cod_factura;
		`,
		[numFactura],
		function (err, results) {
		if (err) {
			return res.json({
			status: false,
			error: "⛔ No fue posible completar la query (1)",
			type: err,
			});
		}

		const datos_factura = results[0];

		conexion.query(`
        SELECT 
          p.cod_producto,
          p.nombre_producto,
          df.cantidad,
          p.precio_producto,
          (df.cantidad * p.precio_producto) AS subtotal_producto
      FROM detalle_factura df
      INNER JOIN productos p ON p.cod_producto = df.fk_producto
      WHERE df.fk_factura = ?; 
			`,
			[numFactura],
			async function (err, results) {
				if (err) {
					return res.json({
					status: false,
					error: "⛔ No fue posible completar la query (2)",
					type: err,
					});
				}

				const ProductosData = results;

				
				try {
					contruirPDF(datos_factura, ProductosData);

					res.json({
						status: true,
						message: "✅ Se creo el pdf",
            data: {
              datos_factura,
              ProductosData
            }
					});
				} catch (error) {
					res.json({
						status: false,
						message: "⛔ Error al crear pdf",
						type: error,
					});
				}
			}
		);
		}
	);
};

const EnviarFacturaGmail = async (req, res) => {
	const { numFactura, enviar_copia, segundo_correo } = req.body;
	
	conexion.query(`
		SELECT 
			f.cod_factura,
			DATE(f.fecha_registro) AS fecha,
			TIME(f.fecha_registro) AS hora,
			CONCAT(dpc.nombre_1,' ',dpc.apellido_1) AS cliente,
			dpc.n_identificacion,
			dpc.telefono,
			dpc.direccion,
			dpc.correo,
			CONCAT(dpv.nombre_1,' ',dpv.apellido_1) AS vendedor,
			GROUP_CONCAT(af.metodo_pago) as metodo_pago,
			epf.numero_abonos,
			SUM(df.subtotal_producto) as subtotal,
			epf.total,
			(SUM(af.valor_abono) - epf.total) AS pendiente,
			epf.iva_aplicado
		FROM facturas f
		INNER JOIN datos_persona dpc ON dpc.id_persona = f.fk_cliente
		INNER JOIN datos_persona dpv ON dpv.id_persona = f.fk_vendedor
		INNER JOIN abonos_factura af ON af.fk_factura = f.cod_factura
		INNER JOIN detalle_factura df ON df.fk_factura = f.cod_factura
		INNER JOIN estado_pago_factura epf ON epf.pfk_factura = f.cod_factura
		WHERE f.cod_factura = ?
		GROUP BY f.cod_factura;
		`,
		[numFactura], async function (err, results) {
		
		if (err) {
			return res.json({
			status: false,
			error: "⛔ No fue posible completar la query (1)",
			type: err,
			});
		}

		const datos_factura = results[0];

		try {
			const info = await transporter.sendMail({
                from: `<facturacionddne@gmail.com>`,
                to: enviar_copia === false ? `${datos_factura.correo}` : `${datos_factura.correo}, ${segundo_correo}`,
                subject: `Factura ${numFactura} ${datos_factura.fecha}`,
                text: `Estimado/a ${datos_factura.cliente}:\n \nJunto a este correo electrónico le enviamos la factura electrónica correspondiente a la compra que realizó recientemente.`,
                attachments: [
                    {
                        filename: `Factura_${numFactura}.pdf`, // Nombre que tendrá el archivo en el correo
                        path: path.join(__dirname, `../assets/libs/docs/Factura_${numFactura}.pdf`), // Ruta del archivo en tu sistema de archivos
                    },
                ],
            });
	
			res.json({
			  status: true,
			  message: "✅ Se envio el correo correctamente",
			});


		} catch (error) {
			res.json({
			  status: false,
			  message: "⛔ Error al enviar el correo",
			  type: error,
			});
		}
		}
	);
}

const GenerarPDF = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "inline; filename=prueba.pdf"  // 'inline' to show in the browser
  });

  contruirWORD(
    (data) => res.write(data),
    () => res.end()
  );
};

module.exports = {
    CrearFacturaPdf,
    EnviarFacturaGmail,
	GenerarPDF
}