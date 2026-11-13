import {
  successCreate,
  successUpdate,
  successFetch,
  successDelete,
} from "../../services/success.response.js";
import discountService from "./discount.service.js";
const createDiscount = async (req, res, next) => {
  try {
    const data = await discountService.createDiscount(req.body);
    successCreate({ res, data: data });
  } catch (error) {
    next(error);
  }
};
const getAllDiscounts = async (req, res, next) => {
  try {
    const data = await discountService.getAllDiscounts();
    successFetch({ res, data });
  } catch (error) {
    next(error);
  }
};
const getDiscountById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await discountService.getDiscountById(id);
    successFetch({ res, data });
  } catch (error) {
    next(error);
  }
};
const updateDiscount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await discountService.updateDiscount(id, req.body);
    successUpdate({ res, data });
  } catch (error) {
    next(error);
  }
};
const deleteDiscount = async (req, res, next) => {
  try {
    const { id } = req.params;
    await discountService.deleteDiscount(id);
    successDelete({ res });
  } catch (error) {
    next(error);
  }
};
export default {
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
};
