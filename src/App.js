import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Contact from "./Components/Contact";
import Home from "./Components/Home";
import AddInventory from "./Components/Inventory/AddInventory";
import InventoryAllTrucks from "./Components/Inventory/InventoryAllTrucks";
import Dashboard from "./Components/Dashboard";
import Settings from "./Components/Settings";
import Statements from "./Components/Statements";
import Sidebar from "./Components/Sidebar";
import EmailVerification from "./Components/EmailVerification"
import Login2 from "./Components/Login_2";
import Logout from "./Components/Logout";
import AccountDetails from "./Components/AccountDetails"
import CustomerDb from "./Components/CustomerDb";
import OrderDetails from "./Components/OrderDetails";
import Orders from "./Components/Orders";
import TruckDetails from "./Components/Inventory/TruckDetails";
import UpdateTruckDetails from "./Components/Inventory/UpdateTruckDetails";
import Error from "./Pages/Error";

const App = () => {

  return (
    <>
      <Sidebar />

      
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
            <Route path="/CustomerDb" exact component={CustomerDb} />
            <Route path="/OrderDetails" exact component={OrderDetails} />
            <Route path="/Orders" exact component={Orders} />
            <Route path="/TruckDetails/:id" exact component={TruckDetails} />
            <Route path="/UpdateTruckDetails/:id" exact component={UpdateTruckDetails} />
            <Route path="*" exact component={Error} />
            <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
};

export default App;
