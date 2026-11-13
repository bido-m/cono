import { Router } from "express";
import { authorization } from "../../middleware/authorization.middle.js";
import { authentication } from "../../middleware/authentication.middle.js";
import { validationMiddle } from "../../middleware/validation.middle.js";
import apiAuth from "../../middleware/apiAuth.middelware.js";
import productController from "./product.controller.js";
import productValidation from "./product.validation.js";
const router = Router();
const managerAccess = [
  apiAuth,
  authentication,
  authorization(["admin", "branch_manager"]),
];
//Create Product
router.post(
  "/",
  ...managerAccess,
  validationMiddle(productValidation.createProductSchema),
  productController.createProduct,
);
//Get All Products
router.get("/", ...managerAccess, productController.getAllProducts);
//Get Product By Id
router.get(
  "/:id",
  ...managerAccess,
  validationMiddle(productValidation.IdSchema),
  productController.getProductById,
);
//Update Product
router.put(
  "/:id",
  ...managerAccess,
  validationMiddle(productValidation.updateProductSchema),
  productController.updateProduct,
);
//Delete Product
router.delete(
  "/:id",
  ...managerAccess,
  validationMiddle(productValidation.IdSchema),
  productController.deleteProduct,
);
export default router;
