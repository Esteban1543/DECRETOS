import AutentificacionModel from '../models/AutentificacionModel.js'

class AutentificiacionController {
    static async Autentificiacion(req, res) {
        const validations = {
            user: /^[a-zA-Z0-9 ]*$/,
            password: /^(?!\s)(?=\S*[0-9])(?=\S*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])\S{2,}$/,
            };

            const { user, password } = req.body;

            if (!validations.user.test(user)){
                return res.json({
                    status: false,
                    error: `⛔ El usuario no es valido`,
                });
            }

            if (!validations.password.test(password)){
                return res.json({
                    status: false,
                    error: `⛔ La contraseña no es valido`,
                });
            }

            return res.json(await AutentificacionModel.Autentificiacion(user, password))
    }
}

export default AutentificiacionController;