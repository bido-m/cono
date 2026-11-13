import { productModel } from "../../DB/Models/product.model.js";
import { categoryModel } from "../../DB/Models/category.model.js";
import { discountModel } from "../../DB/Models/discount.model.js";
import { orderDetailsModel } from "../../DB/Models/orderDetails.model.js";
import { AppError } from "../../utils/AppError.js";
import { Op } from "sequelize";
const createDiscount = async (data = {}) => {
  const {
    name,
    category_id,
    product_id = null,
    type,
    value,
    starts_at,
    ends_at,
    is_active = true,
  } = data;

  const existCategory = await categoryModel.findByPk(category_id);
  if (!existCategory) {
    throw new AppError(404, "الصنف غير موجود");
  }

  if (product_id) {
    const existProduct = await productModel.findOne({
      where: { id: product_id, category_id },
      attributes: ["id"],
    });
    if (!existProduct) {
      throw new AppError(404, "المنتج غير موجود أو غير تابع للصنف المختار");
    }
  }

  const duplicateDiscount = await discountModel.findOne({
    where: {
      name,
      category_id,
      product_id: product_id || null,
    },
  });

  if (duplicateDiscount) {
    const errorMsg = product_id
      ? "هذا التخفيض موجود مسبقاً لهذا المنتج"
      : "هذا التخفيض موجود مسبقاً على مستوى هذا الصنف";
    throw new AppError(409, errorMsg);
  }

  return await discountModel.create({
    name,
    category_id,
    product_id: product_id || null,
    type,
    value,
    starts_at,
    ends_at,
    is_active,
  });
};
const getAllDiscounts = async () => {
  return await discountModel.findAll();
};
const getDiscountById = async (id) => {
  const discount = await discountModel.findByPk(id);
  if (!discount) {
    throw new AppError(404, "التخفيض المطلوب غير موجود او تم مسحه مسبقاً");
  }
  return discount;
};
const updateDiscount = async (id, data = {}) => {
  const {
    name,
    category_id,
    product_id = null,
    type,
    value,
    starts_at,
    ends_at,
    is_active = true,
  } = data;

  const discount = await discountModel.findByPk(id);
  if (!discount) {
    throw new AppError(404, "التخفيض المطلوب غير موجود أو تم مسحه مسبقاً");
  }

  discount.set({
    name,
    category_id,
    product_id,
    type,
    value,
    starts_at,
    ends_at,
    is_active,
  });

  if (!discount.changed()) {
    return discount;
  }

  if (discount.changed("category_id")) {
    const existCategory = await categoryModel.findByPk(category_id);
    if (!existCategory) {
      throw new AppError(404, "الصنف الجديد غير موجود");
    }
  }

  if (
    discount.product_id &&
    (discount.changed("product_id") || discount.changed("category_id"))
  ) {
    const existProduct = await productModel.findOne({
      where: { id: discount.product_id, category_id: discount.category_id },
      attributes: ["id"],
    });
    if (!existProduct) {
      throw new AppError(404, "المنتج غير موجود أو غير تابع للصنف المختار");
    }
  }

  const isIdentityChanged =
    discount.changed("name") ||
    discount.changed("category_id") ||
    discount.changed("product_id");

  if (isIdentityChanged) {
    const duplicateDiscount = await discountModel.findOne({
      where: {
        name: discount.name,
        category_id: discount.category_id,
        product_id: discount.product_id || null,
        id: { [Op.ne]: id },
      },
    });

    if (duplicateDiscount) {
      const errorMsg = discount.product_id
        ? "هذا التخفيض موجود مسبقاً لهذا المنتج"
        : "هذا التخفيض موجود مسبقاً على مستوى هذا الصنف";
      throw new AppError(409, errorMsg);
    }
  }

  await discount.save();
  return discount;
};
const deleteDiscount = async (id) => {
  const discount = await discountModel.findByPk(id);
  if (!discount) {
    throw new AppError(404, "التخفيض المطلوب غير موجود أو تم مسحه مسبقاً");
  }

  const isUsedInOrders = await orderDetailsModel.count({
    where: { discount_id: id },
  });

  if (isUsedInOrders > 0) {
    throw new AppError(
      400,
      "لا يمكن حذف هذا التخفيض لأنه مسجل في أوردرات سابقة، يمكنك إلغاء تفعيله (is_active: false) بدلاً من حذفه",
    );
  }

  await discount.destroy();
  return true;
};
export default {
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
};