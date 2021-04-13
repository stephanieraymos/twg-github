import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  loginPATH,
  logoutPATH,
  dashboardPATH,
  inventoryPATH,
} from "./Pages/paths";

import { LoginRoute, PrivateRoute } from "./Pages/router";
import Login2 from "./Components/LoginAndSignup/Login_2";
import Logout from "./Components/LoginAndSignup/Logout";

import InventoryAllTrucks from "./Components/Inventory/InventoryAllTrucks";
import Dashboard from "./Components/Dashboard/Dashboard";

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
          <Route exact path={logoutPATH}>
            <Logout />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
