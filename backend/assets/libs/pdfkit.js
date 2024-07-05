import PDFDocument from 'pdfkit-table';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { texto, moverAbajo, fechaTexto, seteoIdentificador } from './help.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const contruirPDF = (datosEncabezado, decretosAnexados) => {
  return new Promise((resolve, reject) => {
    const { juzgado, juez, ciudad, origen, radicado, demandante, demandado, proceso, provincia } = datosEncabezado;

    const doc = new PDFDocument({ size: "LEGAL" });

    const dirPath = path.join(__dirname, './docs');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    const filePath = path.join(dirPath, `AutoDecretaMedida_${radicado}.pdf`);

    try {
      const streamm = fs.createWriteStream(filePath);
      doc.pipe(streamm);

      streamm.on('finish', () => {
        resolve(filePath);
      });

      streamm.on('error', (err) => {
        reject(err);
      });

      // Inicio de creacion PDF
      doc
        .font("Helvetica-Bold")
        .fontSize(13.5)
        .text("República de Colombia", { align: "center" })
        .text("Rama Judicial del Poder Público", { align: "center" });

      // Calculo para centrar la imagen
      const imageWidth = 60;
      const pageWidth = doc.page.width;
      const x = (pageWidth - imageWidth) / 2;

      doc.image("assets/images/Escudo.png", x, 113, { width: imageWidth });
      doc.moveDown(4);

      doc.text(juzgado, 100, 190, {
        align: "center",
        width: 400,
      });

      let alto = doc.y;
      const fecha = new Date();

      doc.fontSize(11);
      doc.text(`${ciudad}, ${fechaTexto(fecha)}`, 150, alto + 12);

      doc.fontSize(12)
        .text("ORIGEN: ", 110, alto + 55);
      moverAbajo(doc, origen);

      doc.text("RADICACIÓN: ");
      moverAbajo(doc, radicado);

      doc.text("DEMANDANTE: ");
      moverAbajo(doc, demandante);

      doc.text("DEMANDADO: ");
      moverAbajo(doc, demandado);

      doc.text("PROCESO: ");
      moverAbajo(doc, proceso);

      doc
        .text(origen, 220, alto + 55)
        .text(radicado, 220)
        .text(demandante, 220)
        .text(demandado, 220)
        .text(proceso, 220);

      alto = doc.y;

      doc.font("Helvetica")
        .text(texto, 100, alto + 20, {
          align: "left",
          width: 400,
        })
        .moveDown(2);

      doc.font("Helvetica-Bold")
        .text("DISPONE: ", { align: "center" })
        .moveDown(1);

      // Funcion para generar decretos / ley
      seteoIdentificador(doc, decretosAnexados, demandado);

      doc.moveDown(1);

      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .text('NOTIFÍQUESE y CÚMPLASE,', { align: "center" })
        .text(`-${provincia}-`, { align: "center" });

      doc.moveDown(3);

      doc.text("________________________________", { align: "center" })
        .moveDown(1);

      doc.text(juez, { align: "center" })
        .moveDown(1)
        .text("Juez", { align: "center" });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
