import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import Inventory from "./Inventory";
import Navigation from "./Navigation";
import inventory from "../css/inventory.css";

const getLocalStorage = () => {
  let truck = localStorage.getItem("truck");
  if (truck) {
    return JSON.parse(localStorage.getItem("truck"));
  } else {
    return [];
  }
};

const AddInventory = () => {
  document.title = "Add Inventory";
  //Setting all state values, params are all default values
  const [truckLoad, setTruckLoad] = useState(getLocalStorage());
  const [truckName, setTruckName] = useState("");
  const [truckPrice, setTruckPrice] = useState("");
  const [truckContents, setTruckContents] = useState([]);
  const [truckId, setTruckId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [error, setError] = useState(false);

  // const contents = truckContents.join(","); //All values joined + seperated by commas

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!truckName || !truckPrice || !truckContents) {
      showAlert(true, "danger", "Please enter value");
    } else if (truckName && isEditing) {
      // deal with edit if something is in value and user is editing
      setTruckLoad(
        truckLoad.map((truck) => {
          if (truck.id === editId) {
            return {
              ...truck,
              truckName: truckName,
              truckPrice: truckPrice,
              truckContents: truckContents,
            };
          }
          return truck;
        })
      );
      setTruckName(""); //Reseting input boxes to empty string
      setTruckPrice("");
      setTruckContents("");
      setEditId(null); //Reseting editId
      setIsEditing(false); //Reseting isEditing to false
      showAlert(true, "success", "Truck Details Updated"); //Showing alert after edit is submitted
    } else {
      // Show alert and add truck to inventory only if name is true and not editing
      showAlert(true, "success", "Truck Added");
      //Creating new truck
      const newTruck = {
        id: new Date().getTime().toString(),
        truckName: truckName,
        truckPrice,
        truckContents,
      };

      //Spreading out current truckLoad and adding newTruck to the list
      setTruckLoad([...truckLoad, newTruck]);
      setTruckName(""); //Reseting input boxes to empty string
      setTruckPrice("");
      setTruckContents("");
      console.log(newTruck); //Logging new truck for testing purposes
    }
  };

  //showAlert function, when called the values for each param are passed in as arguments
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  //clearList function. Once list is cleared an alert confirms this to the user + truckLoad is set back to empty array
  const clearList = () => {
    showAlert(true, "danger", "Trucks cleared successfully");
    setTruckLoad([]);
  };

  //removeItem grabs the id of the item to be removed, shows an alert to the user confirming
  //deletion + filters through the truckLoad to keep only the trucks whose id doesn't match the removed truck
  const removeItem = (id) => {
    showAlert(true, "danger", "Truck Removed");
    setTruckLoad(truckLoad.filter((truck) => truck.id !== id)); //If truck id does not match then it will be added to new array, if it does match; i won't get returned + won't be displayed
  };

  //editItem grabs the id of the item to be edited, sets the item and sets all required values
  const editItem = (id) => {
    const specificItem = truckLoad.find((truck) => truck.id === id);
    setIsEditing(true);
    setEditId(id);
    setTruckName(specificItem.truckName);
    setTruckPrice(specificItem.truckPrice);
    setTruckContents(specificItem.truckContents);
  };

  //useEffect happens only when truckLoad array changes. The truckLoad gets saved to localStorage
  useEffect(() => {
    localStorage.setItem("truck", JSON.stringify(truckLoad));
  }, [truckLoad]);

  // useEffect for post request
  useEffect(() => {
    const postRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Post request to TruckLoad" }),
      if(response) {
        console.log(response.status)
      }
    };
    fetch(
      "http://143.110.225.28/api/v1/inventory/insert?truckName=truckName&truckPrice=truckPrice&truckContents=truckContents",
      postRequest
    )
      .then((response) => {
        if (response.ok) {
          setError(false);
          console.log("SUCCESSS");
          return response.json();
        } else if (response.status >= 408) {
          console.log(error, "There is an unknown error");
          setError(true);
        }
        console.log(response);
        return response.json();
      })
      .then((truck) => setTruckId(truck.id));
  }, [truckLoad]);

  return (
    <>
      <div>
        <Navigation />
      </div>
      <section className="section-center">
        <h3 className="heading">Add Truckload</h3>
        <form onSubmit={handleSubmit}>
          {/* If alert is showing, we bring in the alert component */}
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} truckLoad={truckLoad} />
          )}
          <div className="form-control">
            <input
              type="text"
              value={truckName}
              onChange={(e) => setTruckName(e.target.value)}
              placeholder="Name of Truck"
              style={{ textAlign: "center" }}
            />
            <input
              type="number"
              value={truckPrice}
              onChange={(e) => setTruckPrice(e.target.value)}
              placeholder="Price"
              style={{ textAlign: "center" }}
            />
            <input
              type="text"
              value={truckContents}
              onChange={(e) => setTruckContents(e.target.value)}
              placeholder="What's in the truck?"
              style={{ textAlign: "center" }}
            />
            <button className="submit-btn" type="submit">
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
        {/* If length of truckLoad array is greater than 0 we show the Inventory component + clear items button */}
        {truckLoad.length > 0 && (
          <div>
            <Inventory
              truckLoad={truckLoad}
              removeItem={removeItem}
              editItem={editItem}
            />
            <button className="clear-btn" onClick={clearList}>
              Clear items
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default AddInventory;

// TP-51
