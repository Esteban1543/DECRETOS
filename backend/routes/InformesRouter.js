import { Router } from "express";

const router = Router();

import InformesController from "../controllers/InformesController.js"

router.get('/actasdigitador/:n_identificacion', InformesController.getActasVendedor)

router.get('/actasdigitadas', InformesController.getActasDigitadas)

router.get('/ContadorActasDigitador', InformesController.getContadorActasDigitador)

export default router