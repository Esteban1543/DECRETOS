import transporter from '../assets/mail/mail.js';
import { contruirPDF } from '../assets/libs/pdfkit.js';
import conexion from '../conection/conexion.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DigitalModel {
    static async sendMail(datosEncabezado, decretosAnexados, correo_digitador, fechaFormato) {
        try {
            const [adminitrador] = await conexion.query(`
                SELECT 
                    correo
                FROM usuarios u
                INNER JOIN datos_persona dp ON dp.n_identificacion = u.pfk_usuario
                WHERE alias = 'admin';
            `);

            const filePath = await contruirPDF(datosEncabezado, decretosAnexados);

            const info = await transporter.sendMail({
                from: `<sistemadigitacionddne@gmail.com>`,
                to: `${adminitrador[0].correo}, ${correo_digitador}`,
                subject: `AutoDecretaMedida ${datosEncabezado.radicado} ${fechaFormato}`,
                text: `Estimado/a Digitador:\n \nJunto a este correo electrónico le enviamos la acta que realizó recientemente.`,
                attachments: [
                    {
                        filename: `AutoDecretaMedida_${datosEncabezado.radicado}.pdf`,
                        path: filePath 
                    },
                ],
            });

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error eliminando el archivo:', err);
                } else {
                    console.log('Archivo eliminado:', filePath);
                }
            });

            return {
                status: true,
                info: info
            };
        } catch (error) {
            return {
                status: false,
                error: `⛔ Se generó un error interno al intentar enviar el correo`,
                type: String(error)
            };
        }
    }
}

export default DigitalModel;
