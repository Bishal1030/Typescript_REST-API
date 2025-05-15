import { Router } from "express";
import {login, me, signup}  from "../controllers/auth";
import { upload } from '../middlewares/multer';
import { errorHandler } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";


const authRoute:Router = Router();


authRoute.post('/signup',upload.single('profile'), errorHandler(signup))
authRoute.post('/login', errorHandler(login))
authRoute.get('/me', [authMiddleware], errorHandler(me) )


export default authRoute;