import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Products = () => {

    const [products, setProducts]=useState([])

    const getProducts=async()=>{
        try {
            const response=await axios(`${import.meta.env.VITE_BASE_URL}/products`)

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

    const handleDelete=async(id)=>{
        try {
            const response=await axios.delete(`${import.meta.env.VITE_BASE_URL}/products/delete/${id}`)
            if(response.status===200){
                getProducts()
                toast.success("Product deleted Successfully")
            }
        } catch (error) {
            console.log("err", error)
        }
    }

    const handleEdit=async(id)=>{
        try {


            const response=await axios.put(`${import.meta.env.VITE_BASE_URL}/products/update/${id}`)

            if(response.status===200){
                getProducts()
                // toast.success("Product Updated Succesfully")
            }

        } catch (error) {
            console.log("err", error)
        }
    }

  return (
    <div className='p-4'>
      <h2 className='mt-2 text-xl font-medium'>Products ({products.length})</h2>
      <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-3'>
        {
            products.map(product=>(
                <div key={product._id} className=' border border-gray-200 p-2'>
                    <h3 className='text-lg font-medium'>Title: {product.title}</h3>
                    <p>Description: {product.description}</p>
                    <p className='text-gray-600 mt-2'>Price: {product.price}</p>
                    <p className='text-gray-600'>Category: {product.category}</p>
                    <div className='flex justify-between mt-2'>
                        <button onClick={()=>handleDelete(product._id)}
                        className='bg-gray-600 text-white px-2 py-1 rounded cursor-pointer'>Delete</button>
                        <button onClick={()=>handleEdit(product._id)}
                        className='bg-gray-600 text-white px-2 py-1 rounded cursor-pointer'>Edit</button>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Products
