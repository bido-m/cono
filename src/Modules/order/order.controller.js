import {
  createOrderService,
  getAllOrdersService,
  getOneOrderService,
  updateOrderStatusService,
} from "./order.service.js";
import { successCreate, successFetch, successUpdate } from "../../services/success.response.js";


export const createOrder = async (req, res, next) => {
  try {
    const data = await createOrderService(req.body);
    successCreate({ res, data });
  } catch (error) {
    return next(error);
  }
};


export const getAllOrders = async (req, res, next) => {
  try {
    const data = await getAllOrdersService({ user: req.user, query: req.query });
    successFetch({ res, data });
  } catch (error) {
    return next(error);
  }
};


export const getOneOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getOneOrderService({ id, user: req.user });
    successFetch({ res, data });
  } catch (error) {
    return next(error);
  }
};


export const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await updateOrderStatusService({ id, status, user: req.user });
    successUpdate({ res, data });
  } catch (error) {
    return next(error);
  }
};
