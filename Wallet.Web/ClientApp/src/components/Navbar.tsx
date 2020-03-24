import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ApplicationState } from '../store';
import { RoutesConfig, Route } from '../config/routes.config';

const WalletLogo = require('../assets/image/wallet-icon.png') as string;

type NavbarProps = {
    readonly isAuthenticated: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
    const auth = localStorage.getItem("isAuthenticated");
    const navRoutes = Object.keys(RoutesConfig)
        .reduce((acc: Route[], key: string) => {
            const route = RoutesConfig[key];
            route.showInNav && acc.push(route);
            return acc;
        }, []);

    return (
        <div>
            {auth && <nav
                role='navigation'
                className='navbar'
                aria-label='main navigation'
            >
                <div className='navbar-wrapper'>
                    <div className='brand-wrapper'>
                        <img
                            width="45"
                            id="login-img"
                            src={WalletLogo}
                            alt="money-logo"
                        />
                        <span className='navbar-wrapper__logo-text'>Wallet</span>
                    </div>
                    <div className='navbar-routes'>
                        {auth && navRoutes.map(({ path, exact, displayName }) => (
                            <NavLink
                                to={path}
                                key={path}
                                exact={exact}
                                className='navbar-item'
                                activeClassName='is-active'
                            >
                                {displayName}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>}
        </div>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Navbar);
