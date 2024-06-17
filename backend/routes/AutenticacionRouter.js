import { Router } from 'express';

const router = Router();

import AutentificacionController from '../controllers/AutentificacionController.js';

router.post('/Autentificiacion', AutentificacionController.Autentificiacion)

export default router;