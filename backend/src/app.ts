import express from 'express'
import { productRouter } from "./routes/productsRouter";
import { orderRouter } from './routes/orderRouter';
import mongoose from 'mongoose';
import cors from "cors";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/NotFoundError";
import { errors } from "celebrate";
import { requestLogger, errorLogger } from './middlewares/logger';



const { PORT = 3000, DB_ADDRESS = "mongodb://127.0.0.1:27017/weblarek" } = process.env;
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use(errorLogger);
app.use(express.static(path.join(__dirname, "public")));
mongoose.connect(DB_ADDRESS)
   .then(() => console.log("✅ База данных подключена"))
    .catch(err => console.error("❌ Ошибка подключения:", err));

// app.use((req, res, next) => {
//   next(new NotFoundError("Маршрут не найден"));
// });
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});





