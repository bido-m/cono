import { Router } from "express";
import { authorization } from "../../middleware/authorization.middle.js";
import { authentication } from "../../middleware/authentication.middle.js";
import { validationMiddle } from "../../middleware/validation.middle.js";
import apiAuth from "../../middleware/apiAuth.middelware.js";
import productAdditionValidation from "./productAddition.validation.js";
import productAdditionController from "./productAddition.controller.js";

const managerAccess = [
  apiAuth,
  authentication,
  authorization(["admin", "branch_manager"]),
];

const router = Router();

// Create
router.post(
  "/",
  ...managerAccess,
  validationMiddle(productAdditionValidation.createProductAdditionSchema),
  productAdditionController.createProductAddition,
);

// Get All
router.get(
  "/",
  ...managerAccess,
  productAdditionController.getAllProductAdditions,
);

// Get By Id
router.get(
  "/:id",
  ...managerAccess,
  validationMiddle(productAdditionValidation.IdSchema),
  productAdditionController.getProductAdditionById,
);

// Update
router.put(
  "/:id",
  ...managerAccess,
  validationMiddle(productAdditionValidation.updateProductAdditionSchema),
  productAdditionController.updateProductAddition,
);

// Delete
router.delete(
  "/:id",
  ...managerAccess,
  validationMiddle(productAdditionValidation.IdSchema),
  productAdditionController.deleteProductAddition,
);

export default router;
