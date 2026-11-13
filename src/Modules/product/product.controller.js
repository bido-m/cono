import productService from "./product.service.js";
import {
  successCreate,
  successUpdate,
  successFetch,
  successDelete,
} from "../../services/success.response.js";
const createProduct = async (req, res, next) => {
  try {
    const data = await productService.createProduct(req.body);
    successCreate({ res, data });
  } catch (error) {
    next(error);
  }
};
const getAllProducts = async (req, res, next) => {
  try {
    const data = await productService.getAllProducts();
    successFetch({ res, data });
  } catch (error) {
    next(error);
  }
};
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await productService.getProductById(id);
    successFetch({ res, data });
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await productService.updateProduct(id, req.body);
    successUpdate({ res, data });
  } catch (error) {
    next(error);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    successDelete({ res });
  } catch (error) {
    next(error);
  }
};
export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
