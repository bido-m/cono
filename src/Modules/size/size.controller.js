import {
  successCreate,
  successUpdate,
  successFetch,
  successDelete,
} from "../../services/success.response.js";
import sizeService from "./size.service.js";
const creatSize = async (req, res, next) => {
  try {
    const data = await sizeService.creatSize(req.body);
    successCreate({ res, data });
  } catch (error) {
    next(error);
  }
};
const getAllSizes = async (req, res, next) => {
  try {
    const data = await sizeService.getAllSizes();
    successFetch({ res, data });
  } catch (error) {
    next(error);
  }
};
const getSizeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await sizeService.getSizeById(id);
    successFetch({ res, data });
  } catch (error) {
    next(error);
  }
};
const updateSize = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await sizeService.updateSize(id, req.body);
    successUpdate({ res, body });
  } catch (error) {
    next(error);
  }
};
const deleteSize = async (req, res, next) => {
  try {
    const { id } = req.params;
    await sizeService.deleteSize(id);
    successDelete({ res });
  } catch (error) {
    next(error);
  }
};
export default {
  creatSize,
  getAllSizes,
  getSizeById,
  updateSize,
  deleteSize,
};
