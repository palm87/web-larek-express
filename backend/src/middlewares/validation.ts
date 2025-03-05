import { celebrate, Joi, Segments } from "celebrate";
import productSchema from "../models/productModel";

export const validateProduct = celebrate({
  [Segments.BODY]: productSchema, // Используем `productSchema`
});

// export const validateProduct = celebrate({
//   [Segments.BODY]: Joi.object().keys({
//     title: Joi.string().min(2).max(30).required().messages({
//       "string.base": "Название должно быть строкой",
//       "string.empty": "Название не должно быть пустым",
//       "string.min": "Минимальная длина названия - 2 символа",
//       "string.max": "Максимальная длина названия - 30 символов",
//       "any.required": "Название обязательно",
//     }),
//     price: Joi.number().positive().required().messages({
//       "number.base": "Цена должна быть числом",
//       "number.positive": "Цена должна быть больше 0",
//       "any.required": "Цена обязательна",
//     }),
//   }),
// });

export const validateOrder = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string().valid("card", "online").required().messages({
      "any.only": "Метод оплаты должен быть 'card' или 'online'",
      "any.required": "Метод оплаты обязателен",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Некорректный email",
      "any.required": "Email обязателен",
    }),
    phone: Joi.string().pattern(/^\+?\d{10,15}$/).required().messages({
      "string.pattern.base": "Некорректный номер телефона",
      "any.required": "Телефон обязателен",
    }),
    address: Joi.string().required().messages({
      "any.required": "Адрес обязателен",
    }),
    total: Joi.number().positive().required().messages({
      "number.base": "Сумма заказа должна быть числом",
      "number.positive": "Сумма заказа должна быть больше 0",
      "any.required": "Сумма заказа обязательна",
    }),
    items: Joi.array().items(Joi.string().hex().length(24)).min(1).required().messages({
      "array.min": "Должен быть хотя бы один товар",
      "any.required": "Список товаров обязателен",
    }),
  }),
});
