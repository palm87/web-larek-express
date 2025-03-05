export class InternalServerError extends Error {
  statusCode: number;

  constructor(message = "Внутренняя ошибка сервера") {
    super(message);
    this.statusCode = 500;
  }
}
