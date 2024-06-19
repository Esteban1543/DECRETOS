import conexion from '../conection/conexion.js'
import bcrypt from 'bcrypt'

class AutentificiacionModel {
    static async Autentificiacion(user, password) {
        try{
            const [usuario] = await conexion.query(`
                SELECT * 
                FROM usuarios 
                WHERE alias = ?;
            `,[user])
            
            if (!usuario[0]) {
                return {
                    status: false,
                    error: "⛔ La cuenta no esta creada",
                }
            }
    
            const passCompare = bcrypt.compareSync(
                password,
                usuario[0].contraseña
            );
    
            if (!passCompare) {
                return {
                status: false,
                error: "⛔ Los credenciales no son correctas",
                }
            }

            const [datos_persona] = await conexion.query(`
                SELECT 
                    id_persona, 
                    fk_tipo_identificacion, 
                    n_identificacion, 
                    nombre_1, 
                    nombre_2, 
                    apellido_1, 
                    apellido_2, 
                    telefono, 
                    correo,
                    alias,
                    estado_persona
                FROM datos_persona
                INNER JOIN usuarios ON id_persona = pfk_usuario
                WHERE pfk_usuario = ?;
            `, [usuario[0].pfk_usuario])

            if(datos_persona[0].estado_persona == '0'){
                return {
                status: false,
                error: "⛔ El usuario esta desactivado"
                }
            }
            
            return {
                status: true,
                message: "✅ Se verifico correctamente",
                data: {
                    rol: usuario[0].rol,
                    datos_persona,
            }}
        }catch(error){
            return {
                status: false,
                error: `⛔ Se genero un error interno con la base de datos`,
                type: String(error)
            }
        }
    }
}

export default AutentificiacionModel;
