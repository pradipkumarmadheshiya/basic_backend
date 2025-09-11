import React, { useContext, useEffect, useState } from 'react'
import ProductForm from '../components/ProductForm'
import Products from '../components/Products'
import {ProductContext} from "../context/ProductContext"
import ProductFormUpdate from '../components/ProductFormUpdate'
import axios from 'axios'

const Home = () => {
  const {isFormUpdate}=useContext(ProductContext)
  const [products, setProducts]=useState([])


  const getProducts=async()=>{
        try {
            const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/products`)

            if(response.status===200){
                setProducts(response.data)
            }
        } catch (error) {
            console.log("err", error)
        }
    }
    
    useEffect(()=>{
        getProducts()
    }, [])
  return (
    <div>
      {isFormUpdate? <ProductFormUpdate products={products} setProducts={setProducts}/> : <ProductForm products={products} setProducts={setProducts}/>}
      <Products products={products} setProducts={setProducts}/>
    </div>
  )
}

export default Home
