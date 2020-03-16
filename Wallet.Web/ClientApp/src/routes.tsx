import React, { ReactNode } from 'react';
import Layout from './Layout';
import { Route, Switch } from 'react-router-dom';
import { Login } from "./containers/Login";
import { RoutesConfig } from "./config/routes.config";

export const routes: ReactNode = (
    <Layout>
        <Switch>
            <Route exact path={RoutesConfig.Login.path} component={Login} />
        </Switch>
    </Layout>
);