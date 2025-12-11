import Joi from "joi";

export const employeeValidationSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone_Number: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        "string.pattern.base": "Phone number must be 10 digits"
    }),
    department:Joi.string().required(),
    designation:Joi.string().required(),
    salary:Joi.string().required()
});