import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ConflictError from '../errors/conflict-error';
import InternalServerError from '../errors/internal-server-error';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
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
    return res.status(400).json({ message: 'Ошибка валидации данных' });
  }

  if (err instanceof Error && err.message.includes('E11000')) {
    return res.status(409).json({ message: 'Такой ресурс уже существует' });
  }

  // Все остальные ошибки — внутренние
  const internalError = new InternalServerError('Внутренняя ошибка сервера');
  return res.status(internalError.statusCode).json({ message: internalError.message });
};

export default errorHandler;
