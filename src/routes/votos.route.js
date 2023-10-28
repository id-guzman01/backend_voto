import {Router} from "express";
import { method as votosController } from "../controller/votos.controller";
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.post("/insert",votosController.insertAvance);
router.get("/selectTotalOneMesa/:id",votosController.selectOneMesa);
router.get("/selectSumatoriaAllMesas",votosController.selectSumatoriaAllMesas);

export default router;