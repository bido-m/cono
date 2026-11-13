import Joi from "joi";
export const IdSchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف المنتج مطلوب في الرابط",
      "number.base": "معرّف المنتج يجب أن يكون رقماً",
      "number.integer": "معرّف المنتج يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف المنتج يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),
  }),
};
export const createProductSchema = {
  body: Joi.object({
    category_id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف الصنف مطلوب لربط المنتج به",
      "number.base": "معرّف الصنف يجب أن يكون رقماً",
      "number.integer": "معرّف الصنف يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف الصنف يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),

    product_name: Joi.string().trim().min(2).max(150).required().messages({
      "any.required": "اسم المنتج مطلوب",
      "string.base": "اسم المنتج يجب أن يكون نصاً",
      "string.empty": "اسم المنتج لا يمكن أن يكون فارغاً",
      "string.min": "اسم المنتج يجب ألا يقل عن حرفين",
      "string.max": "اسم المنتج يجب ألا يتجاوز 150 حرفاً",
    }),

    description: Joi.string().trim().allow("", null).messages({
      "string.base": "وصف المنتج يجب أن يكون نصاً",
    }),

    image_url: Joi.string().trim().uri().max(500).allow("", null).messages({
      "string.base": "رابط الصورة يجب أن يكون نصاً",
      "string.uri": "رابط الصورة يجب أن يكون رابط URL صحيح",
      "string.max": "رابط الصورة لا يجب أن يتجاوز 500 حرف",
    }),

    is_available: Joi.boolean().default(true).messages({
      "boolean.base": "حالة توفر المنتج تقبل فقط إما true أو false",
    }),
  }),
};
export const updateProductSchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف المنتج مطلوب في الرابط",
      "number.base": "معرّف المنتج يجب أن يكون رقماً",
      "number.integer": "معرّف المنتج يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف المنتج يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),
  }),

  body: Joi.object({
    category_id: Joi.number().integer().positive().messages({
      "number.base": "معرّف الصنف يجب أن يكون رقماً",
      "number.integer": "معرّف الصنف يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف الصنف يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),

    product_name: Joi.string().trim().min(2).max(150).messages({
      "string.base": "اسم المنتج يجب أن يكون نصاً",
      "string.empty": "اسم المنتج لا يمكن أن يكون فارغاً",
      "string.min": "اسم المنتج يجب ألا يقل عن حرفين",
      "string.max": "اسم المنتج يجب ألا يتجاوز 150 حرفاً",
    }),

    description: Joi.string().trim().allow("", null).messages({
      "string.base": "وصف المنتج يجب أن يكون نصاً",
    }),

    image_url: Joi.string().trim().uri().max(500).allow("", null).messages({
      "string.base": "رابط الصورة يجب أن يكون نصاً",
      "string.uri": "رابط الصورة يجب أن يكون رابط URL صحيح",
      "string.max": "رابط الصورة لا يجب أن يتجاوز 500 حرف",
    }),

    is_available: Joi.boolean().messages({
      "boolean.base": "حالة توفر المنتج تقبل فقط إما true أو false",
    }),
  })
    .min(1)
    .messages({
      "object.min": "يجب إرسال حقل واحد على الأقل لتعديل بيانات المنتج",
    }),
};
export default {
  IdSchema,
  createProductSchema,
  updateProductSchema,
};