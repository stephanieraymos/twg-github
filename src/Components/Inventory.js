import React, { useState } from "react";

const Inventory = () => {
  document.title = "Inventory";
  const [truckLoad, setTruckLoad] = useState([]);
  const [truckName, setTruckName] = useState('');
  const [truckPrice, setTruckPrice] = useState(0);
  const [truckContents, setTruckContents] = useState([]);
  const [error, setError] = useState(false);
  const [showAddedTruck, setShowAddedTruck] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let newTruckLoad = {truckName, truckPrice, truckContents};
      setTruckLoad(newTruckLoad)
      console.log(newTruckLoad);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <>
      <section className="container-main">
        <h3 class="heading">Add Truckload</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            value={truckName}
            onChange={(e) => setTruckName(e.target.value)}
            placeholder="Name of Truck"
            style={{textAlign: "center"}}
          />
          <input
            className="input"
            type="number"
            value={truckPrice}
            onChange={(e) => setTruckPrice(e.target.value)}
            placeholder="Price"
            style={{textAlign: "center"}}
          />
          <input
            className="input"
            type="text"
            value={truckContents}
            onChange={(e) => setTruckContents(e.target.value)}
            placeholder="What's in the truck?"
            style={{textAlign: "center"}}
          />
          <button className="btn btn-center" type="submit">
            Submit
          </button>
        </form>
      </section>
      <section className="section">
        <h4>New added truck goes here.</h4>
      </section>
    </>
  );
};

export default Inventory;

// TP-51
