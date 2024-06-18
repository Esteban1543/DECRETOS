import PersonasModel from '../models/PersonasModel.js'

class PersonasController {
    static async getUsuarios(req, res) {
        try {
            return res.json(await PersonasModel.getUsuarios())   
        }catch(error) {
            return res.json({
                status: false,
                error: '⛔ Existe error interno en el servidor',
                type: String(error)
            })
        }
    }
}

export default PersonasController;