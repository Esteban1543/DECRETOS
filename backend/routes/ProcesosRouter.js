import { Router } from "express";

const router = Router();

import ProcesosControllers from "../controllers/ProcesosController.js";

router.get('/ciudad', ProcesosControllers.getCiudad)

router.get('/tipo_embargo', ProcesosControllers.getTipoEmbargo)

router.get('/origen', ProcesosControllers.getOrigen)

router.get('/proceso', ProcesosControllers.getProceso)

router.post('/addProcesos', ProcesosControllers.addProcesos)

router.post('/desactivateProcesos', ProcesosControllers.desactivateProcesos)

export default router