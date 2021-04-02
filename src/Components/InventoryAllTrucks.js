import React, {useEffect} from "react";
import Navigation from "./Navigation";
import { useTruck } from "../truckContext";
import inventory from "../css/inventory.css";
import AddInventory from "./AddInventory";
import { Container } from "react-bootstrap";
import TableInventory from "./TableInventory";
import { useGlobalContext } from "../context";

const InventoryAllTrucks = () => {
  document.title = "Inventory - Database";

  const { userId, setUserId, email } = useGlobalContext();

  const addNewTrucks = (truck, user) => {
    addTruck(truck);
  };
  const [addTruck] = useTruck();

  useEffect(() => {
    console.log(userId)
    console.log(typeof(userId))
  },[userId])

  console.log(email)


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
