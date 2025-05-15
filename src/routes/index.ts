import { Router } from "express";
import authRoute from "./auth";
import productRoutes from "./products";

const rootRouter:Router = Router()

rootRouter.use('/auth', authRoute)
rootRouter.use('/product', productRoutes)

export default rootRouter;