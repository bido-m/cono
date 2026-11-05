import Joi from "joi";

export const registerSchema = Joi.object({
    branch_id:Joi.number().integer().positive(),
    first_name:Joi.string().min(3).required(),
    last_name:Joi.string().min(3).required(),
    phone:Joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
    email:Joi.string().email(),
    password:Joi.string().min(8).max(30).required(),
    confirmPassword:Joi.string().valid(Joi.ref("password")).required(),
    role:Joi.string().valid("admin", "branch_manager").required()
});

export const loginSchema = Joi.object({
    phone: Joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
    password: Joi.string().required()
});