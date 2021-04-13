import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  loginPATH,
  logoutPATH,
  dashboardPATH,
  inventoryPATH,
  usersPATH,
  accountPATH,
  emailVerificationPATH,
} from "./Pages/paths";

import { LoginRoute, PrivateRoute } from "./Pages/router";
import Login2 from "./Components/LoginAndSignup/Login_2";
import Logout from "./Components/LoginAndSignup/Logout";

import InventoryAllTrucks from "./Components/Inventory/InventoryAllTrucks";
import Dashboard from "./Components/Dashboard/Dashboard";
import UserDb from "./Components/Users/UserDb";
import AccountDetails from "./Components/AccountDetails";
import EmailVerification from "./Components/LoginAndSignup/EmailVerification";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <LoginRoute exact path={loginPATH}>
            <Login2 />
          </LoginRoute>
          <PrivateRoute exact path={dashboardPATH}>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path={inventoryPATH}>
            <InventoryAllTrucks />
          </PrivateRoute>
          <PrivateRoute path={accountPATH}>
            <AccountDetails />
          </PrivateRoute>
          <Route exact path={logoutPATH}>
            <Logout />
          </Route>
          <Route exact path={`${emailVerificationPATH}:id/:token/`}>
            <EmailVerification />
          </Route>
          {/* <Route exact path={usersPATH}>
            <UserDb />
          </Route> */}
        </Switch>
      </Router>
    </>
  );
};

export default App;
