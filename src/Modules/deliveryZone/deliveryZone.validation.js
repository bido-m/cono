import Joi from "joi";

export const deliveryZoneSchema = Joi.object({
    branch_id:Joi.number().required(),
    name:Joi.string().min(3).required(),
    price:Joi.number().required(),
    delivery_time:Joi.number(),
});

export const updateDeliverySchema = Joi.object({
    name:Joi.string().min(3).required(),
    price:Joi.number().required(),
    delivery_time:Joi.number(),
});