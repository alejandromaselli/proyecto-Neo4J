import React from 'react';
import { Switch, Route, Redirect, HashRouter, BrowserRouter } from 'react-router-dom';

import App from './App';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Activate from './components/auth/Activate';
import Private from './components/layout/Private';
import Admin from './components/layout/Admin';
import Graph from './components/graph/Graph'

import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';
import Forgot from './components/auth/Forgot';
import Reset from './components/auth/Reset';

//Map route
import Map from './map/Map';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App} exact />
                <Route path="/signup" component={Signup} exact />
                <Route path="/signin" component={Signin} exact />
                <Route path="/auth/activate/:token" component={Activate} exact />
                <Route path="/auth/password/reset/:token" component={Reset} exact />
                <Route path="/auth/password/forgot" component={Forgot} exact />
                <Route path="/reset" component={Reset} exact />
                <PrivateRoute path="/private" component={Private} exact />
                <PrivateRoute path="/graph" component={Graph} exact />
                <AdminRoute path="/admin" component={Admin} />
                <Route path="/map" component={Map} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
