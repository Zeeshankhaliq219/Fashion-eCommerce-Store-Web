import React, { useState } from 'react'
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import DashboardMenu from './DashboardMenu';
import DashboardHeader from './DashboardHeader';
import Routes from './routes';


export default function Index() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* menu of dashboard */}
            <DashboardMenu isCollapsed={collapsed} />
            <Layout>
                {/* header of dashboard */}
                <DashboardHeader setCollapsed={setCollapsed} collapsed={collapsed} />

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: "white",
                    }}
                >
                    <Routes />
                </Content>
            </Layout>
        </Layout>
    )
}
