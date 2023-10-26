import {Router} from "express";
import { method as votosController } from "../controller/votos.controller";
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.post("/",authMiddleware.isLogged,votosController.insertAvance);

export default router;