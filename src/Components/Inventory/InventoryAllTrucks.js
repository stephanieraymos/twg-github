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
import NarrowYourSearch from "./NarrowSearch/NarrowYourSearch";
import { authService } from "../../authService";
import AddInventoryFormSeal from "./TeamMember/AddInventoryFormSeal";

const InventoryAllTrucks = () => {
  document.title = "Inventory - Database";

  const [trucks, addTruck] = useTruck();
  const { is_seller, is_admin } = authService.getUser();

  let { path } = useRouteMatch();
  let width = window.innerWidth;

  return (
    <InventoryProvider>
      <Switch>
        <PrivateRoute exact path={path}>
          <>
            <div>
              <Navigation />
            </div>
            <Container className="flex-parent-container" fluid>
              <div
                className={`${
                  is_seller || is_admin ? "table-top-container" : null
                }`}
              >
                <AddInventoryButton />
                <TableLegend />
              </div>
              {/* <div className="table-and-sidebar-container"> */}
              <div
                className={`${
                  width >= 1024
                    ? "table-and-sidebar-container"
                    : "table-and-sidebar-container-mobile"
                }`}
              >
                <NarrowYourSearch />
                <TableInventory trucks={trucks} />
              </div>
            </Container>
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
        <PrivateRoute exact path={`${path}/seal-form-page`}>
          <AddInventoryFormSeal />
        </PrivateRoute>
      </Switch>
    </InventoryProvider>
  );
};
export default InventoryAllTrucks;
