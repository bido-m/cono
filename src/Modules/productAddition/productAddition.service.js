import { productAdditionModel } from "../../DB/Models/productAddition.model.js";
import { productModel } from "../../DB/Models/product.model.js";
import { additionModel } from "../../DB/Models/addition.model.js";
import { AppError } from "../../utils/AppError.js";
import { Op } from "sequelize";

const createProductAddition = async (data = {}) => {
  const { product_id, addition_id, price = 0 } = data;

  const product = await productModel.findByPk(product_id);
  if (!product) {
    throw new AppError(404, "المنتج المحدد غير موجود أو تم حذفه مسبقاً");
  }

  const addition = await additionModel.findByPk(addition_id);
  if (!addition) {
    throw new AppError(404, "الإضافة المحددة غير موجودة أو تم حذفها مسبقاً");
  }

  const existProductAddition = await productAdditionModel.findOne({
    where: { product_id, addition_id },
  });
  if (existProductAddition) {
    throw new AppError(409, "هذه الإضافة مضافة بالفعل لهذا المنتج مسبقاً");
  }

  return await productAdditionModel.create({
    product_id,
    addition_id,
    price,
  });
};

const getAllProductAdditions = async () => {
  return await productAdditionModel.findAll();
};

const getProductAdditionById = async (id) => {
  const productAddition = await productAdditionModel.findByPk(id);
  if (!productAddition) {
    throw new AppError(
      404,
      "إضافة المنتج المحددة غير موجودة أو تم حذفها مسبقاً",
    );
  }
  return productAddition;
};

const updateProductAddition = async (id, data = {}) => {
  const { product_id, addition_id, price = 0 } = data;

  const productAddition = await productAdditionModel.findByPk(id);
  if (!productAddition) {
    throw new AppError(
      404,
      "إضافة المنتج المراد تعديلها غير موجودة أو تم حذفها مسبقاً",
    );
  }

  productAddition.set({
    product_id,
    addition_id,
    price,
  });

  if (!productAddition.changed()) {
    return productAddition;
  }

  if (productAddition.changed("product_id")) {
    const product = await productModel.findByPk(product_id);
    if (!product) {
      throw new AppError(404, "المنتج الجديد غير موجود أو تم حذفه مسبقاً");
    }
  }

  if (productAddition.changed("addition_id")) {
    const addition = await additionModel.findByPk(addition_id);
    if (!addition) {
      throw new AppError(404, "الإضافة الجديدة غير موجودة أو تم حذفها مسبقاً");
    }
  }

  if (
    productAddition.changed("product_id") ||
    productAddition.changed("addition_id")
  ) {
    const existProductAddition = await productAdditionModel.findOne({
      where: {
        product_id,
        addition_id,
        id: { [Op.ne]: id },
      },
    });

    if (existProductAddition) {
      throw new AppError(409, "هذه الإضافة مضافة بالفعل لهذا المنتج مسبقاً");
    }
  }

  await productAddition.save();
  return productAddition;
};

const deleteProductAddition = async (id) => {
  const productAddition = await productAdditionModel.findByPk(id);
  if (!productAddition) {
    throw new AppError(
      404,
      "إضافة المنتج المراد حذفها غير موجودة أو تم حذفها مسبقاً",
    );
  }

  await productAddition.destroy();
  return true;
};

export default {
  createProductAddition,
  getAllProductAdditions,
  getProductAdditionById,
  updateProductAddition,
  deleteProductAddition,
};
