import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import Inventory from "./Inventory";
import Navigation from "./Navigation";
import { useGlobalContext } from "./context";
import inventory from "../css/inventory.css";

const AddInventory = () => {
  document.title = "Add Inventory";
  const {
    truckLoad,
    setTruckLoad,
    truckName,
    setTruckName,
    truckPrice,
    setTruckPrice,
    truckContents,
    setTruckContents,
    isEditing,
    setIsEditing,
    editId,
    setEditId,
    error,
    setError,
    postToDb,
    setPostToDb,
    alert,
    setAlert,
    id,
    setId,
    showAlert,
    clearList,
    removeItem,
    editItem
  } = useGlobalContext();

  // const contents = truckContents.join(","); //All values joined + seperated by commas

  const handleSubmit = (e) => {
    console.log(truckLoad)
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
    }
    else {
      // Show alert and add truck to inventory only if name is true and not editing
      showAlert(true, "success", "Truck Added");
      //Creating new truck
      const newTruck = {
        id: new Date().getTime().toString(),
        truckName,
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

  // useEffect for post request
  useEffect(() => {
    fetch("http://143.110.225.28/api/v1/inventory/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        truckName: truckName,
        truckPrice: truckPrice,
        truckContents: truckContents,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setError(false);
          console.log("SUCCESSFULLY ADDED TRUCK TO DATABASE");
          return response.json();
        } else if (response.status >= 408) {
          console.log(error, "There is an unknown error preventing the truck from being added to the database");
          setError(true);
        }
        console.log(response);
        return response.json();
      })
      .then((truck) => setId(truck.id));
  }, [postToDb]);

  return (
    <>
      <div>
        <Navigation />
      </div>
      <section className="section-center">
        <h3 className="form-header">Add Truckload</h3>
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
            <button className="submit-btn" type="submit" onClick={setPostToDb}>
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
