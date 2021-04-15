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
  superuserPATH,
} from "./Pages/paths";

import { LoginRoute, PrivateRoute, SuperuserRoute } from "./Pages/router";
import Login2 from "./Components/LoginAndSignup/Login_2";
import Logout from "./Components/LoginAndSignup/Logout";

import InventoryAllTrucks from "./Components/Inventory/InventoryAllTrucks";
import Dashboard from "./Components/Dashboard/Dashboard";
import UserDb from "./Components/Users/UserDb";
import AccountDetails from "./Components/Users/AccountDetails";
import EmailVerification from "./Components/LoginAndSignup/EmailVerification";
import SuperuserHome from "./Components/Superuser/Home";
import { SuperuserProvider } from "./superuser";

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
          <Route exact path={`${emailVerificationPATH}/:id/:token/`}>
            <EmailVerification />
          </Route>
          <SuperuserProvider>
            <SuperuserRoute path={superuserPATH}>
              <SuperuserHome />
            </SuperuserRoute>
          </SuperuserProvider>
          
          {/* <Route exact path={usersPATH}>
            <UserDb />
          </Route> */}
        </Switch>
      </Router>
    </>
  );
};

export default App;
