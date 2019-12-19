import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import {
  DASHBOARD_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  TRANSACTIONS_PATH
} from '../configs/constants';
import { SignIn, SignUp, RecentTransactions, Dashboard } from '../components';
import AuthLayout from '../layouts/AuthLayout';

const ROUTES = () => (
  <Router>
    <Switch>
      <Route path={SIGN_IN_PATH} component={SignIn} />
      <Route path={SIGN_UP_PATH} component={SignUp} />
      <AuthLayout>
        <Switch>
          <Route path={DASHBOARD_PATH} component={Dashboard} />
          <Route path={TRANSACTIONS_PATH} component={RecentTransactions} />
          <Route component={Dashboard} />
        </Switch>
      </AuthLayout>
    </Switch>
  </Router>
);

export default ROUTES;
