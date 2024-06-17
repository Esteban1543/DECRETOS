const AutentificacionModel = require('../models/AutentificacionModel')

class AutentificiacionController {
    static async Autentificiacion(req, res) {
        const validations = {
            user: /^[a-zA-Z0-9 ]*$/,
            password: /^(?!\s)(?=\S*[0-9])(?=\S*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])\S{2,}$/,
        };

        const { user, password } = req.body;

        if (validations.user.test(user) && validations.password.test(password)) {
        return await AutentificacionModel.Autentificiacion(user, password, res);
        }else{
        return res.json({
            status: false,
            error: `⛔ Los datos no son validos`,
            });
        }
    }
}

module.exports = AutentificiacionController