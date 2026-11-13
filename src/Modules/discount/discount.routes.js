import { Router } from "express";
import { authorization } from "../../middleware/authorization.middle.js";
import { authentication } from "../../middleware/authentication.middle.js";
import { validationMiddle } from "../../middleware/validation.middle.js";
import apiAuth from "../../middleware/apiAuth.middelware.js";
import discountValidation from "./discount.validation.js";
import discountController from "./discount.controller.js";
const router = Router();
const managerAccess = [
  apiAuth,
  authentication,
  authorization(["admin", "branch_manager"]),
];
// Create Discounts
router.post(
  "/",
  ...managerAccess,
  validationMiddle(discountValidation.createDiscountSchema),
  discountController.createDiscount,
);
//Get All Discounts
router.get("/", ...managerAccess, discountController.getAllDiscounts);
// Get By ID Discounts
router.get(
  "/:id",
  ...managerAccess,
  validationMiddle(discountValidation.IdSchema),
  discountController.getDiscountById,
);
// Update Discounts
router.put(
  "/:id",
  ...managerAccess,
  validationMiddle(discountValidation.updateDiscountSchema),
  discountController.updateDiscount,
);
// Delete Discounts
router.delete(
  "/:id",
  ...managerAccess,
  validationMiddle(discountValidation.IdSchema),
  discountController.deleteDiscount,
);
export default router;
