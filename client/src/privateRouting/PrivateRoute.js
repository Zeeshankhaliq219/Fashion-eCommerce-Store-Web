import React from 'react'
import { useAuthContext } from 'context/AuthContext'
import Auth from 'pages/auth'

export default function PrivateRoute({ Component }) {
    const { isAuthenticated } = useAuthContext()
    if (isAuthenticated === true) {
        return <Component />
    }
    return (
        <Auth />
    )
}
