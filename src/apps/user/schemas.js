import Joi from 'joi'

export default Joi.object({
    email: Joi.string().email().required(),

    first_name: Joi.string().required(),

    last_name: Joi.string().required(),

    phone: Joi.string().alphanum().optional(),

    country: Joi.string().alphanum().optional(),

    city: Joi.string().alphanum().optional(),

    address: Joi.string().optional(),

    birthday: Joi.string().isoDate().optional(),

    active: Joi.boolean().forbidden(),

    verfied: Joi.boolean().forbidden(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .optional(),
})

export const LoginSchema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    email: Joi.string().email().required(),
})

export const TestSchema = Joi.object({
    _id: Joi.string().required(),

    email: Joi.string().email().required(),

    first_name: Joi.string().required(),

    last_name: Joi.string().required(),

    phone: Joi.string().alphanum().optional(),

    country: Joi.string().alphanum().optional(),

    city: Joi.string().alphanum().optional(),

    address: Joi.string().optional(),

    birthday: Joi.string().isoDate().optional(),

    active: Joi.boolean().required(),

    verfied: Joi.boolean().required(),

    created_at: Joi.date().required(),

    updated_at: Joi.date().required(),
}).unknown(true)
