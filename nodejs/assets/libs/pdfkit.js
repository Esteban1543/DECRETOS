// const PDFkitCreate = require("pdfkit");
const PDFDocument = require("pdfkit-table");
const fs = require("fs");
const path = require("path");

const contruirPDF = (datosPersonas, ProductosData) => {
  const {
    cod_factura,
    fecha,
    hora,
    cliente,
    n_identificacion,
    telefono,
    direccion,
    correo,
    vendedor,
    metodo_pago,
    numero_abonos,
    iva_aplicado,
    subtotal,
    total,
    pendiente,
  } = datosPersonas;

  const fechastringth = JSON.stringify(fecha);
  const fechaSplit = fechastringth.split('T')[0]

  const subtotalint = parseInt(subtotal);
  const totalint = parseInt(total);

  const metodoString = JSON.stringify(metodo_pago);
  const metodoSplit = metodoString.split(',')[0]

  const doc = new PDFDocument({ size: "A4" });
  const dirPath = path.join(__dirname, './docs');
  const filePath = path.join(dirPath, `Factura_${cod_factura}.pdf`);

  const streamm = fs.createWriteStream(filePath);

  doc.pipe(streamm);

  doc.image("assets/images/Logo.png", 260, 50, { width: 75 });
  doc.moveDown(4);

  doc.fontSize(26);
  doc.font("Times-Roman");
  doc
    .text("Versalles Papeleria", { align: "center" })

    .fontSize(12);
  doc.text("NIT: 10101010-2", 250, 160, {
    width: 410,
  });
  doc.text("DIR: Carrera #9 27 - 12", 233, 175, {
    width: 410,
  });

  doc.moveDown(12);

  //Datos Cliente - Factura
  doc.font("Helvetica-Bold");
  doc.fontSize(12);

  doc.text(`Cliente: `, 70, 240);
  doc.text(`CC: `);
  doc.text(`Celular: `);
  doc.text(`Correo: `);
  doc.text(`Direccion: `);

  doc
    .font("Helvetica")
    .text( cliente , 115, 240)
    .text( n_identificacion , 93, 254)
    .text( telefono , 116, 268)
    .text( correo , 116, 283)
    .text( direccion , 130, 297);

  doc
    .font("Helvetica-Bold")
    .text("Fecha: ", 400, 240)
    .text("Hora: ", 400, 254)
    .text("N° Factura: ", 400, 268);

  doc
    .font("Helvetica")
    .text( fechaSplit.substring(1), 440, 240)
    .text( hora , 433, 254)
    .text( cod_factura , 466, 268);

  doc.moveDown(5);

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("Detallado Factura", 70, 350)
    .moveDown(2);

  const tableArray = {
    // headers: ["COD", "Cantidad", "Descripcion", "Precio UNIT", "SUBTOTAL"]
    headers: [
      { label: "COD", property: "COD", width: 80, align: "center" },
      { label: "Cantidad", property: "Cantidad", width: 80, align: "center" },
      {
        label: "Descripción",
        property: "Descripción",
        width: 110,
        align: "center",
      },
      { label: "Precio UNIT", property: "Precio", width: 100, align: "center" },
      { label: "Total", property: "Total", width: 100, align: "center" },
    ],
    rows: ProductosData.map(producto => [
      producto.cod_producto,
      producto.cantidad,
      producto.nombre_producto,
      formatPrices(producto.precio_producto),
      formatPrices(producto.subtotal_producto),
    ]),
  };

  doc.table(tableArray, {
    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(11),
    prepareRow: (row, i) => doc.font("Helvetica").fontSize(10),
  });

  let posicionY = doc.y;

  doc
    .font("Helvetica-Bold")
    .text("IVA: ", 367, posicionY + 10)
    .text("SubTotal: ")
    .text("Total: ");

  doc
    .font("Helvetica")
    .text(iva_aplicado + "%", 367 + 96, posicionY + 10)
    .text(formatPrices(subtotalint))
    .text(formatPrices(totalint));

  doc.moveDown(2);
  if (posicionY > 650) {
    doc.addPage({ size: "A4" });
  }

  doc
  .moveTo(50, 692)
  .lineTo(545.28, 692)
  .stroke();

  doc
    .font("Helvetica-Bold")
    .text("Vendedor: ", 70, 712)
    .text("Forma de Pago: ")
    .text("Numero de abonos: ")
    .text("Saldos: ");

  doc
    .font("Helvetica")
    .text(vendedor, 121, 712)
    .text(metodoSplit.substring(1), 147, 725)
    .text(numero_abonos, 169, 737)
    .text(formatPrices(pendiente), 113, 748);

  doc
    .moveTo(50, 770)
    .lineTo(545.28, 770)
    .stroke();

  doc.end();

}

const formatPrices = (price) => {
  const priceString = price?.toString();

  const decimas = priceString.substr(-3);

  const unidades = priceString.substr(-6, 1);
  const decenas = priceString.substr(-6, 2);
  const centenas = priceString.substr(-6, 3);

  const miles = priceString.substr(-7, 1);
  const diezmiles = priceString.substr(-8, 2);

  if (price < 9999 && price > 999) return `${unidades}.${decimas}`;
  else if (price < 99999 && price > 9999) return `${decenas}.${decimas}`;
  else if (price < 999999 && price > 99999) return `${centenas}.${decimas}`;
  else if (price < 9999999 && price > 999999) return `${miles}'${centenas}.${decimas}`;
  else if (price < 99999999 && price > 9999999) return `${diezmiles}'${centenas}.${decimas}`;
  else return price;
}

module.exports = contruirPDF;
