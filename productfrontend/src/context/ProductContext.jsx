import { createContext, useState } from "react";

export const ProductContext=createContext()

export const ProductContextProvider=({children})=>{

    const [isFormUpdate, setIsFormUpdate]=useState(false)
    const [productFormUpdateId, setProductFormUpdateId]=useState("")

    return(
        <ProductContext.Provider value={{isFormUpdate, setIsFormUpdate, productFormUpdateId, setProductFormUpdateId}}>
            {children}
        </ProductContext.Provider>
    )
}