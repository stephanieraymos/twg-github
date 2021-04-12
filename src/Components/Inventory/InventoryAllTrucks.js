import React, {useEffect} from "react";
import Navigation from "../Navigation/Navigation";
import { useTruck } from "../../truckContext";
import AddInventory from "./AddInventory";
import { Container } from "react-bootstrap";
import TableInventory from "./TableInventory";
import inventory from "../../css/inventory.css";
import { useGlobalContext } from "../../context";
import { PrivateRoute } from "../../Pages/router";
import {
  Route,
  Switch,
  useRouteMatch
} from "react-router-dom";
import TruckDetails from "./TruckDetails";
import UpdateTruckDetails from "./UpdateTruckDetails";
import { TruckProvider } from "../../truckContext";

const InventoryAllTrucks = () => {
  document.title = "Inventory - Database";

  const addNewTrucks = (truck, user) => {
    addTruck(truck);
  };
  const [addTruck] = useTruck();

  let { path } = useRouteMatch();

  return (
      <Switch>
        <PrivateRoute exact path={path}>
          <>
            <div>
              <Navigation />
            </div>
            <Container fluid>
              <AddInventory addNewTrucks={addNewTrucks} />
            </Container>
            <TableInventory />
          </>
        </PrivateRoute>
        <TruckProvider>
          <PrivateRoute path={`${path}/:id`}>
            <TruckDetails />
          </PrivateRoute>
          <PrivateRoute path={`${path}/edit/:id`}>
            <UpdateTruckDetails />
          </PrivateRoute>
        </TruckProvider>
      </Switch>
  );
};
export default InventoryAllTrucks;
