import { Router } from 'express';

const router = Router();

import AutentificacionController from '../controllers/AutentificacionController.js';

router.post('/autentificiacion', AutentificacionController.Autentificiacion)

export default router;