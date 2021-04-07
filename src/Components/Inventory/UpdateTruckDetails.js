import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import Navigation from "../Navigation/Navigation";
import { useHistory, useParams, Link } from "react-router-dom";
import cancel from "../../img/cancel.svg";
import undo from "../../img/undo.svg";
import { useAuthContext } from "../../auth";

const url = "https://api.thewholesalegroup.com/v1/inventory/?id=";
const inventoryURL = "https://api.thewholesalegroup.com/v1/inventory/edit/";
const manifestURL = "https://api.thewholesalegroup.com/v1/inventory/manifest/";

const UpdateTruckDetails = () => {
  const { id } = useParams();
  const [source, setSource] = useState("");
  const [price, setPrice] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [units, setUnits] = useState("");
  const [palletCount, setPalletCount] = useState("");
  const [fob, setFob] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState(0);
  const [contents, setContents] = useState([]);
  const [manifestIds, setManifestIds] = useState([]);
  const [truckFile, setTruckFile] = useState([]);
  const [oldManifestIds, setOldManifestIds] = useState([]);
  const [validated, setValidated] = useState(false);
  const [manifestsCount, setManifestsCount] = useState(0)
  
  const {
    fetchAccessToken,
  } = useAuthContext();

  const [accessToken, setAccessToken] = useState("");

  let history = useHistory();

  document.title = "Add Inventory";
  // const {
  //   truckLoad,
  //   setTruckLoad,
  //   source,
  //   setsource,
  //   price,
  //   setprice,
  //   contents,
  //   setContents,

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

  const getManifest = () => {
    if (manifestIds.length > 0) {
      const data = new FormData();
      manifestIds.map((id) => data.append("manifestIds", id));
      fetch(manifestURL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: data,
      })
        .then((response) => response.json())
        .then((manifest) => setTruckFile(manifest))
        .catch((error) => {});
    }
  };

  const getTruck = () => {
    fetch(`${url}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          const {source, price, retailPrice, contents, manifestIds, category, units, palletCount, fob, status} = data[0]
  
          setSource(source);
          setPrice(price);
          setRetailPrice(retailPrice);
          setCategory(category);
          setUnits(units);
          setPalletCount(palletCount);
          setContents(contents);
          setManifestIds(manifestIds);
          setStatus(status);
          setFob(fob);
  
        } else {
          throw new Error("Truck does not exist.");
        }
      })
      .catch((error) => {});
  }

  useEffect(() => {
    // send user back to login if they're not logged in
    fetchAccessToken
      .then((token) => {
        setAccessToken(token);
        getTruck();
      })
      .catch((error) => {
        console.log(error)
        history.push("/");
      });
  }, []);

  useEffect(() => {
    getManifest();
  }, [manifestIds]);

  // Return true or false to indicate if fetch was successful
  const updateTruck = () => {
    const data = new FormData(form.current);
    data.append("id", id);
    data.set("status", status);

    // turn string to array and insert to truck contents
    const tempcontents = data.get("contents").split(",");
    data.delete("contents");
    tempcontents.map(item => data.append("contents", item))

    oldManifestIds.map((id) => data.append("manifestIds", id));
    fetch(inventoryURL, {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + accessToken,
      },
      body: data,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return true;
        } else return false;
      })
      .catch((error) => {console.log(error)});
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
          {/* //^ ------------PROGRAM------------ */}
          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Program</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={source}
              name="source"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a truck name.
            </Form.Control.Feedback>
          </Form.Group>

          {/* //^ ------------PRICE------------ */}
          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Price</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={price}
              name="price"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a truck price.
            </Form.Control.Feedback>
          </Form.Group>

          {/* //^ ----------RETAIL PRICE---------- */}
          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Price</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={retailPrice}
              name="retailPrice"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a truck price.
            </Form.Control.Feedback>
          </Form.Group>

          {/* //^ ----------CATEGORY---------- */}
          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Category</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={category}
              name="category"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a company name.
            </Form.Control.Feedback>
          </Form.Group>

          {/* //^ ----------CONTENTS---------- */}
          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Contents</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={contents}
              name="contents"
            />
            <Form.Control.Feedback type="invalid">
              Please specify the contents inside the truck.
            </Form.Control.Feedback>
            <Form.Text muted>
              Separate each content with a comma (no space character), e.g., clothes,toys
            </Form.Text>
          </Form.Group>

          {/* //^ ----------UNITS---------- */}
          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Units</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={units}
              name="units"
            />
            <Form.Control.Feedback type="invalid">
              Please add the # of units in the truck.
            </Form.Control.Feedback>
          </Form.Group>

          {/* //^ ----------PALLETS---------- */}
          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Pallets</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={palletCount}
              name="palletCount"
            />
            <Form.Control.Feedback type="invalid">
            Please add the # of pallets in the truck.
            </Form.Control.Feedback>
          </Form.Group>

          {/* //^ ----------FOB---------- */}
          <Form.Group className="center-form-group">
            <Form.Label className="form-label">FOB</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={fob}
              name="fob"
            />
            <Form.Control.Feedback type="invalid">
            Please add the # of pallets in the truck.
            </Form.Control.Feedback>
          </Form.Group>

          {/* //^ ----------STATUS---------- */}
          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Status</Form.Label>
            <Form.Check 
              style={{color: "black"}}
              type="switch"
              id="custom-switch"
              name="status"
              checked={status}
              label="Available"
              onChange={() => setStatus(status ? 0 : 1)}
            />
          </Form.Group>

          {/* //^ ----------FILES---------- */}
          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Manifest</Form.Label>
            {Array(manifestsCount).fill(
              <>
                <Form.Control
                  type="file"
                  multiple
                  required
                  name="manifests"
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
            {manifestsCount == 0 ?
              <Button
                onClick={() => setManifestsCount(manifestsCount + 1)}
                className="form-button"
                block
                style={{ width: "150px", backgroundColor: "#000", alignSelf: "start", margin: "0rem" }}
              >
                Add Files
              </Button>
              :
              <Button
                onClick={() => setManifestsCount(manifestsCount - 1)}
                className="form-button"
                block
                style={{ width: "150px", backgroundColor: "#000", alignSelf: "start", margin: ".75rem 0rem" }}
              >
                Remove Files
              </Button>
            }
          </Form.Group>

          {truckFile.map((manifest, index) => {
            const id = manifestIds[index];
            const { manifests, manifestName } = manifest;
            return (
              <>
                <Form.Row key={id}>
                  <Col sm={11}>
                    <Form.Control
                      defaultValue={manifestName} 
                      readOnly
                      style={{cursor: "pointer"}}
                      onClick={ () =>
                        window.open(manifests, "_blank") ||
                        window.location.replace(manifests) //Opens in new tab || Opens in same tab if pop ups are blocked
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
                        {oldManifestIds.includes(id) ?
                          <img 
                            src={undo} 
                            alt="undo" 
                            onClick={() =>{
                              console.log("id to be added back", id);
                              setOldManifestIds(oldManifestIds.filter(item => item !== id))
                              console.log("old manifest id", oldManifestIds);
                            }}
                          />
                          :
                          <img 
                            src={cancel} 
                            alt="remove" 
                            onClick={() =>{
                              console.log("id to be deleted", id);
                              setOldManifestIds([...oldManifestIds, id])
                              console.log("old manifest id", oldManifestIds);
                            }}
                          />
                        }
                        
                    </button>
                  </Col>
                </Form.Row>
                {oldManifestIds.includes(id) &&
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

            <Button
              type="button"
              onClick={() => {
                redirect();
              }}
              className="form-button"
              block
              style={{ width: "100%", backgroundColor: "#000", margin: ".5rem 0rem 0rem" }}
            >
              Cancel
            </Button>
          </div>

          {/* <Link
            to={history}
            onClick={(e) => {
              e.preventDefault();
              updateTruck(id, source, price, contents);
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
