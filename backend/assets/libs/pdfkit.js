import PDFDocument from 'pdfkit-table'
import fs from 'fs'
import path from 'path'

import { juzgado, moverAbajo, fechaTexto } from './help.js'

export const contruirPDF = (datosEncabezado, datosDecreto) => {

  const {origen, juez, ciudad, radicado, demandante, demandado, proceso, provincia} = datosEncabezado;

  //Guardar documento
  const doc = new PDFDocument({ size: "LEGAL" });
  const dirPath = path.join(__dirname, './docs');
  const filePath = path.join(dirPath, `AutoDecretaMedida_${radicado}.pdf`);
  const streamm = fs.createWriteStream(filePath);

  doc.pipe(streamm);


  // Inicio de creacion PDF
  doc
    .font("Helvetica-Bold")
    .fontSize(13.5)
    .text("Republica de colombia", {
      align: "center",
    })
    .text("Rama Judicial del Poder Publico", {
      align: "center",
    });

  // Calculo para centrar la imagen
  const imageWidth = 60;
  const pageWidth = doc.page.width;
  const x = (pageWidth - imageWidth) / 2;

  doc.image("assets/images/Escudo.png", x, 113, { width: imageWidth });
  doc.moveDown(4);

  doc.text(origen, 100, 190, {
    align: "center",
    width: 400,
  });

  let alto = doc.y;
  const fecha = new Date();

  doc.fontSize(11);
  doc.text(`${ciudad}, ${fechaTexto(fecha)}`, 150, alto + 12);

  doc.fontSize(12)
    
    doc.text("ORIGEN: ", 110, alto + 55)
    moverAbajo(doc, origen)

    doc.text("RADICACIÓN: ")
    moverAbajo(doc, radicado)

    doc.text("DEMANDANTE: ")
    moverAbajo(doc, demandante)

    doc.text("DEMANDADO: ")
    moverAbajo(doc, demandado)

    doc.text("PROCESO: ")
    moverAbajo(doc, proceso)

  doc
    .text(origen, 220, alto + 55)
    .text(radicado, 220,)
    .text(demandante, 220,)
    .text(demandado, 220,)
    .text(proceso, 220,)

  alto = doc.y;

  doc.font("Helvetica")
    .text(juzgado, 100, alto + 20, {
      align: "left",
      width: 400,
    })
    .moveDown(2)

  doc.font("Helvetica-Bold")
    .text("DISPONE: ", {
      align: "center",
    })
    .moveDown(1)

    // Funcion para generar los decretos
      seteoIdentificador(doc, datosDecreto, demandado, 0);

      doc.moveDown(1);

      doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text('NOTIFIQUESE Y CUMPLASE,', {
        align: "center",
      })
      .text(`-${provincia}-`, {
        align: "center"
      })

      doc.moveDown(3)

      doc.text("______________________________", {
        align: "center",
      })
      .moveDown(1)

      doc.text(juez, {align: "center"},)
      .moveDown(1)
      .text("Juez", {align: "center"},)

  doc.end();
};