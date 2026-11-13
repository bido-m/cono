import { Router } from "express";
import { authorization } from "../../middleware/authorization.middle.js";
import { authentication } from "../../middleware/authentication.middle.js";
import { validationMiddle } from "../../middleware/validation.middle.js";
import apiAuth from "../../middleware/apiAuth.middelware.js";
import sizeValidation from "./size.validation.js";
import sizeController from "./size.controller.js";
const managerAccess = [
  apiAuth,
  authentication,
  authorization(["admin", "branch_manager"]),
];
const router = Router();
//Create
router.post(
  "/",
  ...managerAccess,
  validationMiddle(sizeValidation.createSizeSchema),
  sizeController.creatSize,
);
//Get All
router.get("/", ...managerAccess, sizeController.getAllSizes);
//Get By Id
router.get(
  "/:id",
  ...managerAccess,
  validationMiddle(sizeValidation.IdSchema),
  sizeController.getSizeById,
);
//Update
router.put(
  "/:id",
  ...managerAccess,
  validationMiddle(sizeValidation.updateSizeSchema),
  sizeController.updateSize,
);
//Delete
router.delete(
  "/:id",
  ...managerAccess,
  validationMiddle(sizeValidation.IdSchema),
  sizeController.deleteSize,
);
export default router;
