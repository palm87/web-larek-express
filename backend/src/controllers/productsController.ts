
import { Request, Response, NextFunction } from 'express';
import Product from '../models/productModel'
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { MongooseError } from 'mongoose';

export const getProducts = (_req: Request, res: Response, next: NextFunction) => Product.find({})
  .then((data) => res.send({ items: data, total: data.length }))
  .catch((error) => {
    console.error("Ошибка при получении продуктов:", error);
    res.status(500).json({ error: "Internal Server Error" });

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
      .catch((err) => {
        console.error('Ошибка создания продукта:', err);
        const resultError = new MongooseError(err.message);
        return next(resultError);
      });
  };