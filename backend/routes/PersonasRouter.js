import { Router } from 'express'

const router = Router();

import PersonaController from '../controllers/PersonasController.js'

router.get('/usuarios', PersonaController.getUsuarios)

export default router;