import conexion from "../conection/conexion.js";
import bcrypt from "bcrypt"

class PersonaModel {
    static async getUsuarios(){
        try {
            const [usuarios] = await conexion.query(`
                SELECT
                    dp.fk_tipo_identificacion, 
                    dp.n_identificacion, 
                    u.alias,
                    u.rol,
                    dp.nombre_1,
                    dp.nombre_2,
                    dp.apellido_1,
                    dp.apellido_2,
                    dp.telefono,
                    dp.correo, 
                    dp.estado_persona
                FROM usuarios u
                INNER JOIN datos_persona dp ON dp.n_identificacion = u.pfk_usuario;
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

    static async newUsuario(fk_tipo_identificacion, n_identificacion, nombre_1, nombre_2, apellido_1, apellido_2, telefono, correo, alias, contraseña) {
        try{
            const hash = bcrypt.hashSync(contraseña, 10)

            const [datos_persona] = await conexion.query(`
                INSERT INTO datos_persona SET ?
            `, {
                fk_tipo_identificacion: fk_tipo_identificacion,
                n_identificacion: n_identificacion,
                nombre_1: nombre_1, 
                nombre_2: nombre_2, 
                apellido_1: apellido_1, 
                apellido_2: apellido_2, 
                telefono: telefono, 
                correo: correo,
                fk_tipo_persona: 2,
                estado_persona: 1,
            })

            const [usuario] = await conexion.query(`
                 INSERT INTO usuarios SET ?   
            `,{
                pfk_usuario: n_identificacion,
                alias: alias,
                contraseña: hash,
                rol: 2,
            })
            
            return {
                status: true,
                message: `✅ Se creo el usuario correctamente`,
            }

        }catch(error){
            return {
                status: false,
                error: `⛔ Se genero un error interno con la base de datos`,
                type: String(error)
            }
        }
    }

    static async editUsuario(n_identificacion, nombre_1, nombre_2, apellido_1, apellido_2, telefono, correo, alias, contraseña) {
        try{
            const hash = bcrypt.hashSync(contraseña, 10)

            const [datos_persona] = await conexion.query(`
                UPDATE datos_persona
                SET nombre_1 = ?,
                    nombre_2 = ?,
                    apellido_1 = ?,
                    apellido_2 = ?,
                    telefono = ?,
                    correo = ?
                WHERE n_identificacion = ?;
            `, [nombre_1, nombre_2, apellido_1, apellido_2, telefono, correo, n_identificacion])

            const [usuario] = await conexion.query(`
                UPDATE usuarios
                SET alias = ?,
                    contraseña = ?
                WHERE pfk_usuario = ?; 
            `, [alias, hash, n_identificacion])
            
            return {
                status: true,
                message: `✅ Se edito el usuario correctamente`,
            }

        }catch(error){
            return {
                status: false,
                error: `⛔ Se genero un error interno con la base de datos`,
                type: String(error)
            }
        }
    }

    static async deactivateUsuario(n_identificacion) {
        try {
            const [usuario] = await conexion.query(`
                UPDATE datos_persona 
                SET estado_persona = 0
                WHERE n_identificacion = ? AND fk_tipo_persona = 2;
            `, [n_identificacion])

            return {
                status: true,
                message: "✅ Se desactivo persona correctamente",
            }
        }catch(error){
            return {
                status: false,
                error: `⛔ Se genero un error interno con la base de datos`,
                type: String(error)
            }
        }
    }

    static async activateUsuario(n_identificacion) {
        try {
            const [usuario] = await conexion.query(`
                UPDATE datos_persona 
                SET estado_persona = 1
                WHERE n_identificacion = ? AND fk_tipo_persona = 2;
            `, [n_identificacion])

            return {
                status: true,
                message: "✅ Se activo persona correctamente",
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