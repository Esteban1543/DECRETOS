const { Router } = require('express');

const router = Router();

const AutentificacionController = require('../controllers/AutentificacionController.js')

router.post('/Autentificiacion', AutentificacionController.Autentificiacion)

module.exports = router;