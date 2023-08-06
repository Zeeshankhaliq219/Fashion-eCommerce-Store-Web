import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './home'
import Cart from 'pages/frontend/cart/Cart'
import Product from 'pages/frontend/product'
import Favourite from 'pages/frontend/favourite/Favourite'
import Shop from './shop/Shop'
import About from './about/About'
import Contact from './contact/Contact'
import MyOrders from 'pages/frontend/myOrders'
import CheckOut from './checkOut'
import Navbar from 'components/header/Navbar'

export default function index() {

    return (
        <>
            <Navbar />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/favourite' element={<Favourite />} />

                {/* our nested routes are below and simple routes are upside */}
                <Route path='/my-orders/*' element={<MyOrders />} />
                <Route path='/products/*' element={<Product />} />
                <Route path='/check-out/*' element={<CheckOut />} />
            </Routes>
        </>
    )
}
