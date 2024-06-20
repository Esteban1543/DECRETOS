import { Router } from "express";

const router = Router();

import InformesController from "../controllers/InformesController.js"

router.get('/actasvendedor/:n_identificacion', InformesController.getActasVendedor)

export default router