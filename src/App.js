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
  passwordResetPATH
} from "./Pages/paths";

import { LoginRoute, PrivateRoute, SuperuserRoute } from "./Pages/router";
import Login2 from "./Components/LoginAndSignup/Login_2";
import Logout from "./Components/LoginAndSignup/Logout";

import InventoryAllTrucks from "./Components/Inventory/InventoryAllTrucks";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import AccountDetails from "./Components/Users/AccountDetails";
import EmailVerification from "./Components/LoginAndSignup/EmailVerification";
import SuperuserHome from "./Components/Superuser/Home";
import { SuperuserProvider } from "./superuser";
import ResetPasswordPage from "./Components/Users/ResetPasswordPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import { InventoryProvider } from "./inventory";

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
          <InventoryProvider>
            <PrivateRoute path={inventoryPATH}>
              <InventoryAllTrucks />
            </PrivateRoute>
          </InventoryProvider>
          <PrivateRoute path={accountPATH}>
            <AccountDetails />
          </PrivateRoute>
          <Route exact path={logoutPATH}>
            <Logout />
          </Route>
          <Route exact path={`${emailVerificationPATH}/:id/:token/`}>
            <EmailVerification />
          </Route>
          <Route exact path={`${passwordResetPATH}/:id/:token/`}>
            <ResetPasswordPage />
          </Route>
          <SuperuserProvider>
            <SuperuserRoute path={superuserPATH}>
              <SuperuserHome />
            </SuperuserRoute>
          </SuperuserProvider>
        </Switch>
      </Router>
    </>
  );
};

export default App;
