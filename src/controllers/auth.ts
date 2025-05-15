import { Request, Response, RequestHandler, NextFunction } from "express"
import {prismaClient} from '..'
import {hashSync,compareSync} from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets"
import {uploadToS3FromDisk} from '../middlewares/uploadToS3'
import { BadRequestsException } from "../exceptions/bad-requests"
import { ErrorCode } from "../exceptions/root"
import { UnprocessableEntity } from "../exceptions/validation"
import { SignUpSchema } from "../schema/users"
import { NotFoundException } from "../exceptions/not-found"
import { error } from "console"



export const signup:any = async (req: Request, res: Response, next: NextFunction) => {
    
      SignUpSchema.parse(req.body)
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await prismaClient.user.findUnique({ where: { email } });
      if (existingUser) {
        new BadRequestsException('User Already Exists', ErrorCode.USER_ALREADY_EXIST)
      }
      // Upload file from disk to S3
      let imageUrl = '';
      if (req.file) {
        const filePath = req.file.path;
        const fileName = req.file.filename;
        const mimetype = req.file.mimetype;
  
        imageUrl = await uploadToS3FromDisk(filePath, fileName, mimetype);
      }
  
      // Save user
      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashSync(password, 10),
          profileImage: imageUrl,
        },
      });
  
      res.status(201).json({ message: 'User created', user });
  };

export const login = async(req:Request,res:Response) => {
    const {email, password} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}})

    if(!user){
        throw new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND)
    }
    
    if(!compareSync(password,user.password)){
        throw new BadRequestsException('Incorrect Password', ErrorCode.INCORRECT_PASSWORD)
    }
    
    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET)

    res.json({user,token})
}

export const me = async(req: Request, res: Response) => {

  res.json(req.user)

}

