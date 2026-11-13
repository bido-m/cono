import { productModel } from "../../DB/Models/product.model.js";
import { categoryModel } from "../../DB/Models/category.model.js";
import { AppError } from "../../utils/AppError.js";
import { Op } from "sequelize";
const createProduct = async (data = {}) => {
  const {
    category_id,
    product_name,
    description,
    image_url,
    is_available = true,
  } = data;

  const existCategory = await categoryModel.findByPk(category_id);
  if (!existCategory) {
    throw new AppError(404, "الصنف الذي ادخلته غير موجود او محذوف مسبقاً");
  }

  const existProduct = await productModel.findOne({
    where: { category_id, product_name },
  });
  if (existProduct) {
    throw new AppError(409, "هذا المنتج موجود في هذا الصنف مسبقاً");
  }

  return await productModel.create({
    category_id,
    product_name,
    description,
    image_url,
    is_available,
  });
};
const getAllProducts = async () => {
  return await productModel.findAll();
};
const getProductById = async (id) => {
  const product = await productModel.findByPk(id);
  if (!product) {
    throw new AppError(404, "المنتج غير موجود او محذوف مسبقاً");
  }
  return product;
};
const updateProduct = async (id, data = {}) => {
  const {
    category_id,
    product_name,
    description,
    image_url,
    is_available = true,
  } = data;

  const product = await productModel.findByPk(id);
  if (!product) {
    throw new AppError(404, "المنتج غير موجود او محذوف مسبقاً");
  }

  product.set({
    category_id,
    product_name,
    description,
    image_url,
    is_available,
  });

  if (!product.changed()) {
    return product;
  }

  if (product.changed("category_id")) {
    const category = await categoryModel.findByPk(category_id);
    if (!category) {
      throw new AppError(404, "الصنف الجديد غير موجود");
    }
  }

  if (product.changed("product_name") || product.changed("category_id")) {
    const duplicateProduct = await productModel.findOne({
      where: {
        category_id,
        product_name,
        id: { [Op.ne]: id },
      },
    });

    if (duplicateProduct) {
      throw new AppError(409, "هذا المنتج موجود في هذا الصنف مسبقاً");
    }
  }

  await product.save();
  return product;
};
const deleteProduct = async (id) => {
  const deletedProduct = await productModel.destroy({ where: { id } });
  if (!deletedProduct) {
    throw new AppError(404, "المنتج غير موجود او محذوف مسبقاً");
  }
  return true;
};
export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
