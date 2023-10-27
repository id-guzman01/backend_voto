import {Router} from "express";
import { method as sitioController } from "../controller/sitio.controller";
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.get("/",sitioController.select);

export default router;