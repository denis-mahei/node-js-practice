import Joi from 'joi';

export const createProductsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().min(1).required(),
  category: Joi.string()
    .valid('books', 'electronics', 'other', 'clothing')
    .default('other')
    .required(),
  description: Joi.string().max(500),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  price: Joi.number().min(0),
  category: Joi.string().valid('books', 'electronics', 'clothing', 'other'),
  description: Joi.string().max(500),
}).min(1);
