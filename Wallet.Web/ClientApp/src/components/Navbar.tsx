import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import { RoutesConfig, Route } from '../config/routes.config';
import 'antd/dist/antd.css'
import { Layout, Menu  } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const WalletLogo = require('../assets/image/wallet-icon.png') as string;

type NavbarProps = {
    readonly isAuthenticated: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
    const auth = sessionStorage.getItem("isAuthenticated");
    const navRoutes = Object.keys(RoutesConfig)
        .reduce((acc: Route[], key: string) => {
            const route = RoutesConfig[key];
            route.showInNav && acc.push(route);
            return acc;
        }, []);

    function handleClick() {

    }

    return (
        <div className='sider-container'>
            {auth &&
                <Sider className='sider'>
                    <Menu className='sider-menu' style={{ minHeight: '100vh', paddingTop: '120px' }}>
                        {auth && navRoutes.map(({ path, exact, displayName }) => (
                            <Menu.Item className='sider-menu-item' key={path}>
                                <Link to={path}>{displayName}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
            }
        </div>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Navbar);
