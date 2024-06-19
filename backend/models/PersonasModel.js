import conexion from "../conection/conexion.js";

class PersonaModel {
    static async getUsuarios(){
        try {
            const [usuarios] = await conexion.query(`
                SELECT 
                    dp.id_persona, 
                    dp.fk_tipo_identificacion, 
                    dp.n_identificacion, 
                    u.alias,
                    u.rol,
                    CONCAT(dp.nombre_1,' ',dp.apellido_1) AS nombres,
                    dp.telefono, dp.direccion, 
                    dp.correo, 
                    dp.estado_persona
                FROM usuarios u
                INNER JOIN datos_persona dp ON dp.id_persona = u.pfk_usuario
                ORDER BY dp.id_persona DESC;    
            `)
            
            return {
                status: true,
                message: `✅ Se genero la consulta usuarios correctamente`,
                data: usuarios
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

export default PersonaModel