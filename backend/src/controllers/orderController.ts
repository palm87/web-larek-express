import { Request, Response, NextFunction } from "express";
import { faker } from "@faker-js/faker";
import Product from "../models/productModel";
import { BadRequestError } from "../errors/BadRequestError";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { payment, email, phone, address, total, items } = req.body;

        if (!["card", "online"].includes(payment)) {
            return next(new BadRequestError("Некорректный метод оплаты"));
        }
        if (!email || !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/.test(email)) {
            return next(new BadRequestError("Некорректный email"));
        }
        if (!phone || typeof phone !== "string") {
            return next(new BadRequestError("Некорректный номер телефона"));
        }
        if (!address || typeof address !== "string") {
            return next(new BadRequestError("Некорректный адрес"));
        }
        if (!Array.isArray(items) || items.length === 0) {
            return next(new BadRequestError("Массив товаров не должен быть пустым"));
        }

        const products = await Product.find({ _id: { $in: items } });
        if (products.length !== items.length) {
            return next(new BadRequestError("Некоторые товары не существуют"));
        }

        const validProducts = products.filter(p => p.price !== null);
        if (validProducts.length !== products.length) {
            return next(new BadRequestError("Некоторые товары не имеют цены"));
        }

        const calculatedTotal = validProducts.reduce((sum, p) => sum + (p.price ?? 0), 0);

        if (calculatedTotal !== total) {
            return next(new BadRequestError("Неверная сумма заказа"));
        }

        const orderId = faker.string.uuid();
        return res.status(201).json({ id: orderId, total });

    } catch (error) {
        next(error);
    }
};
