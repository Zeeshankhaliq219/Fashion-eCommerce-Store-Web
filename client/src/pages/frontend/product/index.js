import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductDetails from './ProductDetails/ProductDetails'
import ProductsList from './ProductsList'

export default function index() {
    return (
        <Routes>
            {/* yahan pe 2 routes hn ek productList jo k products show karwany k liye use ho raha hai. Show karwany ka matlb ye k jo hum
            search karty hn products ya phr home page sy hum view more waly produtcs ki list show hoti hai wo sara kam is file mein hua hai
            or wo filters wagaira b yahin use huye hn 
            yahan pe hum ny useParams use kiye hn pehla category ka or dusra b category ka yahan pe 2 categories ka maqsad hai k ya to hum 1 category b dikha sakty hn
            ya phr 2 categories ko merge kar k b dikha sakty hn or agr hum koi b category useParams mein pass na karyn to wo hmyn total products dikhaye ga mix waly 
             */}
            <Route path='/:category?/:more_category?' element={<ProductsList />} />            
            <Route path='details/:id?' element={<ProductDetails />} />

            {/* ye product detail wala page wo page hai jis mein kisi product pe click karny sy us ki furthur detail samny a jati hai
            yahan hum useParams mein sirf id pass karyn gy or is component ProductDetails mein ja k useParms sy id get kar k us ka 
            data get karyn gy */}
        </Routes>
        
    )
}
