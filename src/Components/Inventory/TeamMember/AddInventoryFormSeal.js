import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { authService } from "../../../authService";
import { inventoryPATH } from "../../../Pages/paths";
import { useHistory } from "react-router-dom";
import { useInventoryContext } from "../../../inventory";

const AddInventoryFormSeal = ({ addNewTrucks }) => {
  const form = useRef(null);
  const [validated, setValidated] = useState(false);
  let history = useHistory();

  const { id } = authService.getUser();

  const { addInventory, inventory, setInventory } = useInventoryContext();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setValidated(false);
      postTrucks();
    } else {
      setValidated(true);
    }
  };

  const handleNext = (option) => {
    //Go to next page
    if (option === "yes") {
      //Go to confirm details pages
    } else {
      //Go to enter details page
    }
    console.log("button triggered");
  };

  const back = () => {
    history.replace(inventoryPATH);
  };

  //^---- POST (ADD INVENTORY) ----
  const postTrucks = () => {
    const data = new FormData(form.current);
    data.append("seller_id", id);
    addInventory(data).then((data) => {
      setInventory([...inventory, data]);
      back();
    });
  };

  return (
    <>
      <Form
        ref={form}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={{ width: "85%", margin: "24px auto" }}
      >
        {/* //^ ------------------- SEAL MATCH ---------------------- */}
        <Form.Group>
          <Form.Label className="form-label">
            Does Seal # on truck = Seal # on BOL?
          </Form.Label>
          <Form.Control type="select" required name="seal" />
          <option value="1">Yes</option>
          <option value="0">No</option>
          <Form.Control.Feedback type="invalid">
            Please answer yes or no.
          </Form.Control.Feedback>
        </Form.Group>

        <div className="form-footer-container">
          <Button
            type="submit"
            className="form-button"
            block
            style={{ width: "100%", backgroundColor: "#f47c20" }}
            onClick={(option) => handleNext()}
          >
            Next
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddInventoryFormSeal;
