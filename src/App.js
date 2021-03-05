import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import Inventory from "./Components/Inventory";
import AddInventory from "./Components/AddInventory";
import InventoryAllTrucks from "./Components/InventoryAllTrucks";
import Navigation from "./Components/Navigation";
import Dashboard from "./Components/Dashboard";
import Settings from "./Components/Settings";
import Statements from "./Components/Statements";
import Modal from "./Components/Modal";
import Sidebar from "./Components/Sidebar";
import Signup from "./Components/Signup";
import CustomerDb from "./Components/CustomerDb";

function App() {
  return (
    <>
      <Modal />
      <Sidebar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route path="/Home" exact component={Home} />
          <Route path="/Dashboard" exact component={Dashboard} />
          <Route path="/AddInventory" exact component={AddInventory} />
          <Route path="/InventoryAllTrucks" exact component={InventoryAllTrucks} />
          <Route path="/Settings" exact component={Settings} />
          <Route path="/Statements" exact component={Statements} />
          <Route path="/Contact" exact component={Contact} />
          <Route path="/Signup" exact component={Signup} />
          <Route path="/CustomerDb" exact component={CustomerDb} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
