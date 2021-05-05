import React from "react";
import AddInventoryForm from "./AddInventoryForm";
import { Image } from "react-bootstrap";
import Navigation from "../Navigation/Navigation";
import { useHistory } from "react-router-dom";
import back from "../../img/back.svg";
import { inventoryPATH } from "../../Pages/paths";
import AddInventoryFormBOL from "./TeamMember/AddInventoryFormBOL";
import { authService } from "../../authService";
import { Steps, Step } from "react-step-builder";

const AddInventoryModal = ({ addNewTrucks }) => {
  let history = useHistory();
  const { is_team_member, is_admin, is_seller } = authService.getUser();

  return (
    <>
      <div>
        <Navigation />
      </div>

      <div>
        <div
          className="flex-start-center"
          style={{ width: "85%", margin: "24px auto" }}
        >
          <Image
            src={back}
            style={{ cursor: "pointer", height: "60px" }}
            onClick={() => history.replace(inventoryPATH)}
          />
          <div
            className="form-label"
            style={{ color: "black", fontSize: "36px", margin: "0px 24px" }}
          >
            Add New Load
          </div>
        </div>

        {/* //^ MODAL BODY */}
        {is_admin ? (
          <AddInventoryFormBOL />
        ) : (
          <AddInventoryForm addNewTrucks={addNewTrucks} />
        )}
        {/* <AddInventoryForm addNewTrucks={addNewTrucks} /> */}
      </div>
    </>
  );
};

export default AddInventoryModal;
