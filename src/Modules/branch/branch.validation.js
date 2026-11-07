import Joi from "joi";

export const branchSchema = Joi.object({
    name:Joi.string().min(3).required(),
    phone:Joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
    address:Joi.string().min(5).required(),
    map_url:Joi.string()
});