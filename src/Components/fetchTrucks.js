import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import inventory from "../css/inventory.css";
import Navigation from "./Navigation";

// THIS COMPONENT IN NOT BEING USED!!

const url = "http://143.110.225.28/api/v1/inventory/data/"; //API LINK

const Inventory = () => {
  //Setting state values, params are default values
  const [loading, setLoading] = useState(false);
  const [trucks, setTrucks] = useState([]);
  const [value, setValue] = useState(0);

  //Fetching the trucks db from the API link above
  const fetchTrucks = async () => {
    const response = await fetch(url);
    const newTrucks = await response.json(); //returns a promise
    setTrucks(newTrucks); //Making sure the trucks list is current using newTrucks which adds each new truck to the truckLoad
    setLoading(false); //Loading ends when information is loaded
    console.log(newTrucks);
  };

  console.log(loading);

  //useEffect fetches trucks only after initial render. This is accomplished by passing the empty array
  useEffect(() => {
    fetchTrucks();
    console.log("Hello");
  }, []);

  //Display "Loading..." if loading is true
  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading ...</h1>
      </section>
    );
  }
  //Extracting props + binding them to trucks
  const { truckName, truckPrice, truckContents, id } = trucks[value]; // trucks[value]

  return (
    <>
      <div>
        <Navigation />
      </div>
      <section className="section">
        <div className="title">
          <h2>Trucks</h2>
          <div className="underline"></div>
        </div>
        <div className="trucks-center">
          {/* btn container */}
          <div className="btn-container">
            {trucks.map((truck, index) => {
              return (
                <button
                  key={truck.id}
                  onClick={() => setValue(index)}
                  // Setting class to trucks-btn by default, but to active-btn if index is equal to value
                  className={`trucks-btn ${index === value && "active-btn"}`}
                >
                  {truck.truckName}
                </button>
              );
            })}
          </div>
          {/* Displaying truck information */}
          <article className="truck-info">
            <h3>{truckName}</h3>
            <h4>{truckPrice}</h4>
            <p className="truck-contents">{truckContents}</p>
            {truckContents.map((content, index) => {
              return (
                <div key={index} className="truck-contents">
                  <FaAngleDoubleRight className="truck-icon" />
                  <p>{content}</p>
                </div>
              );
            })}
          </article>
        </div>
      </section>
    </>
  );
};
export default Inventory;

// TP-51
