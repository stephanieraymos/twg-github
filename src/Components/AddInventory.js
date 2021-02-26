import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import Inventory from "./Inventory";

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
  const [truckLoad, setTruckLoad] = useState(getLocalStorage());
  const [truckName, setTruckName] = useState("");
  const [truckPrice, setTruckPrice] = useState("");
  const [truckContents, setTruckContents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

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
      setTruckName("");
      setTruckPrice("");
      setTruckContents("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "Truck Details Updated");
    } else {
      // Show alert and add truck to inventory only if name is true and not editing
      showAlert(true, "success", "Truck Added");
      const newTruck = {
        id: new Date().getTime().toString(),
        truckName: truckName,
        truckPrice,
        truckContents,
      };

      setTruckLoad([...truckLoad, newTruck]);
      setTruckName(""); //Reseting input box to empty string
      setTruckPrice("");
      setTruckContents("");
      console.log(newTruck);
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "Trucks cleared successfully");
    setTruckLoad([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Truck Removed");
    setTruckLoad(truckLoad.filter((truck) => truck.id !== id)); //If truck id does not match then it will be added to new array, if it does match; i won't get returned + won't be displayed
  };

  const editItem = (id) => {
    const specificItem = truckLoad.find((truck) => truck.id === id);
    setIsEditing(true);
    setEditId(id);
    setTruckName(specificItem.truckName);
    setTruckPrice(specificItem.truckPrice);
    setTruckContents(specificItem.truckContents);
  };

  useEffect(() => {
    localStorage.setItem("truck", JSON.stringify(truckLoad));
  }, [truckLoad]);

  return (
    <>
      <section className="section-center">
        <h3 className="heading">Add Truckload</h3>
        <form onSubmit={handleSubmit}>
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
            <button className="btn" type="submit">
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
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
