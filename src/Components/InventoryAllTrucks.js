import React, { useState, useEffect } from "react";
import inventory from "../css/inventory.css";

// const url = "https://cors-anywhere.herokuapp.com/http://143.110.225.28/api/v1/inventory/data/"; //API LINK with proxy server to allow all origins
const url = "http://143.110.225.28/api/v1/inventory/data/"; //API LINK

function Inventory() {
  //Setting state values, params are default values
  const [trucks, setTrucks] = useState([]);

  //Fetching the trucks db from the API link above
  const fetchTrucks = async () => {
    const response = await fetch(url);
    const newTrucks = await response.json(); //returns a promise
    setTrucks(newTrucks); //Making sure the trucks list is current using newTrucks which adds each new truck to the truckLoad
  };

  //useEffect fetches trucks only after initial render. This is accomplished by passing the empty array
  useEffect(() => {
    fetchTrucks();
    console.log("Hello");
  }, []);

  return (
    <>
      <div className="table-wrapper">
        <div className="header-items">
          <p className="truck">TRUCK NAME</p>
          <p className="price">PRICE</p>
          <p className="contents">CONTENTS</p>
          <p className="side-btn-container"></p>
        </div>

        <div className="truckLoad-list">
          {trucks.map((truck) => {
            const { id, truckName, truckPrice, truckContents } = truck;

            return (
              <div className="truckLoad" key={truck.id}>
                <p className="items truck">{truck.truckName}</p>
                <p className="items price">${truck.truckPrice}</p>
                <p className="items contents">{truck.truckContents}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Inventory;
