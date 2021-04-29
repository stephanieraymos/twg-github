import React from "react";
import Navigation from "../Navigation/Navigation";
import { useTruck } from "../../truckContext";
import AddInventoryButton from "./AddInventoryButton";
import { Container } from "react-bootstrap";
import TableInventory from "./TableInventory";
import TableLegend from "./TableLegend";
import inventory from "../../css/inventory.css";
import { PrivateRoute } from "../../Pages/router";
import { Switch, useRouteMatch } from "react-router-dom";
import TruckDetails from "./TruckDetails";
import UpdateTruckDetails from "./UpdateTruckDetails";
import { TruckProvider } from "../../truckContext";
import AddInventoryPage from "./AddInventoryPage";
import { InventoryProvider } from "../../inventory";

const InventoryAllTrucks = () => {
  document.title = "Inventory - Database";

  const [trucks, addTruck] = useTruck();

  let { path } = useRouteMatch();

  return (
    <InventoryProvider>
      <Switch>
        <PrivateRoute exact path={path}>
          <>
            <div>
              <Navigation />
            </div>
            <Container fluid>
              <div className="table-top-container">
                <AddInventoryButton />
                <TableLegend />
              </div>
            </Container>
            <TableInventory trucks={trucks} />
          </>
        </PrivateRoute>
        <PrivateRoute exact path={`${path}/add`}>
          <AddInventoryPage addNewTrucks={addTruck} />
        </PrivateRoute>
        <PrivateRoute exact path={`${path}/:id`}>
          <TruckDetails />
        </PrivateRoute>
        <PrivateRoute exact path={`${path}/edit/:id`}>
          <UpdateTruckDetails />
        </PrivateRoute>
      </Switch>
    </InventoryProvider>
  );
};
export default InventoryAllTrucks;
