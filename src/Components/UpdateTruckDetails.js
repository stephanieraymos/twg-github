import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useTruckContext } from "../truckContext";
import Navigation from "./Navigation";
import { useHistory, useParams, Link } from "react-router-dom";
import cancel from "../img/cancel.svg";
import undo from "../img/undo.svg";
import { useGlobalContext } from "../context";
import { useAuthContext } from "../auth";

const url = "https://api.thewholesalegroup.com/v1/trucks/?id=";
const inventoryURL = "https://api.thewholesalegroup.com/v1/trucks/";
const manifestURL = "https://api.thewholesalegroup.com/v1/trucks/manifest/";

const UpdateTruckDetails = () => {
  const { id } = useParams();

  //   const [newTruckManifest, setNewTruckManifest] = useState([]); // files to be added
  //   const [oldTruckManifestId, setOldTruckManifestId] = useState([]); // files to be deleted
  const [isTruckUpdated, setIsTruckUpdated] = useState(false); // checking if truck is deleted
  const [fileUserId, setFileUserId] = useState("");
  const [truckName, setTruckName] = useState("");
  const [truckPrice, setTruckPrice] = useState("");
  const [truckContents, setTruckContents] = useState([]);
  const [truckManifestId, setTruckManifestId] = useState([]);
  const [truckFile, setTruckFile] = useState([]);
  const [oldTruckManifestId, setOldTruckManifestId] = useState([]);
  const [validated, setValidated] = useState(false);
  const [truckManifestCount, setTruckManifestCount] = useState(0)
  
  const {
    accessToken: [accessToken, setAccessToken],
    authenticate,
  } = useAuthContext();

  let history = useHistory();

  document.title = "Add Inventory";
  // const {
  //   truckLoad,
  //   setTruckLoad,
  //   truckName,
  //   setTruckName,
  //   truckPrice,
  //   setTruckPrice,
  //   truckContents,
  //   setTruckContents,

  //   showAlert,
  // } = useTruckContext();

  const form = useRef(null);

  const redirect = () => {
    history.push(`/TruckDetails/${id}`);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setValidated(false);
      updateTruck();
      redirect();
    } else {
      setValidated(true);
    }
  };

  const getManifest = (truckManifestId) => {
    try {
      const data = new FormData();
      truckManifestId.map((id) => data.append("truckManifestId", id));
      fetch(manifestURL, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + accessToken,
        },
        body: data,
      })
        .then((response) => response.json())
        .then((manifest) => setTruckFile(manifest));
    } catch (error) {
      console.log(error);
    }
  };

  const getTruckData = async () => {
    try {
      const response = await fetch(`${url}${id}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + accessToken,
        }
      });
      const data = await response.json();
      if (data) {
        const {userId, truckName, truckPrice, truckContents, truckManifestId} = data[0]

        setFileUserId(userId);
        setTruckName(truckName);
        setTruckPrice(truckPrice);
        setTruckContents(truckContents);
        setTruckManifestId(truckManifestId);

        if(truckManifestId.length) {
          getManifest(truckManifestId);
        }
      } else {
        throw new Error("Truck does not exist.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // send user back to login if they're not logged in
    authenticate(
      () => {},
      () => {
        history.push("/");
      },
    );

    getTruckData();
  }, []);

  // Return true or false to indicate if fetch was successful
  const updateTruck = () => {
    try {
      const data = new FormData(form.current);
      data.append("id", id);

      // turn string to array and insert to truck contents
      const tempTruckContents = data.get("truckContents").split(",");
      data.delete("truckContents");
      tempTruckContents.map(item => data.append("truckContents", item))

      oldTruckManifestId.map((id) => data.append("truckManifestId", id));
      fetch(inventoryURL, {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + accessToken,
        },
        body: data,
      }).then((response) => {
        console.log(response);
        if (response.ok) {
          return true;
        } else return false;
      });
    } catch (error) {
      console.log(error);
      // console.trace(updateTruck)
    }
  };

  return (
    <>
      <div>
        <Navigation />
      </div>
      <h1 className="update-truck-header">Edit truck details</h1>

      <div className="update-truck-form-container">

        <Form
          ref={form}
          noValidate 
          validated={validated}
          onSubmit={handleSubmit}
          className="update-truck-form"
        >
          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Name</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={truckName}
              name="truckName"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a truck name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Price</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={truckPrice}
              name="truckPrice"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a truck price.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Contents</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={truckContents}
              name="truckContents"
            />
            <Form.Control.Feedback type="invalid">
              Please specify the contents inside the truck.
            </Form.Control.Feedback>
            <Form.Text muted>
              Separate each content with a comma (no space character), e.g., clothes,toys
            </Form.Text>
          </Form.Group>

          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Manifest</Form.Label>
            {Array(truckManifestCount).fill(
              <>
                <Form.Control
                  type="file"
                  multiple
                  required
                  name="truckManifest"
                  style={{ fontSize: "1rem", color: "black" }}
                />
                <Form.Control.Feedback type="invalid">
                  Please add a file. 
                </Form.Control.Feedback>
                <Form.Text muted>
                  Select multiple files by holding down the SHIFT key
                </Form.Text>
              </>
            )}
            {truckManifestCount == 0 ?
              <Button
                onClick={() => setTruckManifestCount(truckManifestCount + 1)}
                className="form-button"
                block
                style={{ width: "150px", backgroundColor: "#000", alignSelf: "start", margin: "0rem" }}
              >
                Add Files
              </Button>
              :
              <Button
                onClick={() => setTruckManifestCount(truckManifestCount - 1)}
                className="form-button"
                block
                style={{ width: "150px", backgroundColor: "#000", alignSelf: "start", margin: ".75rem 0rem" }}
              >
                Remove Files
              </Button>
            }
          </Form.Group>

          {truckFile.map((manifest, index) => {
            const id = truckManifestId[index];
            const { truckManifest, truckManifestName } = manifest;
            return (
              <>
                <Form.Row key={id}>
                  <Col sm={11}>
                    <Form.Control
                      defaultValue={truckManifestName} 
                      readOnly
                      style={{cursor: "pointer"}}
                      onClick={ () =>
                        window.open(truckManifest, "_blank") ||
                        window.location.replace(truckManifest) //Opens in new tab || Opens in same tab if pop ups are blocked
                      } />
                  </Col>
                  <Col sm={1}>
                    <button
                        type="button"
                        style={{
                          background: "transparent",
                          borderColor: "transparent",
                          height: "100%"
                        }}
                      >
                        {oldTruckManifestId.includes(id) ?
                          <img 
                            src={undo} 
                            alt="undo" 
                            onClick={() =>{
                              console.log("id to be added back", id);
                              setOldTruckManifestId(oldTruckManifestId.filter(item => item !== id))
                              console.log("old manifest id", oldTruckManifestId);
                            }}
                          />
                          :
                          <img 
                            src={cancel} 
                            alt="remove" 
                            onClick={() =>{
                              console.log("id to be deleted", id);
                              setOldTruckManifestId([...oldTruckManifestId, id])
                              console.log("old manifest id", oldTruckManifestId);
                            }}
                          />
                        }
                        
                    </button>
                  </Col>
                </Form.Row>
                {oldTruckManifestId.includes(id) &&
                  <Form.Text style={{color: "red"}}>
                    Marked for deletion
                  </Form.Text>
                }
              </>
            );
          })}

          <div className="form-footer-container">
            <Button
              type="submit"
              className="form-button"
              block
              style={{ width: "100%", backgroundColor: "#f47c20", margin: "1.5rem 0rem 0rem" }}
            >
              Update Truck
            </Button>
          </div>

          {/* <Link
            to={history}
            onClick={(e) => {
              e.preventDefault();
              updateTruck(id, truckName, truckPrice, truckContents);
              console.log("Submit changes button pressed");
              redirect();
            }}
            className="edit-truck-btn"
          >
            Submit changes
          </Link> */}
        </Form>

      </div>
    </>
  );
};

// TP-51

export default UpdateTruckDetails;
