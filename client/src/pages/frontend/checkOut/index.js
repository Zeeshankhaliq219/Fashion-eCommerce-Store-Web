import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CheckOut from 'pages/frontend/checkOut/CheckOut'

export default function index() {

    return (
        <Routes>
            <Route path='/:productId/:source?' element={<CheckOut />} />
            {/* <Route path='/:productId/:source?' element={isAuthenticated === true ? <CheckOut /> : <Navigate to="/auth/login"/>} /> */}
        </Routes>
    )
}
