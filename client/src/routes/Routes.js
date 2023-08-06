import React from 'react'
import Footer from 'components/footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Frontend from 'pages/frontend'
import PrivateRoute from 'privateRouting/PrivateRoute'
import Home from 'pages/frontend/home/index'
import ScrolToTop from 'components/common/ScrolToTop'
import Dashboard from 'pages/dashboard'

import Auth from 'pages/auth'

export default function index() {
    return (
        <>
            <main>
                <ScrolToTop />
                <Routes>
                    <Route path='/*' element={<Frontend />} />
                    <Route path='/dashboard/*' element={<PrivateRoute Component={Dashboard} />} />
                    <Route path='/auth/*' element={<PrivateRoute Component={Home} />} />
                    {/* <Route path='/auth/*' element={<Auth />} /> */}
                </Routes>
            </main>
            <Footer />
        </>
    )
}
