import React, { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import Route from './route';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Profile from 'pages/Profile';
import Dashboard from 'pages/Dashboard';

const Routes = (): ReactElement => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />

      {/* <Route path="/" component={() => <h1>404</h1>} /> */}
    </Switch>
  );
};

export default Routes;
