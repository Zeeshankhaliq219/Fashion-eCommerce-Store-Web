import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OrderDetail from './Order-Detail'
import MyOrders from './My-Orders'

export default function index() {
    return (
        <Routes>
            <Route path='/' element={<MyOrders />} />
            <Route path='/order-detail/:orderId?' element={<OrderDetail />} />
        </Routes>
    )
}
