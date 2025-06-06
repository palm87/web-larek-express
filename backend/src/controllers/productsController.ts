import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/productModel';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import InternalServerError from '../errors/internal-server-error';

export const getProducts = (_req: Request, res: Response, next: NextFunction) => Product.find({})
  .then((data) => res.send({ items: data, total: data.length }))
  .catch((error) => {
    next(error);
  });

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    title, image, category, description, price,
  } = req.body;

  return Product.create({
    title, image, category, description, price,
  })
    .then((product) => {
      res.status(201);
      res.send({ item: product });
    })
    .catch((error) => {
      if (error instanceof MongooseError.ValidationError) {
        return next(new BadRequestError('Ошибка валидации данных при создании товара'));
      }
      if (error instanceof Error && error.message.includes('E11000')) {
        return next(new ConflictError('Товар с таким названием уже существует'));
      }
      return next(new InternalServerError('Ошибка сервера'));
    });
};
