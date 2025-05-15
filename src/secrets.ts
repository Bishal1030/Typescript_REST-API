import dotenv from 'dotenv'

dotenv.config()


export const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET!

// cloudinary configuration
export const CLOUDINARY_CLOUDNAME = process.env.CLOUDINARY_CLOUDNAME
export const CLOUDINARY_APIKEY = process.env.CLOUDINARY_APIKEY
export const CLOUDINARY_APISECRET = process.env.CLOUDINARY_APISECRET

export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
export const AWS_REGION = process.env.AWS_REGION


