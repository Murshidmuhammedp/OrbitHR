import Joi from "joi";

export const userValidationSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone_Number: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        "string.pattern.base": "Phone number must be 10 digits"
    }),
    password: Joi.string().min(2).required()
});


export const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const hrValidationSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone_Number: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        "string.pattern.base": "Phone number must be 10 digits"
    }),
});