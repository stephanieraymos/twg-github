import React, { useRef, useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { Form, Col, Row } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { authService } from "../../authService";
import { useHistory } from "react-router-dom";
import { useInventoryContext } from "../../inventory"

const NotesForm = ({ id }) => {
  const salesForm = useRef(null);
  const logiForm = useRef(null);
  const actForm = useRef(null);

  const {
    updateInventory,
    salesNotes,
    setSalesNotes,
    accountingNotes,
    setAccountingNotes,
    logisticsNotes,
    setLogisticsNotes,
  } = useInventoryContext();

  useEffect(() => {
    console.log('salesNotes', salesNotes);
  }, [])

  const [validated, setValidated] = useState(false);
  const [isEditingLogi, setIsEditingLogi] = useState(false);
  const [isEditingAct, setIsEditingAct] = useState(false);
  const [isEditingSales, setIsEditingSales] = useState(false);

  const { is_seller, is_admin } = authService.getUser();
  let history = useHistory();

  const cancelLogi = () => {
    setIsEditingLogi(false);
  };
  const cancelAct = () => {
    setIsEditingAct(false);
  };
  const cancelSales = () => {
    setIsEditingSales(false);
  };

  const handleSalesSubmit = (event) => {
    const salesForm = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (salesForm.checkValidity() === true) {
      setValidated(false);
      updateSalesNotes();
      setIsEditingSales(false);
    } else {
      setValidated(true);
    }
  };
  const handleActSubmit = (event) => {
    const actForm = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (actForm.checkValidity() === true) {
      setValidated(false);
      updateAccountingNotes();
      setIsEditingAct(false);
    } else {
      setValidated(true);
    }
  };
  const handleLogiSubmit = (event) => {
    const logiForm = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (logiForm.checkValidity() === true) {
      setValidated(false);
      updateLogisticsNotes();
      setIsEditingLogi(false);
    } else {
      setValidated(true);
    }
  };
  // Return true or false to indicate if fetch was successful
  const updateSalesNotes = () => {
    const data = new FormData(salesForm.current);
    data.append("id", id);
    updateInventory(data);
  };

  // Return true or false to indicate if fetch was successful
  const updateAccountingNotes = () => {
    const data = new FormData(actForm.current);
    data.append("id", id);
    updateInventory(data);
  };
  // Return true or false to indicate if fetch was successful
  const updateLogisticsNotes = () => {
    const data = new FormData(logiForm.current);
    data.append("id", id);
    updateInventory(data);
  };
  return (
    <>
      {(is_seller || is_admin) && (
        <>
          {/* //^ SALES NOTES */}
          <Form
            ref={salesForm}
            style={{ border: "none" }}
            onSubmit={handleSalesSubmit}
          >
            <Form.Group>
              <div className="form-label-and-button-container">
                <Form.Label column sm={4} className="truck-data-title">
                  Sales Notes:
                </Form.Label>
                <div className="form-header-buttons-container">
                  <button
                    key={isEditingSales ? "button-submit" : "button-edit"}
                    type={isEditingSales ? "submit" : "button"}
                    onClick={
                      isEditingSales ? null : () => setIsEditingSales(true)
                    }
                    className="edit-notes-btn edit-notes-header-btn"
                  >
                    {isEditingSales ? (
                      "Update"
                    ) : (
                      <>
                        <FaEdit /> <span>Edit Notes</span>
                      </>
                    )}
                  </button>
                  {isEditingSales && (
                    <button
                      type="button"
                      onClick={
                        isEditingSales
                          ? () => cancelSales()
                          : (e) => {
                              e.preventDefault();
                            }
                      }
                      className="cancel-update-notes"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              <Col sm={8}>
                {isEditingSales ? (
                  <Form.Control
                    as="textarea"
                    type="salesNotes"
                    required
                    value={salesNotes}
                    onChange={(e) => setSalesNotes(e.target.value)}
                    name="sales"
                    className="notes-text-area"
                    rows={6}
                  />
                ) : (
                  <Form.Control
                    as="textarea"
                    type="text"
                    readOnly
                    value={
                      salesNotes.length !== 0 ? salesNotes : "No Notes Yet"
                    }
                    onChange={(e) => setSalesNotes(e.target.value)}
                    name="sales"
                    rows={4}
                  />
                )}
              </Col>
            </Form.Group>
          </Form>
          {/* //^ ACCOUNTING NOTES */}

          <Form
            ref={actForm}
            style={{ border: "none" }}
            onSubmit={handleActSubmit}
          >
            <Form.Group>
              <div className="form-label-and-button-container">
                <Form.Label column sm={4} className="truck-data-title">
                  Accounting Notes:
                </Form.Label>
                <div className="form-header-buttons-container">
                  <button
                    key={isEditingAct ? "button-submit" : "button-edit"}
                    type={isEditingAct ? "submit" : "button"}
                    onClick={isEditingAct ? null : () => setIsEditingAct(true)}
                    className="edit-notes-btn edit-notes-header-btn"
                  >
                    {isEditingAct ? (
                      "Update"
                    ) : (
                      <>
                        <FaEdit /> <span>Edit Notes</span>
                      </>
                    )}
                  </button>

                  {isEditingAct && (
                    <button
                      type="button"
                      onClick={
                        isEditingAct
                          ? () => cancelAct()
                          : (e) => {
                              e.preventDefault();
                            }
                      }
                      className="cancel-update-notes"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              <Col sm={8}>
                {isEditingAct ? (
                  <Form.Control
                    as="textarea"
                    type="accountingNotes"
                    required
                    value={accountingNotes}
                    onChange={(e) => setAccountingNotes(e.target.value)}
                    name="accounting"
                    onSubmit={handleActSubmit}
                    rows={6}
                  />
                ) : (
                  <Form.Control
                    as="textarea"
                    readOnly
                    value={
                      accountingNotes.length !== 0
                        ? accountingNotes
                        : "No Notes Yet"
                    }
                    onChange={(e) => setAccountingNotes(e.target.value)}
                    name="accounting"
                    rows={4}
                  />
                )}
              </Col>
            </Form.Group>
          </Form>
          {/* //^ LOGISTICS NOTES */}
          <Form
            style={{ border: "none" }}
            onSubmit={handleLogiSubmit}
            ref={logiForm}
          >
            <Form.Group>
              <div className="form-label-and-button-container">
                <Form.Label column sm={4} className="truck-data-title">
                  Logistics Notes:
                </Form.Label>
                <div className="form-header-buttons-container">
                  <button
                    key={isEditingLogi ? "button-submit" : "button-edit"}
                    type={isEditingLogi ? "submit" : "button"}
                    onClick={
                      isEditingLogi ? null : () => setIsEditingLogi(true)
                    }
                    className="edit-notes-btn edit-notes-header-btn"
                  >
                    {isEditingLogi ? (
                      "Update"
                    ) : (
                      <>
                        <FaEdit /> <span>Edit Notes</span>
                      </>
                    )}
                  </button>

                  {isEditingLogi && (
                    <button
                      type="button"
                      onClick={
                        isEditingLogi
                          ? () => cancelLogi()
                          : (e) => {
                              e.preventDefault();
                            }
                      }
                      className="cancel-update-notes"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              <Col sm={8}>
                {isEditingLogi ? (
                  <Form.Control
                    as="textarea"
                    required
                    value={logisticsNotes}
                    onChange={(e) => setLogisticsNotes(e.target.value)}
                    name="logistics"
                    rows={6}
                  />
                ) : (
                  <Form.Control
                    as="textarea"
                    readOnly
                    value={
                      logisticsNotes.length !== 0
                        ? logisticsNotes
                        : "No Notes Yet"
                    }
                    onChange={(e) => setLogisticsNotes(e.target.value)}
                    name="logistics"
                    rows={4}
                  />
                )}
              </Col>
            </Form.Group>
          </Form>
        </>
      )}
    </>
  );
};
// @todo Notes update and cancel buttons not updating when notes are updated.

export default NotesForm;
