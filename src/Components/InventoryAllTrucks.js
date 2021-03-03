import React, { useState, useEffect } from "react";

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
      {trucks.map((truck) => {
        return (
          <div className="truck-data-container" key={truck.id}>
            <h3>{truck.truckName}</h3>
            <p>${truck.truckPrice}</p>
            <p>{truck.truckContents}</p>
          </div>
        );
      })}
    </>
  );
}
export default Inventory;
