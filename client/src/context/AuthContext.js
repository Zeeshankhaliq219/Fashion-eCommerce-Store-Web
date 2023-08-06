import React, { createContext, useContext, useEffect, useState } from 'react'
const AuthContext = createContext();


export default function AuthContextProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"))
        if (user?.token) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}