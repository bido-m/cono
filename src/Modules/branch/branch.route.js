import { Router } from "express";
import * as branch from "./branch.controller.js";
import { authorization } from "../../middleware/authorization.middle.js";
import { authentication } from "../../middleware/authentication.middle.js";
import { validationMiddle } from "../../middleware/validation.middle.js";
import { branchSchema } from "./branch.validation.js";

const router = Router();

router.route("/")
.post(authentication,authorization(["admin"]),validationMiddle(branchSchema),branch.add)
.get(branch.getAll);

router.route("/:id")
.get(branch.getOne)
.put(validationMiddle(branchSchema),branch.update)
.patch(branch.switchAccept)
.delete(branch.remove);

export default router;