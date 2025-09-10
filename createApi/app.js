import express from "express"
import { config } from "dotenv"
import cors from "cors"
import { connectDB } from "./db/db.js"
import productRouter from "./routes/product.routes.js"

config({path:".env"})
export const app=express()

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/products", productRouter)

connectDB()