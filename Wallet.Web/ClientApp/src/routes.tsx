import React, { ReactNode } from 'react';
import Layout from './Layout';
import { Route, Switch } from 'react-router-dom';
import { RoutesConfig } from "./config/routes.config";
import {Login, Register} from "./containers/Login";

export const routes: ReactNode = (
    <Layout>
        <Switch>
            <Route exact path={RoutesConfig.Login.path} component={Login} />
            <Route exact path={RoutesConfig.Register.path} component={Register}/>
            <Route exact path={RoutesConfig.Home.path} component={Register}/>
            <Route exact path={RoutesConfig.Balance.path} component={Register}/>
            <Route exact path={RoutesConfig.Expenses.path} component={Register}/>
            <Route exact path={RoutesConfig.Incomes.path} component={Register}/>
        </Switch>
    </Layout>
);