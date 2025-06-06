import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/productsController';
import { validateProduct } from '../middlewares/validation';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.post('/', validateProduct, createProduct);

export default productRouter;
