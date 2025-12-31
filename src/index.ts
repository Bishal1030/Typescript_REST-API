import express, {Express, Request, Response} from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "../src/generated/prisma";
import { errorMiddleware } from "./middlewares/errors";
import cors from 'cors'
import { SignUpSchema } from "./schema/users";

const app:Express = express();


app.use(express.json())
app.use(cors())

app.use('/api', rootRouter)

export const prismaClient = new PrismaClient({
    log:['query']
})

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`app is running on localhost ${PORT}`)
})