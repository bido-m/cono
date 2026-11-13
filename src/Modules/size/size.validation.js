import Joi from "joi";
// 1. IdSchema
export const IdSchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف الحجم مطلوب في الرابط",
      "number.base": "معرّف الحجم يجب أن يكون رقماً",
      "number.integer": "معرّف الحجم يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف الحجم يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),
  }),
};
// 2. createSizeSchema
export const createSizeSchema = {
  body: Joi.object({
    size_name: Joi.string().trim().min(1).max(55).required().messages({
      "any.required": "اسم الحجم مطلوب",
      "string.base": "اسم الحجم يجب أن يكون نصاً",
      "string.empty": "اسم الحجم لا يمكن أن يكون فارغاً",
      "string.min": "اسم الحجم يجب ألا يقل عن حرف",
      "string.max": "اسم الحجم يجب ألا يزيد عن 55 حرفاً",
    }),

    is_available: Joi.boolean().default(true).messages({
      "boolean.base": "حالة توفر الحجم يجب أن تكون إما true أو false",
    }),
  }),
};
// 3. updateSizeSchema
export const updateSizeSchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف الحجم مطلوب في الرابط",
      "number.base": "معرّف الحجم يجب أن يكون رقماً",
      "number.integer": "معرّف الحجم يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف الحجم يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),
  }),

  body: Joi.object({
    size_name: Joi.string().trim().min(1).max(55).messages({
      "string.base": "اسم الحجم يجب أن يكون نصاً",
      "string.empty": "اسم الحجم لا يمكن أن يكون فارغاً",
      "string.min": "اسم الحجم يجب ألا يقل عن حرف",
      "string.max": "اسم الحجم يجب ألا يزيد عن 55 حرفاً",
    }),

    is_available: Joi.boolean().messages({
      "boolean.base": "حالة توفر الحجم يجب أن تكون إما true أو false",
    }),
  })
    .min(1)
    .messages({
      "object.min": "يجب إرسال حقل واحد على الأقل للتعديل",
    }),
};
export default {
  IdSchema,
  createSizeSchema,
  updateSizeSchema,
};
