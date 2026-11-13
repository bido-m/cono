import {
  successCreate,
  successUpdate,
  successFetch,
  successDelete,
} from "../../services/success.response.js";
import additionService from "./addition.service.js";

const createAddition = async (req, res, next) => {
  try {
    const data =await additionService.createAddition(req.body);
    successCreate({ res, data });
  } catch (error) {
    next(error);
  }
};

const getAllAdditions = async (req, res, next) => {
  try {
    const data =await additionService.getAllAdditions();
    successFetch({ res, data });
  } catch (error) {
    next(error);
  }
};

const getAdditionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data =await additionService.getAdditionById(id);
    successFetch({ res, data });
  } catch (error) {
    next(error);
  }
};

const updateAddition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await additionService.updateAddition(id, req.body);
    successUpdate({ res, data });
  } catch (error) {
    next(error);
  }
};

const deleteAddition = async (req, res, next) => {
  try {
    const { id } = req.params;
    await additionService.deleteAddition(id);
    successDelete({ res });
  } catch (error) {
    next(error);
  }
};


export default {
    createAddition,
    getAllAdditions,
    getAdditionById,
    updateAddition,
    deleteAddition,
};