import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/bad-request-error";
import NotFoundError  from "../errors/not-found-error";
import ConflictError from "../errors/conflict-error";
import InternalServerError from "../errors/internal-server-error";
import { Error as MongooseError } from "mongoose";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ConflictError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof MongooseError.ValidationError) {
    return res.status(400).json({ message: "Ошибка валидации данных" });
  }

  if (err instanceof Error && err.message.includes("E11000")) {
    return res.status(409).json({ message: "Такой ресурс уже существует" });
  }

  console.error("Неизвестная ошибка:", err);
  return res.status(500).json({ message: "Внутренняя ошибка сервера" });
};
