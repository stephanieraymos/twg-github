import React, { useRef } from "react";
import { useGlobalContext } from "../../context";
import { useAuthContext } from "../../auth";
import { Form, Col, Row } from "react-bootstrap";
import { inventoryURL } from "../../Pages/urls";
import { FaEdit } from "react-icons/fa";

const NotesForm = (id) => {
  const salesForm = useRef(null);
  const logiForm = useRef(null);
  const actForm = useRef(null);
  const {
    isEditingLogi,
    setIsEditingLogi,
    isEditingAct,
    setIsEditingAct,
    isEditingSales,
    setIsEditingSales,
    salesReadMore,
    setSalesReadMore,
    accountingReadMore,
    setAccountingReadMore,
    logisticsReadMore,
    setLogisticsReadMore,
    setValidated,
    salesNotes,
    setSalesNotes,
    actNotes,
    setActNotes,
    logiNotes,
    setLogiNotes,
    setOriginalValues,
  } = useGlobalContext();
  const { isSeller, isAdmin, accessToken } = useAuthContext();

  // Return true or false to indicate if fetch was successful
  const updateSalesNotes = () => {
    const data = new FormData(salesForm.current);
    data.append("id", id);

    fetch(inventoryURL, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
      body: data,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return true;
        } else return false;
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      performSalesNotesUpdate();
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
      performActNotesUpdate();
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
      performLogiNotesUpdate();
    } else {
      setValidated(true);
    }
  };

  const performSalesNotesUpdate = () => {
    const data = new FormData(salesForm.current);
    // var object = {};
    // data.forEach((value, key) => {
    //   object[key] = value;
    // });
    setSalesNotes(data)
      .then((data) => {
        setIsEditingSales(false);
        setSalesNotes((prevState) => ({
          ...prevState,
        //   [id]: object,
          [id]: data,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const performActNotesUpdate = () => {
    const data = new FormData(actForm.current);
    var object = {};
    data.forEach((value, key) => {
      object[key] = value;
    });
    setActNotes(object)
      .then((actNotes) => {
        setIsEditingAct(false);
        setActNotes((prevState) => ({
          ...prevState,
          [id]: object,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const performLogiNotesUpdate = () => {
    const data = new FormData(logiForm.current);
    var object = {};
    data.forEach((value, key) => {
      object[key] = value;
    });
    setLogiNotes(object)
      .then((logiNotes) => {
        setIsEditingLogi(false);
        setLogiNotes((prevState) => ({
          ...prevState,
          [id]: object,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {(isSeller() || isAdmin()) && (
        <>
          {/* //^ SALES NOTES */}
          <Form ref={salesForm} style={{ border: "none" }}  onSubmit={handleSalesSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={4} className="truck-data-title">
                Sales Notes:
              </Form.Label>
              <Col sm={8}>
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

                {isEditingSales ? (
                  <Form.Control
                    type="salesNotes"
                    required
                    value={salesNotes}
                    onChange={(e) => setSalesNotes(e.target.value)}
                    name="salesNotes"
                  />
                ) : (
                  <Form.Control
                    type="text"
                    required
                    readOnly
                    value={
                      salesNotes.length < 115 && salesNotes.length !== 0 ? (
                        `${salesNotes}`
                      ) : salesNotes.length > 115 ? (
                        <span>
                          {salesReadMore
                            ? salesNotes
                            : `${salesNotes.substring(0, 115)}...`}
                          <button
                            className="show-more-btn"
                            onClick={() => {
                              setSalesReadMore(!salesReadMore);
                            }}
                          >
                            {salesReadMore ? "show less" : "read more"}
                          </button>
                        </span>
                      ) : (
                        <p>No Notes yet</p>
                      )
                    }
                    onChange={(e) => setSalesNotes(e.target.value)}
                    name="salesNotes"
                  />
                )}
              </Col>
            </Form.Group>
          </Form>
          {/* //^ ACCOUNTING NOTES */}

          <Form
            ref={actForm}
            style={{ border: "none" }}
            handleSubmit={handleActSubmit}
          >
            <Form.Group as={Row}>
              <Form.Label column sm={4} className="truck-data-title">
                Accounting Notes:
              </Form.Label>
              <Col sm={8}>
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

                {isEditingAct ? (
                  <Form.Control
                    required
                    value={actNotes}
                    onChange={(e) => setActNotes(e.target.value)}
                    name="actNotes"
                  />
                ) : (
                  <Form.Control
                    required
                    readOnly
                    value={
                      actNotes.length < 115 && actNotes.length !== 0 ? (
                        `${actNotes}`
                      ) : actNotes.length > 115 ? (
                        <span>
                          {accountingReadMore
                            ? actNotes
                            : `${actNotes.substring(0, 115)}...`}
                          <button
                            className="show-more-btn"
                            onClick={() => {
                              setAccountingReadMore(!accountingReadMore);
                            }}
                          >
                            {accountingReadMore ? "show less" : "read more"}
                          </button>
                        </span>
                      ) : (
                        <p>No Notes yet</p>
                      )
                    }
                    onChange={(e) => setActNotes(e.target.value)}
                    name="actNotes"
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
            <Form.Group as={Row}>
              <Form.Label column sm={4} className="truck-data-title">
                Logistics Notes:
              </Form.Label>
              <Col sm={8}>
                <button
                  key={isEditingLogi ? "button-submit" : "button-edit"}
                  type={isEditingLogi ? "submit" : "button"}
                  onClick={isEditingLogi ? null : () => setIsEditingLogi(true)}
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

                {isEditingLogi ? (
                  <Form.Control
                    required
                    value={logiNotes}
                    onChange={(e) => setLogiNotes(e.target.value)}
                    name="logiNotes"
                  />
                ) : (
                  <Form.Control
                    required
                    readOnly
                    value={
                      logiNotes.length < 115 && logiNotes.length !== 0 ? (
                        `${logiNotes}`
                      ) : logiNotes.length > 115 ? (
                        <span>
                          {logisticsReadMore
                            ? logiNotes
                            : `${logiNotes.substring(0, 115)}...`}
                          <button
                            className="show-more-btn"
                            onClick={() => {
                              setLogisticsReadMore(!logisticsReadMore);
                            }}
                          >
                            {logisticsReadMore ? "show less" : "read more"}
                          </button>
                        </span>
                      ) : (
                        <span>No Notes</span>
                      )
                    }
                    onChange={(e) => setLogiNotes(e.target.value)}
                    name="logiNotes"
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

export default NotesForm;
