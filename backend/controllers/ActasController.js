import ActaModel from "../models/ActasModel.js"
import DigitalModel from "../models/DigitalModel.js";
import { contruirPDF } from "../assets/libs/pdfkit.js";
import fs from 'fs';
import path from "path";

class ActasController {
    static async createActa(req, res) {
        const validations = {
            noVacio: /.+?/gm,
        };
        
        const {
            id_digitador,
            correo_digitador,
            datosEncabezado,
            decretosAnexados
        } = req.body;

        const fechaActual = new Date();
        const fechaFormato = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1).toString().padStart(2, "0")}-${fechaActual.getDate().toString().padStart(2, "0")} ${fechaActual.getHours().toString().padStart(2, "0")}:${fechaActual.getMinutes().toString().padStart(2, "0")}:${fechaActual.getSeconds().toString().padStart(2, "0")}`;

        if (!validations.noVacio.test(id_digitador)){
            return res.json({
                status: false,
                error: '⛔ No valido el id_digitador'
            })
        }

        if (!validations.noVacio.test(datosEncabezado)){
            return res.json({
                status: false,
                error: '⛔ No valido los datosEncabezado'
            })
        }

        if (!validations.noVacio.test(decretosAnexados)){
            return res.json({
                status: false,
                error: '⛔ No valido los decretosAnexados'
            })
        }

        try {
            const respuesta = await ActaModel.createActa(id_digitador, datosEncabezado, decretosAnexados, fechaFormato);

            if(respuesta.status) await DigitalModel.sendMail(datosEncabezado, decretosAnexados, correo_digitador, fechaFormato);
            return res.json(respuesta)
        }catch(error){
            return {
                status: false,
                error: `⛔ Se genero un error interno con la base de datos`,
                type: String(error)
            }   
        }
    }

    static async downloadActa(req, res) {
        try {
            const { datosEncabezado, decretosAnexados } = req.body;
    
            //🔸 Ruta de PDF
            const filePath = await contruirPDF(datosEncabezado, decretosAnexados);

            //🔸 Envío de respuesta para descargar
            res.download(filePath, path.basename(filePath), (err) => {
                if (err) return console.error('Error enviando el PDF:', err);

                console.log('PDF envíado exitósamente');
                //🔸 Eliminar archivo despues de que la descargar en el front se haya realizado
                setTimeout(() => {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error eliminando el archivo:', err);
                        } else {
                            console.log('Archivo eliminado:', filePath);
                        }
                    });
                }, 30000);
                }
            );
        } catch(error) {
            return {
                status: false,
                error: `⛔ Error al intentar generar el PDF para la descarga`,
                type: String(error)
            }   
        }
    }
}

export default ActasController