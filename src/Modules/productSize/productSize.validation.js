import Joi from "joi";
// 1. IdSchema
export const IdSchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف حجم المنتج مطلوب في الرابط",
      "number.base": "معرّف حجم المنتج يجب أن يكون رقماً",
      "number.integer": "معرّف حجم المنتج يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف حجم المنتج يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),
  }),
};
// 2. createProductSizeSchema
export const createProductSizeSchema = {
  body: Joi.object({
    product_id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف المنتج مطلوب لربط الحجم به",
      "number.base": "معرّف المنتج يجب أن يكون رقماً",
      "number.integer": "معرّف المنتج يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف المنتج يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),

    size_id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف الحجم مطلوب",
      "number.base": "معرّف الحجم يجب أن يكون رقماً",
      "number.integer": "معرّف الحجم يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف الحجم يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),

    price: Joi.number().positive().required().messages({
      "any.required": "سعر الحجم مطلوب",
      "number.base": "سعر الحجم يجب أن يكون رقماً",
      "number.positive": "سعر الحجم يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),
  }),
};
// 3. updateProductSizeSchema
export const updateProductSizeSchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف حجم المنتج مطلوب في الرابط",
      "number.base": "معرّف حجم المنتج يجب أن يكون رقماً",
      "number.integer": "معرّف حجم المنتج يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف حجم المنتج يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),
  }),

  body: Joi.object({
    product_id: Joi.number().integer().positive().messages({
      "number.base": "معرّف المنتج يجب أن يكون رقماً",
      "number.integer": "معرّف المنتج يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف المنتج يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),

    size_id: Joi.number().integer().positive().messages({
      "number.base": "معرّف الحجم يجب أن يكون رقماً",
      "number.integer": "معرّف الحجم يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف الحجم يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),

    price: Joi.number().positive().messages({
      "number.base": "سعر الحجم يجب أن يكون رقماً",
      "number.positive": "سعر الحجم يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),
  })
    .min(1)
    .messages({
      "object.min": "يجب إرسال حقل واحد على الأقل للتعديل",
    }),
};
export default {
  IdSchema,
  createProductSizeSchema,
  updateProductSizeSchema,
};
