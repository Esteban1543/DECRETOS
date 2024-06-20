import { error } from 'qrcode-terminal';
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

    static async newUsuario(req, res) {
        const validations = {
            fk_tipo_identificacion: /^[a-zA-Z]{2,4}$/,
            n_identificacion: /^[0-9]{0,14}$/,
            nombres: /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+ [A-Za-zÁÉÍÓÚáéíóúÑñ]+$/,
            telefono: /^[0-9]{1,14}$/,
            correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            alias: /^[a-zA-Z0-9 ]*$/,
            contraseña: /^(?!\s)(?=\S*[0-9])(?=\S*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])\S{2,}$/,
        };
        
        const {
            fk_tipo_identificacion,
            n_identificacion,
            nombres,
            apellidos,
            telefono,
            correo,
            alias,
            contraseña
        } = req.body;

        if(!validations.fk_tipo_identificacion.test(fk_tipo_identificacion)){
            return res.json({
                status: false,
                error: `⛔ El fk_tipo_identificacion no es valido`,
            });
        }

        if(!validations.n_identificacion.test(n_identificacion)){
            return res.json({
                status: false,
                error: `⛔ El n_identificacion no es valido`,
            });
        }

        if(!validations.nombres.test(nombres)){
            return res.json({
                status: false,
                error: `⛔ Los nombres no son validos`,
            });
        }

        if(!validations.nombres.test(apellidos)){
            return res.json({
                status: false,
                error: `⛔ Los apellidos no son validos`,
            });
        }

        if(!validations.telefono.test(telefono)){
            return res.json({
                status: false,
                error: `⛔ El telefono no es valido`,
            });
        }

        if(!validations.correo.test(correo)){
            return res.json({
                status: false,
                error: `⛔ El correo no es valido`,
            });
        }

        if(!validations.alias.test(alias)){
            return res.json({
                status: false,
                error: `⛔ El alias no es valido`,
            });
        }

        if(!validations.contraseña.test(contraseña)){
            return res.json({
                status: false,
                error: `⛔ La contraseña no es valida`,
            });
        }

        const [nombre_1, nombre_2] = nombres.split(" ");
        const [apellido_1, apellido_2] = apellidos.split(" ");

        try {
            return res.json(await PersonasModel.newUsuario( fk_tipo_identificacion,
                                                            n_identificacion,
                                                            nombre_1,
                                                            nombre_2,
                                                            apellido_1, 
                                                            apellido_2,
                                                            telefono,
                                                            correo,
                                                            alias,
                                                            contraseña ))   
        }catch(error) {
            return res.json({
                status: false,
                error: '⛔ Existe error interno en el servidor',
                type: String(error)
            })
        }
    }

    static async deactivateUsuario(req, res) {
        const validations = {
            noVacio: /.+?/gm,
        };
        
        const { n_identificacion } = req.params;

        if(!validations.noVacio.test(n_identificacion)) {
            return res.json({
                status: false,
                error: '⛔ No valido el n_identificacion'
            })
        }

        try{
            return res.json(await PersonasModel.deactivateUsuario(n_identificacion))
        }catch(error){
            return res.json({
                status: false,
                error: '⛔ Existe error interno en el servidor',
                type: String(error)
            })
        }
    }

    static async activateUsuario(req, res) {
        const validations = {
            noVacio: /.+?/gm,
        };
        
        const { n_identificacion } = req.params;

        if(!validations.noVacio.test(n_identificacion)) {
            return res.json({
                status: false,
                error: '⛔ No valido el n_identificacion'
            })
        }

        try{
            return res.json(await PersonasModel.activateUsuario(n_identificacion))
        }catch(error){
            return res.json({
                status: false,
                error: '⛔ Existe error interno en el servidor',
                type: String(error)
            })
        }
    }
}

export default PersonasController;