import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import inventory from "../css/inventory.css";

// const url = "https://cors-anywhere.herokuapp.com/http://143.110.225.28/api/v1/inventory/data/"; //API LINK with proxy server to allow all origins
const url = "http://143.110.225.28/api/v1/inventory/"; //API LINK

function Inventory() {
  //Setting state values, params are default values
  const [trucks, setTrucks] = useState([]);

  //Fetching the trucks db from the API link above
  const fetchTrucks = async () => {
    const response = await fetch(url);
    const newTrucks = await response.json(); //returns a promise
    setTrucks(newTrucks); //Making sure the trucks list is current using newTrucks which adds each new truck to the truckLoad
    if (response.ok) {
      console.log(response.status, "Get request successful");
    } else {
      console.log(response.status, "Somthing went wrong with the get request");
    }
  };

  //useEffect fetches trucks only after initial render. This is accomplished by passing the empty array
  useEffect(() => {
    fetchTrucks();
    console.log("Trucks fetched successfully");
  }, []);
  // End of useEffect for fetch

  // useEffect for delete method
  useEffect(() => {
    fetch("http://143.110.225.28/api/v1/inventory/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "",
      }),
    }).then((err) => console.log(err));
  }, []);
  // End of useEffect for delete

  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="table-wrapper">
        <div className="header-items">
          <p className="all-trucks-table-header-name truck">TRUCK NAME</p>
          <p className="all-trucks-table-header-price price">PRICE</p>
          <p className="all-trucks-table-header-contents contents">CONTENTS</p>
        </div>

        <div className="truckLoad-list">
          {trucks.map((truck) => {
            const { id, truckName, truckPrice, truckContents } = truck;

            return (
              <div className="truckLoad" key={id}>
                <p className="items all-trucks-name">{truckName}</p>
                <p className="items all-trucks-price">${truckPrice}</p>
                <p className="items all-trucks-contents">{truckContents}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Inventory;
