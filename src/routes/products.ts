import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createProduct, listProduct } from "../controllers/products";
import { authMiddleware } from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const productRoutes : Router = Router();


productRoutes.post('/',authMiddleware , errorHandler(createProduct))
productRoutes.get('/',[authMiddleware,adminMiddleware ], errorHandler(listProduct))

export default productRoutes;