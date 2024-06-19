import { Router } from "express";

const router = Router();

import ProcesosControllers from "../controllers/ProcesosController.js";

router.get('/ley', ProcesosControllers.getLey)

router.get('/tipo_embargo', ProcesosControllers.getTipoEmbargo)

router.get('/origen', ProcesosControllers.getOrigen)

router.get('/proceso', ProcesosControllers.getProceso)

export default router