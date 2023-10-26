import {Router} from "express";
import { method as authController } from "../controller/auth.controller";
import authValidator from "../validator/auth.validator";

const router = Router();

router.post("/",authController.createUser);
router.post("/login",
    authValidator.validateCreate,
    authController.login);

export default router;