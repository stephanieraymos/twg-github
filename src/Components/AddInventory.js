import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useTruckContext } from "../truckContext";
import { useGlobalContext } from "../context";
import Alert from "./Alert";
import inventory from "../css/inventory.css";
import { Link } from "react-router-dom";

const AddInventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  document.title = "Add Inventory";
  const {
    truckLoad,
    setTruckLoad,
    id,
    truckName,
    setTruckName,
    truckPrice,
    setTruckPrice,
    truckContents,
    setTruckContents,
    truckManifest,
    setTruckManifest,

    showAlert,
  } = useTruckContext();

  const form = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    console.log(e.target);

    e.preventDefault();
    // setId(new Date().getTime().toString());
    if (truckName) {
      // Show alert and add truck to inventory only if name is true and not editing
      showAlert(true, "success", "Truck Added");
      //Creating new truck
      let newTruck = [id, truckName, truckPrice, truckContents, truckManifest];
      console.log("Truck Manifest", truckManifest);

      //Spreading out current truckLoad and adding newTruck to the list
      setTruckLoad([...truckLoad, newTruck]);
      setTruckName("");
      setTruckPrice("");
      setTruckContents([]);
      setTruckManifest([]);
      closeModal();
      console.log("New Truck", newTruck); //Logging new truck for testing purposes
    }
  };

  //Fetching the trucks db from the API link above //^----POST (ADD INVENTORY)----
  const postTrucks = async () => {
    const data = new FormData(form.current);
    try {
      const response = await fetch("http://143.110.225.28/api/v1/inventory/", {
        method: "POST",
        body: data,
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <div className="btn-container">
        <Button style={{ margin: "1rem 0 -.75rem 0"}} onClick={openModal}>
          Add Truck
        </Button>
      </div>

      <Modal show={isModalOpen} onHide={closeModal} className="">
        <Form ref={form} onSubmit={handleSubmit} method="post">
          <Modal.Body>
            <Form.Group>
              <Form.Label>Truck Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={truckName}
                onChange={(e) => setTruckName(e.target.value)}
                name="truckName"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Truck Price</Form.Label>
              <Form.Control
                type="text"
                required
                value={truckPrice}
                onChange={(e) => setTruckPrice(e.target.value)}
                name="truckPrice"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Truck Contents</Form.Label>
              <Form.Control
                type="text"
                required
                value={[truckContents]}
                onChange={(e) => setTruckContents(e.target.value)}
                name="truckContents"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Truck Manifest</Form.Label>
              <Form.Control
                type="file"
                multiple
                required
                value={[truckManifest]}
                onChange={(e) => setTruckManifest(e.target.value)}
                name="truckManifest"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={closeModal}
              className="center-btn"
            >
              Close
            </Button>
            <Button variant="success" type="submit" onClick={postTrucks}>
              Add Truck
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
// TP-51

export default AddInventory;
