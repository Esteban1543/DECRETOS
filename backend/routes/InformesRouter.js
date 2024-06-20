import { Router } from "express";

const router = Router();

import InformesController from "../controllers/InformesController.js"

router.get('/actasdigitador/:n_identificacion', InformesController.getActasVendedor)

router.get('/actasdigitadas', InformesController.getActasDigitadas)

export default router