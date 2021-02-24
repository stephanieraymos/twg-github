import React, { useState } from "react";

const Inventory = () => {
  document.title = "Inventory";
  const [truckLoad, setTruckLoad] = useState([]);
  const [error, setError] = useState(false);
  const [showAddedTruck, setShowAddedTruck] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let newTruckLoad = truckLoad;
      console.log(newTruckLoad);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <>
      <section className="container">
        <h3>Add Truckload</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={truckLoad}
            onChange={(e) => setTruckLoad(e.target.value)}
            placeholder="Name of Truck"
          />
          <button className="btn" type="submit">
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
