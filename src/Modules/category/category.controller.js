import categoryService from "./category.service.js";
import {
  successCreate,
  successUpdate,
  successFetch,
  successDelete,
} from "../../services/success.response.js";
const createCategory = async (req, res, next) => {
  try {
    const data = await categoryService.createCategory(req.body);
    successCreate({ res, data });
  } catch (error) {
    next(error);
  }
};
const getAllCategories = async (req, res, next) => {
  try {
    const data = await categoryService.getAllCategories();
    successFetch({ res, data });
  } catch (error) {
    next(error);
  }
};
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await categoryService.getCategoryById(id);
    successFetch({ res, data });
  } catch (error) {
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await categoryService.updateCategory(id, req.body);
    successUpdate({ res, data });
  } catch (error) {
    next(error);
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(id);
    successDelete({ res });
  } catch (error) {
    next(error);
  }
};
export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
