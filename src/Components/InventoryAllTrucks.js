import React from "react";
import Navigation from "./Navigation";
import { useTruck } from "../truckContext";
import inventory from "../css/inventory.css";
import AddInventory from "./AddInventory";
import { Container } from "react-bootstrap";
import TableInventory from "./TableInventory";
import { useGlobalContext } from "../context";

const InventoryAllTrucks = () => {
  document.title = "Inventory - Database";

  const addNewTrucks = (truck) => {
    addTruck(truck);
  };
  const [addTruck] = useTruck();

  const {
    userId,
  } = useGlobalContext();

  return (
    <>
      {console.log("userId", userId)}
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
