import { Router } from "express";
import * as branch from "./branch.controller.js";
import { authorization } from "../../middleware/authorization.middle.js";
import { authentication } from "../../middleware/authentication.middle.js";

const router = Router();

router.route("/").post(branch.add).get(branch.getAll);
router.route("/:id").get(branch.getOne).put(branch.update).patch(branch.switchAccept).delete(branch.remove);

export default router;