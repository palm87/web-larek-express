import { celebrate, Joi } from 'celebrate';

export const validateProduct = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(2).max(30).required(),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    }).required(),
    category: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    price: Joi.number().allow(null).optional(),
  }),
});

export const validateOrder = celebrate({
  body: Joi.object().keys({
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().positive().required(),
    items: Joi.array().items(Joi.string().hex().length(24)).min(1).required(),
  }),
});
