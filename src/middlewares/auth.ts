import { NextFunction, Request, Response } from "express";
import { UnAuthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";


export const authMiddleware: any = async(req: Request, res: Response, next: NextFunction) => {

    const token:any = req.headers.authorization

    if(!token){
        next(new UnAuthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }
    try{
    const payload = jwt.verify(token, JWT_SECRET) as any

    const user = await prismaClient.user.findFirst({where: {id: payload.userId}})
    if(!user){
        next(new UnAuthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }

    req.user = user
    next()

    }catch{
        next(new UnAuthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }

}