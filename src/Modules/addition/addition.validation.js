import Joi from "joi";
const createAdditionSchema = {
  body: Joi.object({
    name: Joi.string().trim().min(2).max(100).required().messages({
      "any.required": "إسم الإضافة مطلوب",
      "string.empty": "إسم الإضافة لا يمكن أن يكون فارغاً",
      "string.min": "إسم الإضافة يجب ألا يقل عن حرفين",
      "string.max": "إسم الإضافة يجب ألا يزيد عن 100 حرف",
    }),
    is_available: Joi.boolean().default(true),
  }),
};
const updateAdditionSchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "number.base": "معرّف الإضافة غير صالح",
      "any.required": "إختر الإضافة التي تريد تعديلها",
    }),
  }),
  body: Joi.object({
    name: Joi.string().trim().min(2).max(100).optional().messages({
      "string.empty": "اسم الإضافة لا يمكن أن يكون فارغاً",
      "string.min": "اسم الإضافة يجب ألا يقل عن حرفين",
      "string.max": "اسم الإضافة لا يمكن أن يتجاوز 100 حرف",
    }),
    is_available: Joi.boolean().optional().messages({
      "boolean.base": "حالة الإتاحة يجب أن تكون true أو false",
    }),
  })
    .min(1)
    .messages({
      "object.min": "يجب إرسال حقل واحد على الأقل للتعديل",
    }),
};
const IdSchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "number.base": "معرّف الإضافة غير صالح",
      "any.required": "معرّف الإضافة مطلوب",
    }),
  }),
};
export default {
  createAdditionSchema,
  updateAdditionSchema,
  IdSchema,
};
