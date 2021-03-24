import React, { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useTruckContext } from "../truckContext";
import Navigation from "./Navigation";
import { useHistory, useParams, Link } from "react-router-dom";

const inventoryURL = "https://api.thewholesalegroup.com/v1/trucks/";

const UpdateTruckDetails = () => {
  const { id } = useParams();

  const [newTruckManifest, setNewTruckManifest] = useState([]); // files to be added
  const [oldTruckManifestId, setOldTruckManifestId] = useState([]); // files to be deleted
  const [isTruckUpdated, setIsTruckUpdated] = useState(false); // checking if truck is deleted

  let history = useHistory();

  document.title = "Add Inventory";
  const {
    truckLoad,
    setTruckLoad,
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

  const redirect = () => {
    history.push(`/TruckDetails/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (truckName) {
      showAlert(true, "success", "Truck Details Updated");

      let updatedTruck = [
        id,
        truckName,
        truckPrice,
        truckContents,
        truckManifest,
      ];
      console.log("Truck Manifest", truckManifest);

      setTruckLoad([...truckLoad, updatedTruck]);
      setTruckName("");
      setTruckPrice("");
      setTruckContents([]);
      setTruckManifest([]);
      console.log("Updated Truck", updatedTruck);
    }
  };

  // Return true or false to indicate if fetch was successful
  const updateTruck = () => {
    console.log("update truck running");
    try {
      console.log("truckContents", truckContents);
      console.log(Array.isArray(truckContents));
      const data = new FormData();
      data.append("id", id);
      data.append("truckName", truckName);
      data.append("truckPrice", String(truckPrice));
      truckContents.map((content) => data.append("truckContents", content));
      newTruckManifest.map((file) => data.append("truckManifest", file));
      oldTruckManifestId.map((id) => data.append("truckManifestId", id));
      fetch(inventoryURL, {
        method: "PUT",
        body: data,
      }).then((response) => {
        console.log(response);
        if (response.ok) return true;
        else return false;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Navigation />
      </div>
      <h1 className="update-truck-header">Edit truck details</h1>

      <div className="update-truck-form-container">
        <Form
          ref={form}
          onSubmit={handleSubmit}
          method="post"
          className="update-truck-form"
        >
          <Form.Group className="center-form-group">
            <Form.Label htmlFor="truckName" style={{ color: "black" }}>
              Truck Name
            </Form.Label>
            <Form.Control
              type="text"
              id="truckName"
              required
              value={truckName}
              onChange={(e) => setTruckName(e.target.value)}
              name="truckName"
            />

            <Form.Label htmlFor="truckPrice" style={{ color: "black" }}>
              Truck Price
            </Form.Label>
            <Form.Control
              type="textarea"
              id="truckPrice"
              required
              value={truckPrice}
              onChange={(e) => setTruckPrice(e.target.value)}
              name="truckPrice"
            />

            <Form.Label htmlFor="truckContents" style={{ color: "black" }}>
              Truck Contents
            </Form.Label>
            <Form.Control
              type="text"
              id="truckContents"
              required
              value={truckContents}
              onChange={(e) => setTruckContents(e.target.value)}
              name="truckContents"
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Link
            to={history}
            onClick={(e) => {
              e.preventDefault();
              updateTruck(id, truckName, truckPrice, truckContents);
              console.log("Submit changes button pressed");
              redirect();
            }}
            className="edit-truck-btn"
          >
            Submit changes
          </Link>
        </Form>
      </div>
    </>
  );
};
// TP-51

export default UpdateTruckDetails;
