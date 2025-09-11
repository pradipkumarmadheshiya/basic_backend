import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast'
import { ProductContext } from '../context/ProductContext'

const ProductFormUpdate = ({products, setProducts}) => {

    const {productFormUpdateId, setIsFormUpdate}=useContext(ProductContext)

    const [_id, set_id]=useState("")
    const [title, setTitle]=useState("")
    const [price, setPrice]=useState("")
    const [description, setDescription]=useState("")
    const [category, setCategory]=useState("")

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BASE_URL}/products/${productFormUpdateId}`)
    .then((res)=>{
        set_id(res.data._id)
        setTitle(res.data.title)
        setPrice(res.data.price)
        setCategory(res.data.category)
        setDescription(res.data.description)
    })
    .catch(error=>console.log("err fetching while single product", error))
    }, [productFormUpdateId])

    const handleProductSubmit=async(e)=>{
      e.preventDefault()

      const updatedProduct={_id, title, price, category, description}
      
      try {
        const response=await axios.put(`${import.meta.env.VITE_BASE_URL}/products/update/${productFormUpdateId}`, updatedProduct)

        if (response.status===200){
            
          toast.success("Product updated successfully")
          const updated = response.data.product
          setProducts(products.map(p=>p._id===updated._id? updated : p))

          set_id("")
          setTitle("")
          setPrice("")
          setCategory("")
          setDescription("")
          setIsFormUpdate(false)
        }


      } catch (error) {
        console.log("err", error)
      }
    }

  return (
    <div className='m-5'>
      <div>
        <h1 className='text-xl font-medium mb-4'>Update Product</h1>
        <form className='flex flex-col gap-3' onSubmit={handleProductSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" placeholder='Product Title' value={title} onChange={(e)=>setTitle(e.target.value)}
            className='bg-gray-100 px-2 py-1 rounded'/>
            <div className='flex gap-3'>
                <div className='w-full'>
                    <label htmlFor="price">Price:</label>
                    <input type="text" name="price" placeholder='Product Price' value={price} onChange={(e)=>setPrice(e.target.value)}
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
            className='bg-gray-700 text-white px-3 py-1.5 rounded'>Update Product</button>
        </form>
      </div>
    </div>
  )
}

export default ProductFormUpdate
