import { additionModel } from "../../DB/Models/addition.model.js";
import { productAdditionModel } from "../../DB/Models/productAddition.model.js";
import { AppError } from "../../utils/AppError.js";
import { Op } from "sequelize";
const createAddition = async (data = {}) => {
  const { name, is_available = true } = data;

  const existingAddition = await additionModel.findOne({ where: { name } });
  if (existingAddition) {
    throw new AppError(409, "الإضافة التي أدخلتها موجودة مسبقاً");
  }

  return await additionModel.create({ name, is_available });
};
const getAllAdditions = async () => {
  return await additionModel.findAll();
};
const getAdditionById = async (id) => {
  const addition = await additionModel.findByPk(id);
  if (!addition) {
    throw new AppError(404, "هذه الإضافة غير موجودة أو محذوفة مسبقاً");
  }

  return addition;
};
const updateAddition = async (id, data = {}) => {
  const { name, is_available = true } = data;

  const addition = await additionModel.findByPk(id);
  if (!addition) {
    throw new AppError(404, "الإضافة المراد تعديلها غير موجودة");
  }

  addition.set({ name, is_available });

  if (!addition.changed()) {
    return addition;
  }

  if (addition.changed("name")) {
    const checkExistingName = await additionModel.findOne({
      where: {
        name,
        id: { [Op.ne]: id },
      },
    });
    if (checkExistingName) {
      throw new AppError(409, "هذا الاسم مستخدم مسبقاً في إضافة أخرى");
    }
  }

  await addition.save();
  return addition;
};
const deleteAddition = async (id) => {
  const addition = await additionModel.findByPk(id);
  if (!addition) {
    throw new AppError(404, "الإضافة المراد حذفها غير موجودة بالفعل");
  }

  const isUsed = await productAdditionModel.findOne({
    where: { addition_id: id },
  });
  if (isUsed) {
    throw new AppError(
      400,
      "لا يمكن حذف هذه الإضافة لأنها مرتبطة بمنتج بالفعل، يجب حذف الرابط أولاً",
    );
  }

  await addition.destroy();
  return true;
};
export default {
  createAddition,
  getAllAdditions,
  getAdditionById,
  updateAddition,
  deleteAddition,
};
