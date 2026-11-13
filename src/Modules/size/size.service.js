import { sizeModel } from "../../DB/Models/size.model.js";
import { productSizeModel } from "../../DB/Models/productSize.model.js";
import { AppError } from "../../utils/AppError.js";
import { Op } from "sequelize";
const creatSize = async (data = {}) => {
  const { size_name, is_available = true } = data;

  const existSize = await sizeModel.findOne({ where: { size_name } });
  if (existSize) {
    throw new AppError(409, "هذا الحجم موجود مسبقاً");
  }

  return await sizeModel.create({ size_name, is_available });
};
const getAllSizes = async () => {
  return await sizeModel.findAll();
};
const getSizeById = async (id) => {
  const size = await sizeModel.findByPk(id);
  if (!size) {
    throw new AppError(404, "الحجم غير موجود او تم حذفه مسبقاً");
  }
  return size;
};
const updateSize = async (id, data = {}) => {
  const { size_name, is_available = true } = data;

  const size = await sizeModel.findByPk(id);
  if (!size) {
    throw new AppError(404, "الحجم غير موجود او تم حذفه مسبقاً");
  }

  size.set({ size_name, is_available });

  if (!size.changed()) {
    return size;
  }

  if (size.changed("size_name")) {
    const existSize = await sizeModel.findOne({
      where: {
        size_name,
        id: { [Op.ne]: id },
      },
    });

    if (existSize) {
      throw new AppError(409, "هذا الحجم موجود ادخل حجما اخر");
    }
  }

  await size.save();
  return size;
};
const deleteSize = async (id) => {
  const size = await sizeModel.findByPk(id);
  if (!size) {
    throw new AppError(404, "هذا الحجم غير موجود او تم حذفه مسبقاً");
  }

  const isUsed = await productSizeModel.findOne({
    where: { size_id: id },
  });

  if (isUsed) {
    throw new AppError(
      400,
      "لا يمكن حذف هذا الحجم لأنه مرتبط بمنتجات بالفعل، يجب حذف الرابط أولاً",
    );
  }

  await size.destroy();
  return true;
};
export default {
  creatSize,
  getAllSizes,
  getSizeById,
  updateSize,
  deleteSize,
};
