import React, { useState } from "react";
import FormAddInventory from "./FormAddInventory";
import { Modal } from "react-bootstrap";
import { useGlobalContext } from "../../context";
import Navigation from "../Navigation/Navigation";

const AddInventoryModal = ({ addNewTrucks }) => {

  const {
    userId,
    setUserId,
  } = useGlobalContext();

  return (
    <>
      <div>
        <Navigation />
      </div>

      <div>
        <div
          className="form-label"
          style={{ width: "85%", color: "black", fontSize: "36px", margin: "24px auto" }}
        >
          Add New Truck
        </div>

        {/* //^ MODAL BODY */}
        <FormAddInventory
          userId={userId}
          addNewTrucks={addNewTrucks}
        />
      </div>
    </>
  );
};

export default AddInventoryModal;
