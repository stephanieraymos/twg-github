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
    truckManifest,
    setTruckManifest,
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
    editItem,
  } = useGlobalContext();

  // const handleChange=(e)=>{
  //   setTruckLoad({
  //       [e.target.id]:e.target.value
  //   },()=>{
  //       console.log(truckLoad);
  //   })

  const handleSubmit = (e) => {
    console.log(truckLoad);
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
              truckManifest: truckManifest
            };
          }
          return truck;
        })
      );
      setTruckName(""); //Reseting input boxes to empty string
      setTruckPrice("");
      setTruckContents("");
      setTruckManifest(null);
      setEditId(null); //Reseting editId
      setIsEditing(false); //Reseting isEditing to false
      showAlert(true, "success", "Truck Details Updated"); //Showing alert after edit is submitted
    } else {
      // Show alert and add truck to inventory only if name is true and not editing
      showAlert(true, "success", "Truck Added");
      //Creating new truck
      const newTruck = {
        id: new Date().getTime().toString(),
        truckName,
        truckPrice,
        truckContents,
        truckManifest
      };

      //Spreading out current truckLoad and adding newTruck to the list
      setTruckLoad([...truckLoad, newTruck]);
      setTruckName(""); //Reseting input boxes to empty string
      setTruckPrice("");
      setTruckContents("");
      console.log(newTruck); //Logging new truck for testing purposes
    }
  };

  // // useEffect for post request
  // useEffect(() => {
  //   fetch("http://143.110.225.28/api/v1/inventory/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       truckName: truckName,
  //       truckPrice: truckPrice,
  //       truckContents: truckContents,
  //     }),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         setError(false);
  //         console.log("SUCCESSFULLY ADDED TRUCK TO DATABASE");
  //         return response.json();
  //       } else if (response.status >= 408) {
  //         console.log(error, "There is an unknown error preventing the truck from being added to the database");
  //         setError(true);
  //       }
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((truck) => setId(truck.id));
  // }, [postToDb]);

  //Fetching the trucks db from the API link above
  const postTrucks = async () => {
    const response = await fetch("http://143.110.225.28/api/v1/inventory/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        truckName: truckName,
        truckPrice: truckPrice,
        truckContents: truckContents,
      }),
    });
    if (response.ok) {
      console.log(response.status, "Post request successful");
    } else {
      console.log(response.status, "Somthing went wrong with the post request");
    }
    return response.json();
  };

  //useEffect fetches trucks only after initial render. This is accomplished by passing the empty array
  useEffect(() => {
    postTrucks();
    console.log("Trucks posted successfully after submit button was clicked");
  }, [postToDb]);
  // End of useEffect for fetch

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
              className="truckload-inputs"
              type="text"
              value={truckName}
              onChange={(e) => setTruckName(e.target.value)}
              placeholder="Name of Truck"
            />
            <input
              className="truckload-inputs"
              type="number"
              value={truckPrice}
              onChange={(e) => setTruckPrice(e.target.value)}
              placeholder="Price"
            />
            <input
              className="truckload-inputs"
              type="text"
              value={truckContents}
              onChange={(e) => setTruckContents(e.target.value)}
              placeholder="What's in the truck?"
            />
            <input
              type="file"
              className="truckload-inputs"
              value={truckManifest}
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
// TP-51

export default AddInventory;
