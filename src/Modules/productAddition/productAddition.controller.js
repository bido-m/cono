import {
  successCreate,
  successUpdate,
  successFetch,
  successDelete,
} from "../../services/success.response.js";
import productAdditionService from "./productAddition.service.js";

const createProductAddition = async (req, res, next) => {
  try {
    const data = await productAdditionService.createProductAddition(req.body);
    successCreate({ res, data });
  } catch (error) {
    next(error);
  }
};

const getAllProductAdditions = async (req, res, next) => {
  try {
    const data = await productAdditionService.getAllProductAdditions();
    successFetch({ res, data });
  } catch (error) {
    next(error);
  }
};

const getProductAdditionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await productAdditionService.getProductAdditionById(id);
    successFetch({ res, data });
  } catch (error) {
    next(error);
  }
};

const updateProductAddition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await productAdditionService.updateProductAddition(
      id,
      req.body,
    );
    successUpdate({ res, data });
  } catch (error) {
    next(error);
  }
};

const deleteProductAddition = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productAdditionService.deleteProductAddition(id);
    successDelete({ res });
  } catch (error) {
    next(error);
  }
};

export default {
  createProductAddition,
  getAllProductAdditions,
  getProductAdditionById,
  updateProductAddition,
  deleteProductAddition,
};
