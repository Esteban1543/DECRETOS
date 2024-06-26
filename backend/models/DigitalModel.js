import mail from '../assets/mail/mail.js'
import { contruirPDF } from '../assets/libs/pdfkit.js'
import conexion from '../conection/conexion.js'

import fs from 'fs'
import path from 'path'

class DigitalModel {
    static async sendMail(datosEncabezado, decretosAnexados, correo_digitador, fechaFormato) {
        try {
            const [adminitrador] = await conexion.query(`
                SELECT 
                    correo
                FROM usuarios u
                INNER JOIN datos_persona dp ON dp.n_identificacion = u.pfk_usuario
                WHERE alias = 'admin';
            `)
            
            contruirPDF(datosEncabezado, decretosAnexados);

            await transporter.sendMail({
                from: `<sistemadigitacionddne@gmail.com>`,
                to: `${adminitrador[0].correo}, ${correo_digitador}`,
                subject: `AutoDecretaMedida ${datosEncabezado.radicado} ${fechaFormato}`,
                text: `Estimado/a Digitador:\n \nJunto a este correo electrónico le enviamos la acta que realizó recientemente.`,
                attachments: [
                    {
                        filename: `AutoDecretaMedida_${datosEncabezado.radicado}.pdf`,
                        path: path.join(__dirname, `../assets/libs/docs/AutoDecretaMedida_${datosEncabezado.radicado}.pdf`), 
                    },
                ],
            });

            fs.unlink('../assets/libs/docs/AutoDecretaMedida_${datosEncabezado.radicado}.pdf')
        }catch(error){
            return {
                status: false,
                error: `⛔ Se genero un error interno al intentar enviar el correo`,
                type: String(error)
            }
        }
    }
}

export default DigitalModel