import InformesModel from "../models/InformesModel.js"

class InformesController {
    static async getActasVendedor(req, res) {
        const validations = {
            noVacio: /.+?/gm,
        };
        
        const { n_identificacion } = req.params;

        if(!validations.noVacio.test(n_identificacion)) {
            return res.json({
                status: false,
                error: '⛔ No valido el n_identificacion'
            })
        }

        try {
            return res.json(await InformesModel.getActasVendedor(n_identificacion))
        }catch(error){
            return res.json({
                status: false,
                error: '⛔ Existe error interno en el servidor',
                type: String(error)
            })
        }
    }

    static async getActasDigitadas(req, res) {
        try {
            return res.json(await InformesModel.getActasDigitadas())
        }catch(error){
            return res.json({
                status: false,
                error: '⛔ Existe error interno en el servidor',
                type: String(error)
            })
        }
    }
}

export default InformesController