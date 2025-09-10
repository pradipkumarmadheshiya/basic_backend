import React, { useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast'

const ProductForm = () => {

    const [title, setTitle]=useState("")
    const [price, setPrice]=useState("")
    const [description, setDescription]=useState("")
    const [category, setCategory]=useState("")

    const handleProductSubmit=async(e)=>{
      e.preventDefault()

      const newProduct={title, price, description, category}
      
      try {
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/products`, newProduct)

        if (response.status===201){
          toast.success("Product added successfully")
          setTitle("")
          setPrice("")
          setCategory("")
          setDescription("")
        }

      } catch (error) {
        console.log("err", error)
      }
    }

    

  return (
    <div className='m-5'>
      <div>
        <h1 className='text-xl font-medium mb-4'>Add Products</h1>
        <form className='flex flex-col gap-3' onSubmit={handleProductSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" placeholder='Product Title' value={title} onChange={(e)=>setTitle(e.target.value)}
            className='bg-gray-100 px-2 py-1 rounded'/>
            <div className='flex gap-3'>
                <div className='w-full'>
                    <label htmlFor="price">Price:</label>
                    <input type="number" name="price" placeholder='Product Price' value={price} onChange={(e)=>setPrice(e.target.value)}
                    className='bg-gray-100 px-2 py-1 rounded w-full'/>
                </div>
                <div className='w-full'>
                    <label htmlFor="category">Category:</label>
                    <input type="text" name="category" placeholder='Product Category' value={category} onChange={(e)=>setCategory(e.target.value)}
                    className='bg-gray-100 px-2 py-1 rounded w-full'/>
                </div>
            </div>
            <label htmlFor="description">Description:</label>
            <input type="text" name="description" placeholder='Product Description' value={description} onChange={(e)=>setDescription(e.target.value)}
            className='bg-gray-100 px-2 py-1 rounded'/>
            <button type='submit'
            className='bg-gray-700 text-white px-3 py-1.5 rounded'>Add Product</button>
        </form>
      </div>
    </div>
  )
}

export default ProductForm
