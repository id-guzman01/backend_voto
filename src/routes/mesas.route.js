import {Router} from "express";
import { method as mesasController } from "../controller/mesas.controller";
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.get("/:id",mesasController.select);

export default router;