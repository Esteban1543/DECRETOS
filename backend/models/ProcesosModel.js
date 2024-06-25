import conexion from "../conection/conexion.js";

class ProcesosModel {
    static async getCiudad(){
        try {
            const [ley] = await conexion.query(`
                SELECT * 
                FROM ciudad;
            `)

            return {
                status: true,
                message: '✅ Se genero con exito la consulta ciudad',
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

    static async addProcesos(tipo, dato) {
        try {
            const [addProceso] = await conexion.query(`
                INSERT INTO ${tipo} SET ?    
            `, tipo == 'origen' ? { origen: dato, estado: 1} : tipo == 'ciudad' ? {ciudad: dato, estado: 1} : tipo == 'proceso' ? {proceso: dato, estado: 1} : null )

            return {
                status: true,
                message: '✅ Se agrego correctamente el proceso',
            }
        }catch(error){
            return {
                status: false,
                error: '⛔ Se genero un error interno con la base de datos',
                type: String(error)
            }
        }
    }

    static async desactivateProcesos(tipo, dato) {
        try {
            const [desactivateProcesos] = await conexion.query(`
                UPDATE ${tipo}
                SET estado = 0
                WHERE ${tipo} = ?
            `, [dato])

            return {
                status: true,
                message: '✅ Se desactivo correctamente el proceso',
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