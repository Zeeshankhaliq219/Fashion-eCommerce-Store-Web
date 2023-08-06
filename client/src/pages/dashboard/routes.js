import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardOrders from './DashboardOrders'
import AddProducts from './AddProducts'
import AllProducts from './AllProducts'

export default function index() {
  return (
    <Routes>
      <Route path='/orders' element={<DashboardOrders />} />
      <Route path='/add-products' element={<AddProducts />} />
      <Route path='/all-products' element={<AllProducts />} />
    </Routes>
  )
}
