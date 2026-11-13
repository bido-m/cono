import { Router } from "express";
import categoryController from "./category.controller.js";
import { authorization } from "../../middleware/authorization.middle.js";
import { authentication } from "../../middleware/authentication.middle.js";
import { validationMiddle } from "../../middleware/validation.middle.js";
import apiAuth from "../../middleware/apiAuth.middelware.js";
import categoryValidation from "./category.validation.js";
const router = Router();
const managerAccess = [
  apiAuth,
  authentication,
  authorization(["admin", "branch_manager"]),
];
// create route
router.post(
  "/",
  ...managerAccess,
  validationMiddle(categoryValidation.createCategorySchema),
  categoryController.createCategory,
);
// getAll
router.get(
  "/",
  ...managerAccess,
  categoryController.getAllCategories,
);
// get by id
router.get(
  "/:id",
  ...managerAccess,
  validationMiddle(categoryValidation.getOrDeleteCategorySchema),
  categoryController.getCategoryById,
);
// update
router.put(
  "/:id",
  ...managerAccess,
  validationMiddle(categoryValidation.updateCategorySchema),
  categoryController.updateCategory,
);
// delete
router.delete(
  "/:id",
  ...managerAccess,
  validationMiddle(categoryValidation.getOrDeleteCategorySchema),
  categoryController.deleteCategory,
);
export default router;
