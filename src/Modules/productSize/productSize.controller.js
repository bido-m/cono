import {
  successCreate,
  successUpdate,
  successFetch,
  successDelete,
} from "../../services/success.response.js";
import productSizeService from "./productSize.service.js";
const createProductSize = async (req, res, next) => {
  try {
    const data = await productSizeService.createProductSize(req.body);
    successCreate({ res, data });
  } catch (error) {
    next(error);
  }
};
const getAllProductSizes = async (req, res, next) => {
  try {
    const data = await productSizeService.getAllProductSizes();
    successFetch({ res, data });
  } catch (error) {
    next(error);
  }
};
const getProductSizeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await productSizeService.getProductSizeById(id);
    successFetch({ res, data });
  } catch (error) {
    next(error);
  }
};
const updateProductSize = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await productSizeService.updateProductSize(id, req.body);
    successUpdate({ res, data });
  } catch (error) {
    next(error);
  }
};
const deleteProductSize = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productSizeService.deleteProductSize(id);
    successDelete({ res });
  } catch (error) {
    next(error);
  }
};
export default {
  createProductSize,
  getAllProductSizes,
  getProductSizeById,
  updateProductSize,
  deleteProductSize,
};
