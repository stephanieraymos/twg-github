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
import UpdateNotes from "./UpdateNotes";
import { TruckProvider } from "../../truckContext";

const InventoryAllTrucks = () => {
  document.title = "Inventory - Database";

  const [trucks, addTruck] = useTruck();

  let { path } = useRouteMatch();

  return (
      <Switch>
        <PrivateRoute exact path={path}>
          <>
            <div>
              <Navigation />
            </div>
            <Container fluid>
              <AddInventory addNewTrucks={addTruck} />
            </Container>
            <TableInventory trucks={trucks} />
          </>
        </PrivateRoute>
        <TruckProvider>
          <PrivateRoute exact path={`${path}/:id`}>
            <TruckDetails />
          </PrivateRoute>
          <PrivateRoute exact path={`${path}/edit/:id`}>
            <UpdateTruckDetails />
          </PrivateRoute>
          <PrivateRoute exact path={`${path}/edit/notes/:id`}>
            <UpdateNotes />
          </PrivateRoute>
        </TruckProvider>
      </Switch>
  );
};
export default InventoryAllTrucks;
