import { Router } from 'express'

const router = Router();

import PersonaController from '../controllers/PersonasController.js'

router.get('/usuarios', PersonaController.getUsuarios)

router.post('/newUsuario', PersonaController.newUsuario)

router.patch('/editUsuario', PersonaController.editUsuario)

router.patch('/deactivateUsuario/:n_identificacion', PersonaController.deactivateUsuario)

router.patch('/activateUsuario/:n_identificacion', PersonaController.activateUsuario)

export default router;