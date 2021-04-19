import React, { useState } from "react";
import FormAddInventory from "./FormAddInventory";
import { Image } from "react-bootstrap";
import { useGlobalContext } from "../../context";
import Navigation from "../Navigation/Navigation";
import {
  useHistory,
} from "react-router-dom";
import back from "../../img/back.svg";
import { inventoryPATH } from "../../Pages/paths";

const AddInventoryModal = ({ addNewTrucks }) => {

  const {
    userId,
    setUserId,
  } = useGlobalContext();

  let history = useHistory();

  return (
    <>
      <div>
        <Navigation />
      </div>

      <div>
        <div className="flex-start-center" style={{ width: "85%", margin: "24px auto" }}>
          <Image
            src={back}
            style={{ cursor: "pointer", height: "60px" }}
            onClick={() => history.replace(inventoryPATH)}
          />
          <div
            className="form-label"
            style={{ color: "black", fontSize: "36px", margin: "0px 24px" }}
          >
            Add New Truck
          </div>
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
