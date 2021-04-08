import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import { dashboard, inventory } from "./Pages/paths";

import { PrivateRoute } from "./auth";
import Sidebar from "./Components/Navigation/Sidebar";
import Login2 from "./Components/LoginAndSignup/Login_2";
// import Contact from "./Pages/Contact";
// import Home from "./Pages/Home";
// import AddInventory from "./Components/Inventory/AddInventory";
import InventoryAllTrucks from "./Components/Inventory/InventoryAllTrucks";
import Dashboard from "./Components/Dashboard";
import { inventoryURL } from "./Pages/urls";
// import Settings from "./Components/Settings";
// import Statements from "./Components/Statements";
// import EmailVerification from "./Components/LoginAndSignup/EmailVerification"
// import Logout from "./Components/LoginAndSignup/Logout";
// import AccountDetails from "./Components/AccountDetails"
// import UserDb from "./Components/Users/UserDb";
// import OrderDetails from "./Components/Orders/OrderDetails";
// import Orders from "./Components/Orders/Orders";
// import TruckDetails from "./Components/Inventory/TruckDetails";
// import UpdateTruckDetails from "./Components/Inventory/UpdateTruckDetails";
// import Error from "./Pages/Error";

const App = () => {

  return (
    <>

      <Router>
        <Switch>
          <Route exact path="/">
            <Login2 />
          </Route>
          {/* <PrivateRoute path={dashboard}>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path={inventory}>
            <InventoryAllTrucks />
          </PrivateRoute> */}
        </Switch>
      </Router>

      {/* <Sidebar />
      <Router>
        <Switch>
            <Route path="/" exact component={Login2} />
            <Route path="/register/verify/:id/:token/" exact component={EmailVerification} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/account" exact component={AccountDetails} />
            <Route path="/home" exact component={Home} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/trucks/add" exact component={AddInventory} />
            <Route
              path="/trucks"
              exact
              component={InventoryAllTrucks}
            />
            <Route path="/Settings" exact component={Settings} />
            <Route path="/Statements" exact component={Statements} />
            <Route path="/Contact" exact component={Contact} />
            <Route path="/CustomerDb" exact component={UserDb} />
            <Route path="/OrderDetails" exact component={OrderDetails} />
            <Route path="/Orders" exact component={Orders} />
            <Route path="/TruckDetails/:id" exact component={TruckDetails} />
            <Route path="/UpdateTruckDetails/:id" exact component={UpdateTruckDetails} />
            <Route path="*" exact component={Error} />
            <Redirect to="/" />
        </Switch>
      </Router> */}
    </>
  );
};

export default App;
