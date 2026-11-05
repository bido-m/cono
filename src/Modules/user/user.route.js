import { Router } from "express";
import * as user from "./user.controller.js";
import { authorization } from "../../middleware/authorization.middle.js";
import { authentication } from "../../middleware/authentication.middle.js";

const router = Router();

router.get("/profile",authentication,authorization(["admin"]),user.profile);
router.get("/",user.getAll);
router.route("/:id").get(user.getOne).put(user.update).delete(user.remove);

export default router;