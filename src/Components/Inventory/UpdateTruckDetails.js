import React, { useState, useRef, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { authService } from "../../authService";
import { getByIdURL, manifestURL, inventoryURL, imageURL } from "../../Pages/urls";
import UpdateTruckForm from "./UpdateTruckForm";
import { useTruckContext } from "../../truckContext";

import { inventoryPATH } from "../../Pages/paths";
import { useInventoryContext } from "../../inventory";

const UpdateTruckDetails = () => {
  const { id } = useParams();
  const [deletedManifests, setDeletedManifests] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [validated, setValidated] = useState(false);

  let history = useHistory();
  let location = useLocation();

  const {
    getInventoryById,
    updateInventory,
  } = useInventoryContext();

  let { from } = location.state || { from: { pathname: "/" } };

  document.title = "Add Inventory";

  const form = useRef(null);

  const redirect = () => {
    history.replace(from);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setValidated(false);
      updateTruck();
    } else {
      setValidated(true);
    }
  };

  // Return true or false to indicate if fetch was successful
  const updateTruck = () => {
    const data = new FormData(form.current);
    data.append("id", id);

    // turn string to array and insert to truck contents
    const tempContents = data.get("contents").split(",");
    data.delete("contents");
    tempContents.map((item) => data.append("contents", item));

    deletedImages.map((item) => data.append("delete_images", item));
    deletedManifests.map((item) => data.append("delete_manifests", item));
    updateInventory(data)
      .then((response) => redirect())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getInventoryById(id)
        .catch((error) => console.log(error))
  }, []);

  return (
    <>
      <div>
        <Navigation />
      </div>
      <h1 className="update-truck-header">Edit truck details</h1>

      <div className="update-truck-form-container">
        <UpdateTruckForm
          form={form}
          validated={validated}
          handleSubmit={handleSubmit}
          deletedImages={deletedImages}
          setDeletedImages={setDeletedImages}
          deletedManifests={deletedManifests}
          setDeletedManifests={setDeletedManifests}
          redirect={redirect}
        />
      </div>
    </>
  );
};

// TP-51

export default UpdateTruckDetails;
