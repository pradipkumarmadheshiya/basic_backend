import express from "express";
import { addProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from "../controllers/product.controller.js"

const router=express.Router();

router.post("/", addProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router