import React, { useState } from 'react'
import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import {
    AppstoreOutlined, MailOutlined, SettingOutlined
} from '@ant-design/icons';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle';
import { useNavigate } from 'react-router-dom';

export default function DashboardMenu({ isCollapsed }) {
    var navigate = useNavigate()

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        getItem('Dashboard', '/dashboard', <MailOutlined />),
        getItem('Home', '/', <MailOutlined />),
        getItem('Orders', '/dashboard/orders', <AppstoreOutlined />),
        getItem('Products', '', <SettingOutlined />, [
            getItem('Add Products', '/dashboard/add-products'),
            getItem('All Products', '/dashboard/all-products'),
        ]),
    ];


    const onClick = (e) => {
        if (e.key !== "") {
            navigate(e.key)

        }
    };
    return (
        <>
            <Sider trigger={null} collapsible collapsed={isCollapsed}>
                <div className="demo-logo-vertical" />
                <Menu                    
                    onClick={onClick}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/dashboard']}
                    items={items}
                />
            </Sider>
        </>
    )
}
