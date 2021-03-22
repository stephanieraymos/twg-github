import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useTruckContext, useTruck } from "../truckContext";
import { useGlobalContext } from "../context";
import Alert from "./Alert";
import inventory from "../css/inventory.css";
import modalandsidebar from "../css/modalandsidebar.css";
import { Link } from "react-router-dom";

const AddInventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const url = "http://143.110.225.28/api/v1/inventory/"; //API LINK

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

  const addTruck = useTruck()[3];

  const { userId, setUserId } = useGlobalContext();

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
    setUserId("d73897ef-9b70-463f-8dc1-bdafbe8891ff");
    const data = new FormData(form.current);
    try {
      const response = await fetch("http://143.110.225.28/api/v1/inventory/", {
        method: "POST",
        body: data,
      });
      console.log(response);
      const newData = await response.json();
      addTruck(newData);
      console.log(newData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="btn-container">
        <Button
          className="boot-button"
          style={{ margin: "1rem 0 -.75rem 0" }}
          onClick={openModal}
        >
          Add Truck
        </Button>
      </div>

      <Modal show={isModalOpen} onHide={closeModal} className="form-in-modal">
        <Form ref={form} onSubmit={handleSubmit} method="post">
          <Modal.Header>
            <h1 className="modal-header">Add Truck</h1>
            <button onClick={closeModal} className="close-trucks-modal ml-auto">
              X
            </button>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "white" }}>
            <Form.Group className="center-form-group">
              <Form.Label style={{ color: "black" }}>Truck Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={truckName}
                onChange={(e) => setTruckName(e.target.value)}
                name="truckName"
              />

              <Form.Label style={{ color: "black" }}>Truck Price</Form.Label>
              <Form.Control
                type="textarea"
                required
                value={truckPrice}
                onChange={(e) => setTruckPrice(e.target.value)}
                name="truckPrice"
              />

              <Form.Label style={{ color: "black" }}>Truck Contents</Form.Label>
              <Form.Control
                type="text"
                required
                value={truckContents}
                onChange={(e) => setTruckContents(e.target.value)}
                name="truckContents"
                as="textarea"
                rows={3}
              />

              <Form.Label style={{ color: "black" }}>Truck Manifest</Form.Label>
              <Form.Control
                type="file"
                multiple
                required
                value={truckManifest}
                onChange={(e) => setTruckManifest(e.target.value)}
                name="truckManifest"
                style={{ fontSize: "1rem" }}
              />

              <Form.Label style={{ color: "black" }}>User ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={userId}
                name="userId"
                readOnly
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              onClick={postTrucks}
              className="boot-button mr-auto ml-auto"
            >
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
