import React, { useRef } from "react";
import { useGlobalContext } from "../../context";
import { Form, Col, Row } from "react-bootstrap";
import { inventoryURL } from "../../Pages/urls";
import { FaEdit } from "react-icons/fa";
import { authService } from "../../authService";
import { useHistory } from "react-router-dom";

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
  } = useGlobalContext();

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
    console.log(salesNotes);
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
      //   performActNotesUpdate();
      updateActNotes();
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
      //   performLogiNotesUpdate();
      updateLogiNotes();
    } else {
      setValidated(true);
    }
  };
  // Return true or false to indicate if fetch was successful
  const updateSalesNotes = () => {
    const data = new FormData(salesForm.current);
    var object = {};
    data.forEach((value, key) => {
        object[key] = value
    });

    object["id"] = id;
    object["sales"] = salesNotes;
    setSalesNotes(object)

    authService.checkToken()
      .then(() => {
        fetch(inventoryURL, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${authService.getAccessToken()}`,
            // contentType: "application/json"
          },
          body: data
        //   body: JSON.stringify(data),
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
    setSalesNotes(object);
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
  const updateActNotes = () => {
    const data = new FormData(actForm.current);
    data.append("id", id);

    authService.checkToken()
      .then(() => {
        fetch(inventoryURL, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${authService.getAccessToken()}`,
          },
          body: data,
        })
          .then((response) => {
            console.log(response);
            if (response.ok) {
              console.log("OK");

              return true;
            } else console.log("Not ok");
            return false;
          })
          .catch((error) => {
            console.log(error, Response.message);
          });
      })
      .catch(() => history.push("/logout"))
  };
  const updateLogiNotes = () => {
    const data = new FormData(logiForm.current);
    data.append("id", id);

    authService.checkToken()
      .then(() => {
        fetch(inventoryURL, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${authService.getAccessToken()}`,
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
      })
      .catch(() => history.push("/logout"))
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
  //   const performActNotesUpdate = () => {
  //     const data = new FormData(actForm.current);
  //     var object = {};
  //     data.forEach((value, key) => {
  //       object[key] = value;
  //     });
  //     setActNotes(object)
  //       .then((object) => {
  //         setIsEditingAct(false);
  //         setActNotes((prevState) => ({
  //           ...prevState,
  //           [id]: object,
  //         }));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   const performLogiNotesUpdate = () => {
  //     const data = new FormData(logiForm.current);
  //     var object = {};
  //     data.forEach((value, key) => {
  //       object[key] = value;
  //     });
  //     setLogiNotes(object)
  //       .then((logiNotes) => {
  //         setIsEditingLogi(false);
  //         setLogiNotes((prevState) => ({
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
                    name="salesNotes"
                  />
                ) : (
                  <Form.Control
                    as="textarea"
                    type="text"
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
                    value={actNotes}
                    onChange={(e) => setActNotes(e.target.value)}
                    name="actNotes"
                    onSubmit={handleActSubmit}
                  />
                ) : (
                  <Form.Control
                    as="textarea"
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
                    as="textarea"
                    required
                    value={logiNotes}
                    onChange={(e) => setLogiNotes(e.target.value)}
                    name="logiNotes"
                  />
                ) : (
                  <Form.Control
                    as="textarea"
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
