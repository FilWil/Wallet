import React, { ReactNode } from 'react';
import Layout from './Layout';
import { Route, Switch } from 'react-router-dom';
import { RoutesConfig } from "./config/routes.config";
import Welcome from "./containers/Login/Welcome";
import {Login, Register} from "./containers/Login";

export const routes: ReactNode = (
    <Layout>
        <Switch>
            <Route exact path={RoutesConfig.Login.path} component={Login} />
            <Route exact path={RoutesConfig.Register.path} component={Register}/>
        </Switch>
    </Layout>
);