// src/App.tsx

import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb } from "pdf-lib";

const App: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const generateDocument = async () => {
    // Crear documento Word
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun("Hello World"),
                new TextRun({
                  text: "This is bold text",
                  bold: true,
                }),
                new TextRun({
                  text: "This is underlined text",
                  underline: {},
                }),
              ],
            }),
          ],
        },
      ],
    });

    // Convertir a Blob
    const blob = await Packer.toBlob(doc);
    
    // Crear documento PDF usando pdf-lib desde CDN
    const { PDFDocument, rgb } = await import('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm');
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    page.drawText("Hello World", { x: 50, y: 350, size: 30, color: rgb(0, 0, 0) });
    page.drawText("This is bold text", { x: 50, y: 300, size: 30, color: rgb(0, 0, 0) });
    page.drawText("This is underlined text", { x: 50, y: 250, size: 30, color: rgb(0, 0, 0) });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);

    // Guardar el Blob del documento Word
    const wordUrl = URL.createObjectURL(blob);
    localStorage.setItem('wordDocUrl', wordUrl);
  };

  const downloadWordDocument = () => {
    const wordUrl = localStorage.getItem('wordDocUrl');
    if (wordUrl) {
      saveAs(wordUrl, "acta.docx");
    }
  };

  const downloadPdfDocument = () => {
    if (pdfUrl) {
      saveAs(pdfUrl, "acta.pdf");
    }
  };

  return (
    <div>
      <button onClick={generateDocument}>Generate Document</button>
      <button onClick={downloadWordDocument} disabled={!localStorage.getItem('wordDocUrl')}>Download Word Document</button>
      <button onClick={downloadPdfDocument} disabled={!pdfUrl}>Download PDF Document</button>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          style={{ width: '100%', height: '500px', border: 'none' }}
          title="Document Preview"
        />
      )}
    </div>
  );
};

export default App;