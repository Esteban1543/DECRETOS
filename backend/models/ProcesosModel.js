import conexion from "../conection/conexion.js";

class ProcesosModel {
    static async getLey(){
        try {
            const [ley] = await conexion.query(`
                SELECT * 
                FROM ley 
                ORDER BY id_ley DESC;
            `)

            return {
                status: true,
                message: '✅ Se genero con exito la consulta Ley',
                data: ley 
            }
        }catch(error){
            return {
                status: false,
                error: '⛔ Se genero un error interno con la base de datos',
                type: String(error)
            }
        }
    }

    static async getTipoEmbargo(){
        try {
            const [tipoEmbargo] = await conexion.query(`
                SELECT * 
                FROM tipo_embargo;
            `)

            return {
                status: true,
                message: '✅ Se genero con exito la consulta Tipo_Embargo',
                data: tipoEmbargo 
            }
        }catch(error){
            return {
                status: false,
                error: '⛔ Se genero un error interno con la base de datos',
                type: String(error)
            }
        }
    }
    
    static async getOrigen(){
        try {
            const [origen] = await conexion.query(`
                SELECT * 
                FROM origen;
            `)

            return {
                status: true,
                message: '✅ Se genero con exito la consulta Origen',
                data: origen 
            }
        }catch(error){
            return {
                status: false,
                error: '⛔ Se genero un error interno con la base de datos',
                type: String(error)
            }
        }
    }

    static async getProceso(){
        try {
            const [proceso] = await conexion.query(`
                SELECT * 
                FROM proceso;    
            `)

            return {
                status: true,
                message: '✅ Se genero con exito la consulta Proceso',
                data: proceso 
            }
        }catch(error){
            return {
                status: false,
                error: '⛔ Se genero un error interno con la base de datos',
                type: String(error)
            }
        }
    }
}

export default ProcesosModel