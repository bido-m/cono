import { categoryModel } from "../../DB/Models/category.model.js";
import { branchModel } from "../../DB/Models/branch.model.js";
import { productModel } from "../../DB/Models/product.model.js";
import { discountModel } from "../../DB/Models/discount.model.js";
import { AppError } from "../../utils/AppError.js";
import { Op } from "sequelize";
const createCategory = async (data = {}) => {
  const { branch_id, name } = data;

  const existBranch = await branchModel.findByPk(branch_id);
  if (!existBranch) {
    throw new AppError(404, "الفرع المحدد غير موجود");
  }

  const existCategory = await categoryModel.findOne({
    where: { branch_id, name },
  });
  if (existCategory) {
    throw new AppError(409, "هذا الصنف مدرج مسبقاً في هذا الفرع");
  }

  return await categoryModel.create({ branch_id, name });
};
const getAllCategories = async () => {
  return await categoryModel.findAll();
};
const getCategoryById = async (id) => {
  const category = await categoryModel.findByPk(id);
  if (!category) {
    throw new AppError(404, "هذا الصنف غير موجود أو تم حذفه مسبقاً");
  }
  return category;
};
const updateCategory = async (id, data = {}) => {
  const { branch_id, name } = data;

  const category = await categoryModel.findByPk(id);
  if (!category) {
    throw new AppError(404, "الصنف غير موجود أو تم حذفه مسبقاً");
  }

  category.set({ branch_id, name });

  if (!category.changed()) {
    return category;
  }

  if (category.changed("branch_id")) {
    const existBranch = await branchModel.findByPk(branch_id);
    if (!existBranch) {
      throw new AppError(404, "الفرع الجديد غير موجود");
    }
  }

  if (category.changed("name") || category.changed("branch_id")) {
    const duplicatedCategory = await categoryModel.findOne({
      where: {
        branch_id,
        name,
        id: { [Op.ne]: id },
      },
    });

    if (duplicatedCategory) {
      throw new AppError(409, "اسم الصنف موجود في هذا الفرع مسبقاً");
    }
  }

  await category.save();

  return category;
};
const deleteCategory = async (id) => {
  const category = await categoryModel.findByPk(id);
  if (!category) {
    throw new AppError(404, "هذا الصنف غير موجود أو تم حذفه مسبقاً");
  }

  const [relatedProduct, relatedDiscount] = await Promise.all([
    productModel.count({ where: { category_id: id } }),
    discountModel.count({ where: { category_id: id } }),
  ]);

  if (relatedProduct > 0 || relatedDiscount > 0) {
    throw new AppError(
      400,
      "لا يمكن حذف هذا الصنف لوجود منتجات أو خصومات مرتبطة به",
    );
  }

  await category.destroy();
  return true;
};
export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
