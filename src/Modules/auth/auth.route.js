import { Router } from "express";
import * as auth from "./auth.controller.js";
import { validationMiddle } from "../../middleware/validation.middle.js";
import { registerSchema, loginSchema } from "./auth.validation.js";

const router = Router();

router.post("/register", validationMiddle(registerSchema), auth.register);
router.post("/login", validationMiddle(loginSchema), auth.login);

export default router;