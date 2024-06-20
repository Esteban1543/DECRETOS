import ActaModel from "../models/ActasModel.js"

class ActasController {
    static async createActa(req, res) {
        const validations = {
            noVacio: /.+?/gm,
        };
        
        const {
            id_digitador,
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
            return res.json(await ActaModel.createActa(id_digitador, datosEncabezado, decretosAnexados, fechaFormato))
        }catch(error){
            return {
                status: false,
                error: `⛔ Se genero un error interno con la base de datos`,
                type: String(error)
            }   
        }
    }
}

export default ActasController