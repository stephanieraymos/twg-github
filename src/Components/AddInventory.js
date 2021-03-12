import React from "react";
import Alert from "./Alert";
import Inventory from "./Inventory";
import Navigation from "./Navigation";
import { useGlobalContext } from "../context";
import inventory from "../css/inventory.css";

const AddInventory = () => {
  document.title = "Add Inventory";
  const {
    truckLoad,
    truckName,
    setTruckName,
    truckPrice,
    setTruckPrice,
    truckContents,
    setTruckContents,
    truckManifest,
    setTruckManifest,

    isEditing,
    alert,
    showAlert,
    clearList,
    removeItem,
    editItem,
    handleSubmit,

    postTrucks,
  } = useGlobalContext();

  return (
    <>
      <div>
        <Navigation />
      </div>
      <section className="section-center">
        <h3 className="form-header">Add Truckload</h3>
        <form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
        >
          {/* //* If alert is showing, we bring in the alert component */}
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
              multiple
              name="truckManifest[]"
              className="truckload-inputs"
              value={truckManifest}
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
