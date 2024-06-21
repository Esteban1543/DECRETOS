import conexion from "../conection/conexion.js"

class InformesModel {
    static async getActasVendedor(n_identificacion) {
        try {
            const [ventasVendedor] = await conexion.query(`
                SELECT 
                    ae.id_acta, 
                    ae.fecha_registro,
                    hd.fk_proceso AS proceso,
                    hd.demandante,
                    hd.demandado,
                    hd.provincia,
                    hd.fk_ciudad,
                    GROUP_CONCAT(dd.fk_embargo) AS decretos
                FROM acta_embargo ae
                INNER JOIN historial_decretos hd ON hd.fkp_historial_decretos = ae.id_acta
                INNER JOIN datos_decretos dd ON dd.fkp_id_datos_decreto = ae.id_acta
                WHERE ae.fk_id_usuario = ?
                GROUP BY ae.id_acta;    
            `, [n_identificacion])

            return {
                status: true,
                message: `✅ Se genero la consulta actas digitador correctamente`,
                data: ventasVendedor
            }
        }catch(error){
            return {
                status: false,
                error: `⛔ Se genero un error interno con la base de datos`,
                type: String(error)
            }
        }
    }

    static async getActasDigitadas() {
        try {
            const [actasDigitadas] = await conexion.query(`
                SELECT 
                    ae.id_acta, 
                    ae.fecha_registro,
                    hd.fk_proceso AS proceso,
                    hd.demandante,
                    hd.demandado,
                    hd.provincia,
                    hd.fk_ciudad,
                    GROUP_CONCAT(dd.fk_embargo) AS decretos
                FROM acta_embargo ae
                INNER JOIN historial_decretos hd ON hd.fkp_historial_decretos = ae.id_acta
                INNER JOIN datos_decretos dd ON dd.fkp_id_datos_decreto = ae.id_acta
                GROUP BY ae.id_acta
                ORDER BY ae.fecha_registro DESC;    
            `)

            return {
                status: true,
                message: `✅ Se genero la consulta actas digitadas correctamente`,
                data: actasDigitadas
            }
        }catch(error){
            return {
                status: false,
                error: `⛔ Se genero un error interno con la base de datos`,
                type: String(error)
            }
        }
    }
}

export default InformesModel