import ProcesosModel from '../models/ProcesosModel.js'

class ProcesosControllers {
    static async getCiudad(req, res){
        try {
            res.json(await ProcesosModel.getCiudad())
        }catch(error) {
            res.json({
                status: false,
                error: '⛔ Se genero un error interno en el servidor',
                type: String(error)
            })
        }
    }

    static async getTipoEmbargo(req, res){
        try {
            res.json(await ProcesosModel.getTipoEmbargo())
        }catch(error) {
            res.json({
                status: false,
                error: '⛔ Se genero un error interno en el servidor',
                type: String(error)
            })
        }
    }

    static async getOrigen(req, res){
        try {
            res.json(await ProcesosModel.getOrigen())
        }catch(error) {
            res.json({
                status: false,
                error: '⛔ Se genero un error interno en el servidor',
                type: String(error)
            })
        }
    }

    static async getProceso(req, res){
        try {
            res.json(await ProcesosModel.getProceso())   
        }catch(error){
            res.json({
                status: false,
                error: '⛔ Se genero un error interno en el servidor',
                type: String(error)
            })
        }
    }

    
}

export default ProcesosControllers