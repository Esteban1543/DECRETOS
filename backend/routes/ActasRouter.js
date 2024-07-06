import { Router } from "express";

const router = Router();

import ActasController from "../controllers/ActasController.js"

router.post('/createActa', ActasController.createActa)

router.post('/downloadActa', ActasController.downloadActa)

export default router