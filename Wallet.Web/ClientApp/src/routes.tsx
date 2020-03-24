import React, { ReactNode } from 'react';
import Layout from './Layout';
import { Route, Switch } from 'react-router-dom';
import { RoutesConfig } from "./config/routes.config";
import {Login, Register} from "./containers/Login";
import {Home} from "./containers/Home";
import {Expenses} from "./containers/Expenses";

export const routes: ReactNode = (
    <Layout>
        <Switch>
            <Route exact path={RoutesConfig.Login.path} component={Login} />
            <Route exact path={RoutesConfig.Register.path} component={Register}/>
            <Route exact path={RoutesConfig.Home.path} component={Home}/>
            <Route exact path={RoutesConfig.Expenses.path} component={Expenses}/>
            <Route exact path={RoutesConfig.Incomes.path} component={Register}/>
        </Switch>
    </Layout>
);