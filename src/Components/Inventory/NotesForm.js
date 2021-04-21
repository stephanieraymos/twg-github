import React, { useRef, useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { Form, Col, Row } from "react-bootstrap";
import { inventoryURL } from "../../Pages/urls";
import { FaEdit } from "react-icons/fa";
import { authService } from "../../authService";
import { useHistory } from "react-router-dom";
import { useTruckContext } from "../../truckContext";

const NotesForm = ({ id }) => {
  const salesForm = useRef(null);
  const logiForm = useRef(null);
  const actForm = useRef(null);
  // const {
  //   isEditingLogi,
  //   setIsEditingLogi,
  //   isEditingAct,
  //   setIsEditingAct,
  //   isEditingSales,
  //   setIsEditingSales,
  //   salesReadMore,
  //   setSalesReadMore,
  //   accountingReadMore,
  //   setAccountingReadMore,
  //   logisticsReadMore,
  //   setLogisticsReadMore,
  //   setValidated,
  //   salesNotes,
  //   setSalesNotes,
  //   accountingNotes,
  //   setAccountingNotes,
  //   logisticsNotes,
  //   setLogisticsNotes,
  // } = useGlobalContext();

  const {
    salesNotes, setSalesNotes,
    accountingNotes, setAccountingNotes,
    logisticsNotes, setLogisticsNotes,
  } = useTruckContext();

  const [validated, setValidated] = useState(false);
  const [isEditingLogi, setIsEditingLogi] = useState(false);
  const [isEditingAct, setIsEditingAct] = useState(false);
  const [isEditingSales, setIsEditingSales] = useState(false);
  const [salesReadMore, setSalesReadMore] = useState(false);
  const [accountingReadMore, setAccountingReadMore] = useState(false);
  const [logisticsReadMore, setLogisticsReadMore] = useState(false);

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
      //   performaccountingNotesUpdate();
      updateAccountingNotes();
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
      //   performlogisticsNotesUpdate();
      updateLogisticsNotes();
    } else {
      setValidated(true);
    }
  };
  // Return true or false to indicate if fetch was successful
  const updateSalesNotes = () => {
    const data = new FormData(salesForm.current);
    data.append("id", id)
    
    authService.checkToken()
      .then(() => {
        fetch(inventoryURL, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${authService.getAccessToken()}`,
          },
          body: data
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
      })
      .catch(() => history.push("/logout"))
  };
//   const updateSalesNotes = () => {
//     const data = new FormData(salesForm.current);
//         var object = {};
//         data.forEach((value, key) => {
//             object[key] = value
//         });

//         object["id"] = id;
//         object["sales"] = salesNotes;
//         setSalesNotes(object)
          
//   };
  const updateAccountingNotes = () => {
    const data = new FormData(actForm.current);
    data.append("id", id);

    // authService.checkToken()
    //   .then(() => {
    //     fetch(inventoryURL, {
    //       method: "PUT",
    //       headers: {
    //         "Authorization": `Bearer ${authService.getAccessToken()}`,
    //       },
    //       body: data,
    //     })
    //       .then((response) => {
    //         console.log(response);
    //         if (response.ok) {
    //           console.log("OK");

    //           return true;
    //         } else console.log("Not ok");
    //         return false;
    //       })
    //       .catch((error) => {
    //         console.log(error, Response.message);
    //       });
    //   })
    //   .catch(() => history.push("/logout"))
  };
  const updateLogisticsNotes = () => {
    const data = new FormData(logiForm.current);
    data.append("id", id);

    // authService.checkToken()
    //   .then(() => {
    //     fetch(inventoryURL, {
    //       method: "PUT",
    //       headers: {
    //         "Authorization": `Bearer ${authService.getAccessToken()}`,
    //       },
    //       body: data,
    //     })
    //       .then((response) => {
    //         console.log(response);
    //         if (response.ok) {
    //           return true;
    //         } else return false;
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   })
    //   .catch(() => history.push("/logout"))
  };
  //   const performSalesNotesUpdate = () => {
  //     const data = new FormData(salesForm.current);
  //     // var object = {};
  //     // data.forEach((value, key) => {
  //     //   object[key] = value;
  //     // });
  //     setSalesNotes(data);
  //     setIsEditingSales(false);
  //     setSalesNotes((prevState) => ({
  //       ...prevState,
  //       //   [id]: object,
  //       [id]: data,
  //     }));
  //   };
  //   const performaccountingNotesUpdate = () => {
  //     const data = new FormData(actForm.current);
  //     var object = {};
  //     data.forEach((value, key) => {
  //       object[key] = value;
  //     });
  //     setAccountingNotes(object)
  //       .then((object) => {
  //         setIsEditingAct(false);
  //         setAccountingNotes((prevState) => ({
  //           ...prevState,
  //           [id]: object,
  //         }));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   const performlogisticsNotesUpdate = () => {
  //     const data = new FormData(logiForm.current);
  //     var object = {};
  //     data.forEach((value, key) => {
  //       object[key] = value;
  //     });
  //     setLogisticsNotes(object)
  //       .then((logisticsNotes) => {
  //         setIsEditingLogi(false);
  //         setLogisticsNotes((prevState) => ({
  //           ...prevState,
  //           [id]: object,
  //         }));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
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
                    as="textarea"
                    type="salesNotes"
                    required
                    value={salesNotes}
                    onChange={(e) => setSalesNotes(e.target.value)}
                    name="sales"
                  />
                ) : (
                  <Form.Control
                    as="textarea"
                    type="text"
                    readOnly
                    value={
                      salesNotes.length < 115 && salesNotes.length !== 0 ? salesNotes : salesNotes.length > 115 ? (
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
                      ) : "No Notes yet"
                    }
                    onChange={(e) => setSalesNotes(e.target.value)}
                    name="sales"
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
                    as="textarea"
                    required
                    value={accountingNotes}
                    onChange={(e) => setAccountingNotes(e.target.value)}
                    name="accountingNotes"
                    onSubmit={handleActSubmit}
                  />
                ) : (
                  <Form.Control
                    as="textarea"
                    readOnly
                    value={
                      accountingNotes.length < 115 && accountingNotes.length !== 0 ? (
                        `${accountingNotes}`
                      ) : accountingNotes.length > 115 ? (
                        <span>
                          {accountingReadMore
                            ? accountingNotes
                            : `${accountingNotes.substring(0, 115)}...`}
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
                    onChange={(e) => setAccountingNotes(e.target.value)}
                    name="accountingNotes"
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
                    as="textarea"
                    required
                    value={logisticsNotes}
                    onChange={(e) => setLogisticsNotes(e.target.value)}
                    name="logisticsNotes"
                  />
                ) : (
                  <Form.Control
                    as="textarea"
                    readOnly
                    value={
                      logisticsNotes.length < 115 && logisticsNotes.length !== 0 ? (
                        `${logisticsNotes}`
                      ) : logisticsNotes.length > 115 ? (
                        <span>
                          {logisticsReadMore
                            ? logisticsNotes
                            : `${logisticsNotes.substring(0, 115)}...`}
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
                    onChange={(e) => setLogisticsNotes(e.target.value)}
                    name="logisticsNotes"
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
