import { Router } from "express";
import { authorization } from "../../middleware/authorization.middle.js";
import { authentication } from "../../middleware/authentication.middle.js";
import { validationMiddle } from "../../middleware/validation.middle.js";
import apiAuth from "../../middleware/apiAuth.middelware.js";
import productSizeValidation from "./productSize.validation.js";
import productSizeController from "./productSize.controller.js";
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
  validationMiddle(productSizeValidation.createProductSizeSchema),
  productSizeController.createProductSize,
);
// Get All
router.get("/", ...managerAccess, productSizeController.getAllProductSizes);
// Get By Id
router.get(
  "/:id",
  ...managerAccess,
  validationMiddle(productSizeValidation.IdSchema),
  productSizeController.getProductSizeById,
);
// Update
router.put(
  "/:id",
  ...managerAccess,
  validationMiddle(productSizeValidation.updateProductSizeSchema),
  productSizeController.updateProductSize,
);
// Delete
router.delete(
  "/:id",
  ...managerAccess,
  validationMiddle(productSizeValidation.IdSchema),
  productSizeController.deleteProductSize,
);
export default router;
