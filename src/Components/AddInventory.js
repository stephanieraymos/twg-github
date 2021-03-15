import React, { useRef } from "react";
import Alert from "./Alert";
import Inventory from "./Inventory";
import Navigation from "./Navigation";
import { useGlobalContext } from "../context";
import inventory from "../css/inventory.css";

const AddInventory = () => {
  document.title = "Add Inventory";
  const {
    truckLoad,
    setTruckLoad,
    id,
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
    alert,
    showAlert,
    clearList,
    removeItem,
    editItem,
  } = useGlobalContext();

  const form = useRef(null);

  const handleSubmit = (e) => {
    console.log(e.target);

    e.preventDefault();
    // setId(new Date().getTime().toString());
    if (e.target.value === "") {
      showAlert(true, "danger", "Please enter value");
    } else if (truckName && isEditing) {
      // deal with edit if something is in value and user is editing
      setTruckLoad(
        truckLoad.map((truck, id) => {
          if (truck.id === editId) {
            return {
              ...truck,
              id,
              truckName,
              truckPrice,
              truckContents,
              truckManifest,
            };
          }
          return truck;
        })
      );
      setTruckName("");
      setTruckPrice("");
      setTruckContents([]);
      setTruckManifest([]);
      setEditId(""); //Reseting editId
      setIsEditing(false); //Reseting isEditing to false
      showAlert(true, "success", "Truck Details Updated"); //Showing alert after edit is submitted
    } else {
      // Show alert and add truck to inventory only if name is true and not editing
      showAlert(true, "success", "Truck Added");
      //Creating new truck
      let newTruck = [id, truckName, truckPrice, truckContents, truckManifest];
      console.log("Truck Manifest", truckManifest);

      //Spreading out current truckLoad and adding newTruck to the list
      setTruckLoad([...truckLoad, newTruck]);
      setTruckName("");
      setTruckPrice("");
      setTruckContents([]);
      setTruckManifest([]);
      console.log("New Truck", newTruck); //Logging new truck for testing purposes
    }
  };

  //Fetching the trucks db from the API link above //^----POST (ADD INVENTORY)----
  const postTrucks = async () => {
      const data = new FormData(form.current);
      try {
        const response = await fetch(
          "http://143.110.225.28/api/v1/inventory/",
          {
            method: "POST",
            body: data,
          }
        );
        return response.json();
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <>
      <div>
        <Navigation />
      </div>
      <section className="section-center">
        <h3 className="form-header">Add Truckload</h3>
        <form ref={form} onSubmit={handleSubmit} method="post">
          {/* //* If alert is showing, we bring in the alert component */}
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} truckLoad={truckLoad} />
          )}
          <div className="form-control">
            <input
              className="truckload-inputs"
              type="text"
              name="truckName"
              value={truckName}
              onChange={(e) => setTruckName(e.target.value)}
              placeholder="Name of Truck"
            />
            <input
              className="truckload-inputs"
              type="text"
              name="truckPrice"
              value={truckPrice}
              onChange={(e) => setTruckPrice(e.target.value)}
              placeholder="Price"
            />
            <input
              className="truckload-inputs"
              type="text"
              name="truckContents"
              value={[truckContents]}
              onChange={(e) => setTruckContents([e.target.value])}
              placeholder="What's in the truck?"
            />
            <input
              type="file"
              multiple
              name="truckManifest"
              className="truckload-inputs"
              onChange={(e) => setTruckManifest(e.target.value)}
            />
            <button className="submit-btn" type="submit" onClick={postTrucks}>
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
        {/* //* If length of truckLoad array is greater than 0 we show the Inventory component + clear items button */}
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
