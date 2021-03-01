import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import Inventory from "./Components/Inventory";
import AddInventory from "./Components/AddInventory";
import InventoryAllTrucks from "./Components/InventoryAllTrucks";
import Navigation from "./Components/Navigation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route path="/Home" exact component={Home} />
          <Route path="/Inventory" exact component={Inventory} />
          <Route path="/AddInventory" exact component={AddInventory} />
          <Route path="/Contact" exact component={Contact} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
