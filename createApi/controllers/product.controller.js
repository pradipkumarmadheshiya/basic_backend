import { productModel } from "../models/product.model.js"

export const addProduct=async function(req, res){

    try {
        const {title, description, price, category}=req.body || {}

        if(!title || !description || !price || !category){
            return res.status(400).json({message:"all fields are required"})
        }

        const product=await productModel.create({title, description, price, category})

        res.status(201).json({message:"Product added", product})

    } catch (error) {
        res.status(500).json({message:"internal server error", error:error.message})
    }
}

export const getProducts=async function(req, res) {
    const products=await productModel.find()
    res.status(200).json(products)
}

export const deleteProduct=async function (req, res) {
    const {id} = req.params

    const product=await productModel.findById(id)

    if(!product){
        return res.status(404).json({message:"Product not found"})
    }

    await product.deleteOne()

    res.status(200).json({message:"Product deleted successfully"})
}

export const updateProduct=async function (req, res) {
    const {id}=req.params
    const {title, description, price, category}=req.body || {}

    const product=await productModel.findByIdAndUpdate(id, {title, description, price, category}, {new:true})

    if(!product){
        return res.status(404).json("Product not found")
    }

    if(!product){
        return res.status(404).json({message:'Product not found'})
    }

    res.status(200).json({message:"Product updated successfully", product})
}