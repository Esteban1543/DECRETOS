const conexion = require("../conection/conexion.js");
const bcrypt = require('bcrypt')

class AutentificiacionModel {
    static async Autentificiacion(user, password, res) {
        conexion.query(`
                SELECT * 
                FROM usuarios 
                WHERE alias = ?;
            `, [user],
            function (err, results) {
            if (err) {
                return res.json({
                status: false,
                error: "⛔ No fue posible completar la query",
                type: err,
                });
            }
    
            if (!results[0]) {
                return res.status(500).json({
                status: false,
                error: "⛔ La cuenta no esta creada",
                });
            }
    
            const passCompare = bcrypt.compareSync(
                password,
                results[0].contraseña
            );
    
            if (!passCompare) {
                return res.status(500).json({
                status: false,
                error: "⛔ Los credenciales no son correctas",
                });
            }
    
            const rol = results[0].rol;
    
            conexion.query(`
                    SELECT 
                        id_persona, 
                        fk_tipo_identificacion, 
                        n_identificacion, 
                        nombre_1, 
                        nombre_2, 
                        apellido_1, 
                        apellido_2, 
                        telefono, 
                        direccion, 
                        correo, 
                        alias,
                        estado_persona
                    FROM datos_persona
                    INNER JOIN usuarios ON id_persona = pfk_usuario
                    WHERE pfk_usuario = ?;
            `,[results[0].pfk_usuario],
                function (err, results) {
                if (err) {
                    return res.json({
                    status: false,
                    error: "⛔ No fue posible completar la query",
                    type: err,
                    });
                }
    
                if(results[0].estado_persona == '0'){
                    return res.json({
                    status: false,
                    error: "⛔ El usuario esta desactivado",
                    type: err,
                    });
                }
                
                console.log({
                    rol: rol,
                    results,
                })
    
                return res.json({
                    status: true,
                    message: "✅ Se verifico correctamente",
                    data: {
                    rol: rol,
                    results,
                    },
                });
                }
            );
            }
        );
    }
}

module.exports = AutentificiacionModel
