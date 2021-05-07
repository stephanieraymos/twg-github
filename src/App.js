import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  loginPATH,
  logoutPATH,
  dashboardPATH,
  inventoryPATH,
  accountPATH,
  emailVerificationPATH,
  superuserPATH,
  passwordResetPATH,
} from "./Pages/paths";

import { LoginRoute, PrivateRoute, SuperuserRoute } from "./Pages/router";
import Login2 from "./Components/LoginAndSignup/Login_2";
import Logout from "./Components/LoginAndSignup/Logout";

import InventoryAllTrucks from "./Components/Inventory/InventoryAllTrucks";
import AccountDetails from "./Components/Users/AccountDetails";
import EmailVerification from "./Components/LoginAndSignup/EmailVerification";
import SuperuserHome from "./Components/Superuser/Home";
import { SuperuserProvider } from "./context/superuser";
import ResetPasswordPage from "./Components/Users/ResetPasswordPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import AddInventoryFormSeal from "./Components/Inventory/TeamMember/AddInventoryFormSeal";

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
          <PrivateRoute exact path={accountPATH}>
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
          <Route exact path={`${inventoryPATH}/seal-form-page`}>
            <AddInventoryFormSeal />
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
