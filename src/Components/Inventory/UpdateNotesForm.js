import React from "react";
import { Form, Button } from "react-bootstrap";
import { useTruckContext } from "../../truckContext";

const UpdateTruckForm = ({ form, validated, handleSubmit, redirect }) => {
  const {
    sales: [sales, setSales],
    accounting: [accounting, setAccounting],
    logistics: [logistics, setLogistics],
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
            defaultValue={sales}
            name="sales"
            onChange={(e) => setSales(e.target.value)}
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
            defaultValue={accounting}
            name="accounting"
            onChange={(e) => setAccounting(e.target.value)}
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
            defaultValue={logistics}
            name="logistics"
            onChange={(e) => setLogistics(e.target.value)}
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
