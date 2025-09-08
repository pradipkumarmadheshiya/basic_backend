import express from "express"
import { productModel } from "../models/product.model.js"

const router=express.Router()

router.post("/", (req, res)=>{
    const {title, description, price, category}=req.body || {}

    if(!title || !description || !price || !category){
        return res.status(400).json({message:"all fields are required"})
    }

    const product=productModel.create({title, description, price, category})

    res.status(201).json({message:"Product added"}, product)
})

export default router