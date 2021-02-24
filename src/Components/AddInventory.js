import React, { useState } from "react";
import Alert from "./Alert";
import Inventory from "./Inventory";

const AddInventory = () => {
  document.title = "Add Inventory";
  const [truckLoad, setTruckLoad] = useState([]);
  const [truckName, setTruckName] = useState("");
  const [truckPrice, setTruckPrice] = useState("");
  const [truckContents, setTruckContents] = useState([]);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  // const contents = truckContents.join(","); //All values joined + seperated by commas

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let newTruckLoad = [{ truckName, truckPrice, truckContents }];
      setTruckLoad(newTruckLoad);
      console.log(newTruckLoad);
      return <p>{newTruckLoad}</p>;
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <>
      <section className="section-center">
        <h3 className="heading">Add Truckload</h3>
        <form onSubmit={handleSubmit}>
          {alert.show && <Alert />}
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
            <button className="btn btn-center" type="submit">
              Submit
            </button>
          </div>
        </form>
        <Inventory truckLoad={truckLoad} />
      </section>
      {/* <section className="section">
        <h1>Truck: {truckName}</h1>
        <div className="underline"></div>
        <p>Price: ${truckPrice}</p>
        <p>Contents: {contents}</p>
      </section> */}
    </>
  );
};

export default AddInventory;

// TP-51
