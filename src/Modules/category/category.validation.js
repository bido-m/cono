import Joi from "joi";
const createCategorySchema = {
  body: Joi.object({
    name: Joi.string().trim().min(2).max(100).required().messages({
      "any.required": "اسم القسم مطلوب",
      "string.base": "اسم القسم يجب أن يكون نصاً",
      "string.empty": "اسم القسم لا يمكن أن يكون فارغاً",
      "string.min": "اسم القسم يجب ألا يقل عن حرفين",
      "string.max": "اسم القسم لا يمكن أن يتجاوز 100 حرف",
    }),
    branch_id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف الفرع مطلوب",
      "number.base": "معرّف الفرع غير صالح",
      "number.integer": "معرّف الفرع يجب أن يكون رقماً صحيحاً",
      "number.positive": "معرّف الفرع يجب أن يكون رقماً موجباً",
    }),
  }),
};
const updateCategorySchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "any.required": "اختر القسم الذي تريد تعديله",
      "number.base": "معرّف القسم غير صالح",
      "number.integer": "معرّف القسم يجب أن يكون رقماً صحيحاً",
      "number.positive": "معرّف القسم يجب أن يكون رقماً موجباً",
    }),
  }),
  body: Joi.object({
    name: Joi.string().trim().min(2).max(100).optional().messages({
      "string.base": "اسم القسم يجب أن يكون نصاً",
      "string.empty": "اسم القسم لا يمكن أن يكون فارغاً",
      "string.min": "اسم القسم يجب ألا يقل عن حرفين",
      "string.max": "اسم القسم لا يمكن أن يتجاوز 100 حرف",
    }),
    branch_id: Joi.number().integer().positive().optional().messages({
      "number.base": "معرّف الفرع غير صالح",
      "number.integer": "معرّف الفرع يجب أن يكون رقماً صحيحاً",
      "number.positive": "معرّف الفرع يجب أن يكون رقماً موجباً",
    }),
  })
    .min(1)
    .messages({
      "object.min": "يجب إرسال حقل واحد على الأقل للتعديل",
    }),
};
const getOrDeleteCategorySchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف القسم مطلوب",
      "number.base": "معرّف القسم غير صالح",
      "number.integer": "معرّف القسم يجب أن يكون رقماً صحيحاً",
      "number.positive": "معرّف القسم يجب أن يكون رقماً موجباً",
    }),
  }),
};
export default {
  createCategorySchema,
  updateCategorySchema,
  getOrDeleteCategorySchema,
};