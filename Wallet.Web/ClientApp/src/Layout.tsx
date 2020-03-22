import React, { Fragment } from 'react';
import {Navbar} from "./components";

const Layout: React.FC = ({ children }) => (
    <Fragment>
        <Navbar />
        {children}
    </Fragment>
);

export default Layout;