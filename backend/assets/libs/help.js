// Texto antes de los Decretos
export const texto = 'El juzgado, atendiendo la solicitud de cautela realizada por la parte actora, y por estimarla procedente,';

// Funcion para bajar renglones en los datos de Encabezado
export function moverAbajo(doc, dato) {
    const largo = dato.length;
    let down = 0;
  
    for (let i = 100; i <= largo; i += 50) {
      down++;
    }
  
    return doc.moveDown(down);
}

// Funcion para llenar la descipcion con los datos
export const seteoDatosDecretos = (descripcion, dataInputs, demandado) => {
  const desc_demandado = descripcion.replace('°##', demandado || '-Demandado-');

  let decreto = desc_demandado;

  Object.values(dataInputs).forEach((value) => {
    decreto = decreto.replace('°', value.toString() || '-DATO SIN DILIGENCIAR-');
  });

  return decreto;
};

// Funcion para generar el parrafo en el PDF
export const seteoIdentificador = (doc, datosDecreto, demandado) => {
  const ubicaciones = ['PRIMERO: ', 'SEGUNDO: ', 'TERCERO: ', 'CUARTO: ', 'QUINTO: ', 'SEXTO: ', 'SEPTIMO: ', 'OCTAVO: ', 'NOVENO: ', 'DÉCIMO: '];

  datosDecreto.forEach((decreto, index) => {
    const { descripcion, dataInputs, leyes } = decreto;
    let parrafo = seteoDatosDecretos(descripcion, dataInputs, demandado);

    doc
      .font('Helvetica-Bold')
      .text(ubicaciones[index], { continued: true, lineGap: 8 });

    doc
      .text(parrafo.slice(0, 33), { continued: true, lineGap: 8 });

    doc
      .font('Helvetica')
      .text(parrafo.slice(33), { lineGap: 8 });

    doc.moveDown(1);

    doc.text(leyes, { lineGap: 8 });

    doc.moveDown(1);
  });
};

// Funcion para generar el formateo de fecha (Disponible solo hasta el año 2030)
const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
const numberToWords = {
    0: "cero", 1: "uno", 2: "dos", 3: "tres", 4: "cuatro", 5: "cinco", 6: "seis", 7: "siete", 8: "ocho", 9: "nueve",
    10: "diez", 11: "once", 12: "doce", 13: "trece", 14: "catorce", 15: "quince", 16: "dieciséis", 17: "diecisiete",
    18: "dieciocho", 19: "diecinueve", 20: "veinte", 21: "veintiuno", 22: "veintidós", 23: "veintitrés",
    24: "veinticuatro", 25: "veinticinco", 26: "veintiséis", 27: "veintisiete", 28: "veintiocho", 29: "veintinueve",
    30: "treinta", 31: "treinta y uno"
  };
const numberToWordsYear = {
    2000: "dos mil", 2001: "dos mil uno", 2002: "dos mil dos", 2003: "dos mil tres", 2004: "dos mil cuatro",
    2005: "dos mil cinco", 2006: "dos mil seis", 2007: "dos mil siete", 2008: "dos mil ocho", 2009: "dos mil nueve",
    2010: "dos mil diez", 2011: "dos mil once", 2012: "dos mil doce", 2013: "dos mil trece", 2014: "dos mil catorce",
    2015: "dos mil quince", 2016: "dos mil dieciséis", 2017: "dos mil diecisiete", 2018: "dos mil dieciocho",
    2019: "dos mil diecinueve", 2020: "dos mil veinte", 2021: "dos mil veintiuno", 2022: "dos mil veintidós",
    2023: "dos mil veintitrés", 2024: "dos mil veinticuatro", 2025: "dos mil veinticinco", 2026: "dos mil veintiseis",
    2027: "dos mil veintisiete", 2028: "dos mil veintiocho", 2029: "dos mil veintinueve", 2030: "dos mil treinta"
  };
export const fechaTexto = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    const dayText = numberToWords[day];
    const monthText = monthNames[month];
    const yearText = numberToWordsYear[year];
  
    return `${dayText} (${day}) de ${monthText} de ${yearText} (${year})`;
  };