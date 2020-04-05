import React from 'react';
import {Navbar} from "./components";

import { Layout as AntLayout } from 'antd';
const { Header, Footer, Content } = AntLayout;
const auth = sessionStorage.getItem('isAuthenticated');

const Layout: React.FC = ({ children }) => (
    <AntLayout style={{ minHeight: '100vh', backgroundColor: 'white' }}>
            <Navbar/>
            <Content style={{ backgroundColor: 'white' }}>
                <Header style={{ backgroundColor: 'white' }}></Header>
                {children}
                <Footer style={{ backgroundColor: 'white' }}></Footer>
            </Content>
    </AntLayout>
);

export default Layout;