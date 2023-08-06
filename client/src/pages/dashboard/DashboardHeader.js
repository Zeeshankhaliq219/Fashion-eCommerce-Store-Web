import React from 'react'
import { Header } from 'antd/es/layout/layout'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useAuthContext } from 'context/AuthContext';



export default function DashboardHeader({ setCollapsed, collapsed }) {
    const { setIsAuthenticated } = useAuthContext()

    // handleLogOut
    const handleLogOut = () => {

        localStorage.removeItem('user')
        setIsAuthenticated(false)

    }


    return (
        <Header
            style={{
                padding: 0,
                background: "white",
                display: "flex",
                alignItems: "center"
            }}
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            <div className="d-flex ">
                <h2 className='text-success fw-bold'>Dashboard</h2>
                <button className="btn btn-success btn-sm ms-3 rounded-pill px-5 text-white button-stylling" onClick={handleLogOut}>LOGOUT</button>

            </div>
        </Header>
    )
}
