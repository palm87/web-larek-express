import { Router } from "express";
import {createOrder} from "../controllers/orderController"
import { validateOrder } from "../middlewares/validation";

export const orderRouter = Router();

// orderRouter.post("/", validateOrder, createOrder);

orderRouter.post("/", createOrder);
