import React, { createContext, useContext, useEffect, useState } from 'react'

const ProductContext = createContext()

export default function ProductContextProvider(props) {
    const [cartItemsLength, setCartItemsLength] = useState(0)
    const [favItemsLength, setFavItemsLength] = useState(0)
    const [changeCartItems, setChangeCartItems] = useState(false)

    useEffect(() => {
        let documents = JSON.parse(localStorage.getItem("cart"))
        let favDocuments = JSON.parse(localStorage.getItem("favourite"))
        if (documents !== null) {
            setCartItemsLength(documents.length)
        }
        
        if (favDocuments !== null) {
            setFavItemsLength(favDocuments.length)

        }


    }, [changeCartItems])

    return (
        <ProductContext.Provider value={{ cartItemsLength, changeCartItems, setChangeCartItems, favItemsLength }}>
            {props.children}
        </ProductContext.Provider>
    )
}
export const useProductContext = () => {
    return useContext(ProductContext)
}
