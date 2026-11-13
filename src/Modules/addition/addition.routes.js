import { Router } from "express";
import additionController from "./addition.controller.js";
import { authorization } from "../../middleware/authorization.middle.js";
import { authentication } from "../../middleware/authentication.middle.js";
import { validationMiddle } from "../../middleware/validation.middle.js";
import apiAuth from "../../middleware/apiAuth.middelware.js";
import additionSchema from "./addition.validation.js";

const router = Router();

const managerAccess = [
  apiAuth,
  authentication,
  authorization(["admin", "branch_manager"]),
];

// Create
router.post(
  "/",
  ...managerAccess,
  validationMiddle(additionSchema.createAdditionSchema),
  additionController.createAddition,
);

// Get All
router.get("/", ...managerAccess, additionController.getAllAdditions);

// Get By ID
router.get(
  "/:id",
  ...managerAccess,
  validationMiddle(additionSchema.IdSchema),
  additionController.getAdditionById,
);

// Update
router.put(
  "/:id",
  ...managerAccess,
  validationMiddle(additionSchema.updateAdditionSchema),
  additionController.updateAddition,
);

// Delete
router.delete(
  "/:id",
  ...managerAccess,
  validationMiddle(additionSchema.IdSchema),
  additionController.deleteAddition,
);

export default router;
