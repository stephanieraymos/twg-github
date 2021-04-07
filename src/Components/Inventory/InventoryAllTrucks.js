import React from "react";
import Navigation from "../Navigation";
import { useTruck } from "../../truckContext";
import AddInventory from "./AddInventory";
import { Container } from "react-bootstrap";
import TableInventory from "./TableInventory";
import inventory from "../../css/inventory.css";

const InventoryAllTrucks = () => {
  document.title = "Inventory - Database";

  const addNewTrucks = (truck, user) => {
    addTruck(truck);
  };
  const [addTruck] = useTruck();

  return (
    <>
      <div>
        <Navigation />
      </div>
      <Container fluid>
        <AddInventory addNewTrucks={addNewTrucks} />
      </Container>
      <TableInventory />
    </>
  );
};
export default InventoryAllTrucks;
