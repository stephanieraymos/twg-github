import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation 
} from "react-router-dom";
import { AppProvider, useGlobalContext } from "./context";
import "bootstrap/dist/css/bootstrap.min.css"

import Contact from "./Components/Contact";
import Home from "./Components/Home";
import AddInventory from "./Components/AddInventory";
import InventoryAllTrucks from "./Components/InventoryAllTrucks";
import Navigation from "./Components/Navigation";
import Dashboard from "./Components/Dashboard";
import Settings from "./Components/Settings";
import Statements from "./Components/Statements";
import Login from "./Components/Login";
import Sidebar from "./Components/Sidebar";
import Signup from "./Components/Signup";
import Signup2 from "./Components/Signup_2";
import Login2 from "./Components/Login_2";
import CustomerDb from "./Components/CustomerDb";
import OrderDetails from "./Components/OrderDetails";
import Orders from "./Components/Orders";
import TruckDetails from "./Components/TruckDetails";
import UpdateTruckDetails from "./Components/UpdateTruckDetails";
import Error from "./Pages/Error";

const App = () => {
  // const { pathname } = useLocation();

  return (
    <>
      <Login />
      <Sidebar />

      
      <Router>
      {/* { pathname !== '/Home' && <Navigation /> } */}

            {/* <Navigation /> */}
        <Switch>
            <Route exact path="/">
              <Redirect to="/Home" />
            </Route>
          <Route path="/Home" exact component={Home} />
            <Route path="/Signup" exact component={Login2} />
            <Route path="/Dashboard" exact component={Dashboard} />
            <Route path="/AddInventory" exact component={AddInventory} />
            <Route
              path="/InventoryAllTrucks"
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
