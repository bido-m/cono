import Joi from "joi";

// 1. IdSchema
export const IdSchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف إضافة المنتج مطلوب في الرابط",
      "number.base": "معرّف إضافة المنتج يجب أن يكون رقماً",
      "number.integer": "معرّف إضافة المنتج يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف إضافة المنتج يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),
  }),
};

// 2. createProductAdditionSchema
export const createProductAdditionSchema = {
  body: Joi.object({
    product_id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف المنتج مطلوب لربط الإضافة به",
      "number.base": "معرّف المنتج يجب أن يكون رقماً",
      "number.integer": "معرّف المنتج يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف المنتج يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),

    addition_id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف الإضافة مطلوب",
      "number.base": "معرّف الإضافة يجب أن يكون رقماً",
      "number.integer": "معرّف الإضافة يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف الإضافة يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),

    price: Joi.number().min(0).default(0).messages({
      "number.base": "سعر الإضافة يجب أن يكون رقماً",
      "number.min": "سعر الإضافة لا يمكن أن يكون رقماً سالباً",
    }),
  }),
};

// 3. updateProductAdditionSchema
export const updateProductAdditionSchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف إضافة المنتج مطلوب في الرابط",
      "number.base": "معرّف إضافة المنتج يجب أن يكون رقماً",
      "number.integer": "معرّف إضافة المنتج يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف إضافة المنتج يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),
  }),

  body: Joi.object({
    product_id: Joi.number().integer().positive().messages({
      "number.base": "معرّف المنتج يجب أن يكون رقماً",
      "number.integer": "معرّف المنتج يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف المنتج يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),

    addition_id: Joi.number().integer().positive().messages({
      "number.base": "معرّف الإضافة يجب أن يكون رقماً",
      "number.integer": "معرّف الإضافة يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف الإضافة يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),

    price: Joi.number().min(0).messages({
      "number.base": "سعر الإضافة يجب أن يكون رقماً",
      "number.min": "سعر الإضافة لا يمكن أن يكون رقماً سالباً",
    }),
  })
    .min(1)
    .messages({
      "object.min": "يجب إرسال حقل واحد على الأقل للتعديل",
    }),
};

export default {
  IdSchema,
  createProductAdditionSchema,
  updateProductAdditionSchema,
};
