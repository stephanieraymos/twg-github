import React from "react";
import { Form, Button } from "react-bootstrap";
import { useTruckContext } from "../../truckContext";

const UpdateTruckForm = ({ form, validated, handleSubmit, redirect }) => {
  const {
    salesNotes, setSalesNotes,
    accountingNotes, setAccountingNotes,
    logisticsNotes, setLogisticsNotes,
  } = useTruckContext();

  
  return (
    <>
      <Form
        ref={form}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="update-truck-form"
      >
        {/* //^ ----------SALES NOTES---------- */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Sales Notes</Form.Label>
          <Form.Control
            type="text"
            defaultValue={salesNotes}
            name="sales"
            onChange={(e) => setSalesNotes(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Make sure your notes include no numbers.
          </Form.Control.Feedback>
        </Form.Group>
        {/* //^ ----------ACCOUNTING NOTES---------- */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Accounting Notes</Form.Label>
          <Form.Control
            type="text"
            defaultValue={accountingNotes}
            name="accounting"
            onChange={(e) => setAccountingNotes(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Make sure your notes include no numbers.
          </Form.Control.Feedback>
        </Form.Group>
        {/* //^ ----------LOGISTICS NOTES---------- */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Logistics Notes</Form.Label>
          <Form.Control
            type="text"
            defaultValue={logisticsNotes}
            name="logistics"
            onChange={(e) => setLogisticsNotes(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Make sure your notes include no numbers.
          </Form.Control.Feedback>
        </Form.Group>

        <div className="form-footer-container">
          <Button
            type="submit"
            className="form-button"
            block
            style={{
              width: "100%",
              backgroundColor: "#f47c20",
              margin: "1.5rem 0rem 0rem",
            }}
          >
            Update Notes
          </Button>

          <Button
            type="button"
            onClick={() => {
              redirect();
            }}
            className="form-button"
            block
            style={{
              width: "100%",
              backgroundColor: "#000",
              margin: ".5rem 0rem 0rem",
            }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UpdateTruckForm;
