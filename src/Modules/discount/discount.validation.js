import Joi from "joi";
const discount_types = ["fixed", "percentage"];
export const IdSchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف التخفيض مطلوب في الرابط",
      "number.base": "معرّف التخفيض يجب أن يكون رقماً",
      "number.integer": "معرّف التخفيض يجب أن يكون عدداً صحيحاً",
      "number.positive": "معرّف التخفيض يجب أن يكون رقماً موجباً أكبر من الصفر",
    }),
  }),
};
// 2. createDiscountSchema
export const createDiscountSchema = {
  body: Joi.object({
    name: Joi.string().trim().min(5).max(55).required().messages({
      "any.required": "اسم التخفيض مطلوب",
      "string.empty": "اسم التخفيض لا يمكن أن يكون فارغاً",
      "string.min": "اسم التخفيض لا يقل عن 5 أحرف",
      "string.max": "اسم التخفيض لا يزيد عن 55 حرفاً",
    }),

    category_id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف الصنف مطلوب",
      "number.base": "معرّف الصنف يجب أن يكون رقماً",
    }),

    product_id: Joi.number().allow(null).integer().positive().messages({
      "number.base": "معرّف المنتج يجب أن يكون رقماً",
    }),

    type: Joi.string()
      .trim()
      .valid(...discount_types)
      .required()
      .messages({
        "any.required": "نوع التخفيض مطلوب",
        "any.only": "نوع التخفيض يجب أن يكون fixed أو percentage",
      }),

    value: Joi.number()
      .positive()
      .when("type", {
        is: "percentage",
        then: Joi.number().min(1).max(100).messages({
          "number.max": "نسبة التخفيض لا تتعدى 100%",
        }),
      })
      .required()
      .messages({
        "any.required": "قيمة التخفيض مطلوبة",
        "number.base": "قيمة التخفيض يجب أن تكون رقماً",
        "number.positive": "قيمة التخفيض يجب أن تكون موجبة",
      }),

    starts_at: Joi.date().iso().min("now").required().messages({
      "any.required": "تاريخ بداية التخفيض مطلوب",
      "date.format": "صيغة التاريخ غير صحيحة (ISO مطلوب)",
      "date.min": "تاريخ البداية لا يمكن أن يكون في الماضي",
    }),

    ends_at: Joi.date().iso().greater(Joi.ref("starts_at")).messages({
      "date.format": "صيغة التاريخ غير صحيحة (ISO مطلوب)",
      "date.greater": "تاريخ الانتهاء يجب أن يكون بعد تاريخ البداية",
    }),

    is_active: Joi.boolean().default(true),
  }),
};
// 3. updateDiscountSchema
export const updateDiscountSchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "any.required": "معرّف التخفيض مطلوب في الرابط",
      "number.base": "معرّف التخفيض يجب أن يكون رقماً",
    }),
  }),

  body: Joi.object({
    name: Joi.string().trim().min(5).max(55).messages({
      "string.empty": "اسم التخفيض لا يمكن أن يكون فارغاً",
      "string.min": "اسم التخفيض لا يقل عن 5 أحرف",
      "string.max": "اسم التخفيض لا يزيد عن 55 حرفاً",
    }),

    category_id: Joi.number().integer().positive().messages({
      "number.base": "معرّف الصنف يجب أن يكون رقماً",
    }),

    product_id: Joi.number().integer().positive().allow(null).messages({
      "number.base": "معرّف المنتج يجب أن يكون رقماً",
    }),

    type: Joi.string()
      .trim()
      .valid(...discount_types)
      .messages({
        "any.only": "نوع التخفيض يجب أن يكون fixed أو percentage",
      }),

    value: Joi.number()
      .positive()
      .when("type", {
        is: "percentage",
        then: Joi.number().min(1).max(100).messages({
          "number.max": "نسبة التخفيض لا تتعدى 100%",
        }),
      })
      .messages({
        "number.base": "قيمة التخفيض يجب أن تكون رقماً",
        "number.positive": "قيمة التخفيض يجب أن تكون موجبة",
      }),

    starts_at: Joi.date().iso().messages({
      "date.format": "صيغة التاريخ غير صحيحة (ISO مطلوب)",
    }),

    ends_at: Joi.date().iso().messages({
      "date.format": "صيغة التاريخ غير صحيحة (ISO مطلوب)",
    }),

    is_active: Joi.boolean(),
  })
    .min(1)
    .messages({
      "object.min": "يجب إرسال حقل واحد على الأقل للتعديل",
    }),
};
export default {
  IdSchema,
  createDiscountSchema,
  updateDiscountSchema,
};
