import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddInventoryModal from "./AddInventoryModal";
import cancel from "../../img/cancel.svg";
import { useAuthContext } from "../../auth";

const AddInventory = ({ addNewTrucks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isSeller, isAdmin } = useAuthContext();

  document.title = "Add Inventory";
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isSeller() || isAdmin() ? (
        <div className="btn-container">
          <Button
            className="boot-button"
            style={{ margin: "1rem 0 -.75rem 0" }}
            onClick={openModal}
          >
            Add Load
          </Button>
        </div>
      ) : null}
      <AddInventoryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        cancel={cancel}
        addNewTrucks={addNewTrucks}
      />
    </>
  );
};
// TP-51

export default AddInventory;
