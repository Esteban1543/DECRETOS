const PDFDocument = require("pdfkit-table");
const fs = require("fs");
const path = require("path");

const contruirWORD = (dataCallBack, endCallback) => {
  const doc = new PDFDocument({ size: "A4" });

  doc.on("data", dataCallBack);
  doc.on("end", endCallback);

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

  doc.image("assets/images/escudo.jpg", x, 113, { width: imageWidth });
  doc.moveDown(4);

  const origen =
    "Juzgado Primero Municipal de Pequeñas Causas Civiles y Competencia Múltiple de Tunja";

  doc.text(origen, 100, 190, {
    align: "center",
    width: 400,
  });

  let alto = doc.y;
  const fecha = new Date();

  // Remplazar ciudad segun tipo
  doc.fontSize(11);
  doc.text(`Tunja, ${fechaTexto(fecha)}`, 150, alto + 12);


  doc.fontSize(12)
    .text("RADICACIÓN: ", 110, alto + 55)
    .text("DEMANDANTE: ")
    .text("DEMANDADO: ")
    .text("PROCESO: ");

    const nombre_demandado = "OSCAR GARCIA PLAZAS";

  doc
    .text("2023-00501-00", 220, alto + 55)
    .text("ROSALBA SANDOVAL JIMENEZ", 220, )
    .text(nombre_demandado, 220,)
    .text("EJECUTIVO SINGULAR", 220,)

  alto = doc.y;

  // Texto antes de los decretos
  const juzgado = 'El juzgado, atendiendo la solicitud de cautela realizada por la parte actora, y por estimarla procedente,';

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

    //Datos simulados
    const descripcion_decreto = " °. DECRETAR EL EMBARGO Y RETENCIÓN, en la cuantía y proporción permitida por la ley, de los saldos bancarios que a cualquier título existan a favor del demandado ° y los depósitos posteriores que se produzcan, hasta completar la suma de ° de pesos.";
    
    const datos = [
      {nombre: nombre_demandado, valor: '10.000.000'}
    ]

    const datoss = generarMensajes(datos, descripcion_decreto);

        // Extraer las primeras 8 letras del primer mensaje
        const primerasOchoLetras = datoss[0].slice(0, 8);
        const restoDelMensaje = datoss[0].slice(8);
    
        doc.font("Helvetica")
          .font("Helvetica-Bold")
          .text(primerasOchoLetras, {
            align: "justify",
            continued: true,
          })
          .font("Helvetica")
          .text(restoDelMensaje, {
            align: "justify"
          });
    // doc.font("Helvetica")
    //   .font("Helvetica-Bold")
    //   .text(datoss.slice(0, 8),{
    //     align: "justify",
    //     continued: true,
    //   })
    //   .font("Helvetica")
    //   .text(datoss.slice(9, 264),{
    //     align: "justify"
    //   });

  doc.end();
};

function fechaTexto(fecha) {
  const dias = [
    "uno",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve",
    "diez",
    "once",
    "doce",
    "trece",
    "catorce",
    "quince",
    "dieciséis",
    "diecisiete",
    "dieciocho",
    "diecinueve",
    "veinte",
    "veintiuno",
    "veintidós",
    "veintitrés",
    "veinticuatro",
    "veinticinco",
    "veintiséis",
    "veintisiete",
    "veintiocho",
    "veintinueve",
    "treinta",
    "treinta y uno",
  ];

  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const numerosEnTexto = {
    0: "cero",
    1: "uno",
    2: "dos",
    3: "tres",
    4: "cuatro",
    5: "cinco",
    6: "seis",
    7: "siete",
    8: "ocho",
    9: "nueve",
  };

  function convertirAnoEnTexto(ano) {
    return ano
      .toString()
      .split("")
      .map((digito) => numerosEnTexto[digito])
      .join(" ");
  }

  const dia = fecha.getDate();
  const mes = fecha.getMonth();
  const ano = fecha.getFullYear();

  const diaEnTexto = dias[dia - 1];
  const mesEnTexto = meses[mes];
  const anoEnTexto = convertirAnoEnTexto(ano);

  return `${diaEnTexto} (${dia}) de ${mesEnTexto} de ${anoEnTexto} (${ano})`;
}

function generarMensajes(datos, plantilla) {
  const posiciones = ["PRIMERO", "SEGUNDO", "TERCERO", "CUARTO", "QUINTO", "SEXTO"];

  return datos.map((dato, index) => {
    if (index >= posiciones.length) {
      throw new Error("Más de seis elementos no están soportados.");
    }
    
    const texto = plantilla.replace("°", posiciones[index])
                           .replace("°", dato.nombre)
                           .replace("°", dato.valor);
    return texto;
  });
}
module.exports = contruirWORD;
