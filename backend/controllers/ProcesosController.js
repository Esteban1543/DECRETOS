import ProcesosModel from '../models/ProcesosModel.js'

class ProcesosControllers {
    static async getCiudad(req, res){
        try {
            return res.json(await ProcesosModel.getCiudad())
        }catch(error) {
            return res.json({
                status: false,
                error: '⛔ Se genero un error interno en el servidor',
                type: String(error)
            })
        }
    }

    static async getTipoEmbargo(req, res){
        try {
            return res.json(await ProcesosModel.getTipoEmbargo())
        }catch(error) {
            return res.json({
                status: false,
                error: '⛔ Se genero un error interno en el servidor',
                type: String(error)
            })
        }
    }

    static async getOrigen(req, res){
        try {
            return res.json(await ProcesosModel.getOrigen())
        }catch(error) {
            return res.json({
                status: false,
                error: '⛔ Se genero un error interno en el servidor',
                type: String(error)
            })
        }
    }

    static async getProceso(req, res){
        try {
            return res.json(await ProcesosModel.getProceso())   
        }catch(error){
            return res.json({
                status: false,
                error: '⛔ Se genero un error interno en el servidor',
                type: String(error)
            })
        }
    }

    static async addProcesos(req, res) {
        const validation = {
            noVacio: /\S/
        }
        
        const {
            tipo,
            dato,
            estado
        } = req.body;

        if(!validation.noVacio.test(tipo) && !validation.noVacio.test(dato)) {
            return res.json({
                status: false,
                error: '⛔ Llegaron datos vacios',
            })
        }

        if(tipo != 'origen' && tipo != 'ciudad' && tipo != 'proceso'){
            return res.json({
                status: false,
                error: '⛔ No cumple con la categorias requeridas (origen, ciudad, proceso)',
            })
        }

        try {
            return res.json(await ProcesosModel.addProcesos(tipo, dato))
        }catch(error){
            return res.json({
                status: false,
                error: '⛔ Se genero un error interno en el servidor',
                type: String(error)
            })
        }
    }

    static async ativateORdesactivateProcesos(req, res) {
        const validation = {
            noVacio: /\S/
        }
        
        const {
            tipo,
            dato,
            estado
        } = req.body;

        if(!validation.noVacio.test(tipo) && !validation.noVacio.test(dato) && !validation.noVacio.test(estado)) {
            return res.json({
                status: false,
                error: '⛔ Llegaron datos vacios',
            })
        }

        if(tipo != 'origen' && tipo != 'ciudad' && tipo != 'proceso'){
            return res.json({
                status: false,
                error: '⛔ No cumple con la categorias requeridas (origen, ciudad, proceso)',
            })
        }

        if(estado != 0 && estado != 1) {
            return res.json({
                status: false,
                error: '⛔ El estado no es valido (Desactivar = 0, Activar = 1)',
            })
        }

        try {
            return res.json(await ProcesosModel.ativateORdesactivateProcesos(tipo, dato, estado))
        }catch(error){
            return res.json({
                status: false,
                error: '⛔ Se genero un error interno en el servidor',
                type: String(error)
            })
        }
    }
    
}

export default ProcesosControllers