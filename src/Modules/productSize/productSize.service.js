import { productSizeModel } from "../../DB/Models/productSize.model.js";
import { productModel } from "../../DB/Models/product.model.js";
import { sizeModel } from "../../DB/Models/size.model.js";
import { orderDetailsModel } from "../../DB/Models/orderDetails.model.js";
import { AppError } from "../../utils/AppError.js";
import { Op } from "sequelize";
const createProductSize = async (data = {}) => {
  const { size_id, product_id, price } = data;

  const size = await sizeModel.findByPk(size_id);
  if (!size) {
    throw new AppError(404, "الحجم الذي أدخلته غير موجود أو تم حذفه مسبقاً");
  }

  const product = await productModel.findByPk(product_id);
  if (!product) {
    throw new AppError(404, "المنتج الذي أدخلته غير موجود أو تم حذفه مسبقاً");
  }

  const existProductSize = await productSizeModel.findOne({
    where: { product_id, size_id },
  });
  if (existProductSize) {
    throw new AppError(409, "هذا الحجم مضاف بالفعل لهذا المنتج مسبقاً");
  }

  return await productSizeModel.create({ product_id, size_id, price });
};
const getAllProductSizes = async () => {
  return await productSizeModel.findAll();
};
const getProductSizeById = async (id) => {
  const productSize = await productSizeModel.findByPk(id);
  if (!productSize) {
    throw new AppError(
      404,
      "الحجم المحدد لهذا المنتج غير موجود أو تم حذفه مسبقاً",
    );
  }
  return productSize;
};
const updateProductSize = async (id, data = {}) => {
  const { size_id, product_id, price } = data;

  const productSize = await productSizeModel.findByPk(id);
  if (!productSize) {
    throw new AppError(
      404,
      "الحجم المحدد لهذا المنتج غير موجود أو تم حذفه مسبقاً",
    );
  }

  productSize.set({
    size_id,
    product_id,
    price,
  });

  if (!productSize.changed()) {
    return productSize;
  }

  if (productSize.changed("size_id")) {
    const size = await sizeModel.findByPk(size_id);
    if (!size) {
      throw new AppError(404, "الحجم الجديد غير موجود أو تم حذفه مسبقاً");
    }
  }

  if (productSize.changed("product_id")) {
    const product = await productModel.findByPk(product_id);
    if (!product) {
      throw new AppError(404, "المنتج الجديد غير موجود أو تم حذفه مسبقاً");
    }
  }

  if (productSize.changed("size_id") || productSize.changed("product_id")) {
    const existProductSize = await productSizeModel.findOne({
      where: {
        product_id,
        size_id,
        id: { [Op.ne]: id },
      },
    });
    if (existProductSize) {
      throw new AppError(409, "هذا الحجم مضاف بالفعل لهذا المنتج مسبقاً");
    }
  }

  await productSize.save();
  return productSize;
};
const deleteProductSize = async (id) => {
  const productSize = await productSizeModel.findByPk(id);
  if (!productSize) {
    throw new AppError(
      404,
      "الحجم المحدد لهذا المنتج غير موجود أو تم حذفه مسبقاً",
    );
  }

  const isUsedInOrders = await orderDetailsModel.count({
    where: { product_size_id: id },
  });

  if (isUsedInOrders > 0) {
    throw new AppError(400, "لا يمكن حذف هذا الحجم لأنه مرتبط بطلبات سابقة");
  }

  await productSize.destroy();
  return true;
};
export default {
  createProductSize,
  getAllProductSizes,
  getProductSizeById,
  updateProductSize,
  deleteProductSize,
};
