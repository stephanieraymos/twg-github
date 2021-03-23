import React, { useState, useEffect, useReducer, useContext, createContext } from "react";
import InventoryAllTrucks from "./Components/InventoryAllTrucks";

// Generating context
const TruckContext = createContext();

//Generating provider
const TruckProvider = ({ children }) => {

  //////////////////////// &&--STATE--&& /////////////////////////////

  const [truckLoad, setTruckLoad] = useState([]); //INVENTORY LIST ON ADD TRUCKLOAD PAGE
  const [truckName, setTruckName] = useState("");
  const [truckPrice, setTruckPrice] = useState("");
  const [truckContents, setTruckContents] = useState([]);
  const [truckManifest, setTruckManifest] = useState([]);
  const [id, setId] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  if (truckLoad.truckName === "") {
    console.log("The truck name is empty but printing");
  }

  ////////////////////// &&--FUNCTIONS--&& /////////////////////////

  //showAlert function, when called the values for each param are passed in as arguments
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  //clearList function. Once list is cleared an alert confirms this to the user + truckLoad is set back to empty array
  const clearList = () => {
    showAlert(true, "danger", "Trucks cleared successfully");
    setTruckLoad([]);
  };

  //removeItem grabs the id of the item to be removed, shows an alert to the user confirming
  //deletion + filters through the truckLoad to keep only the trucks whose id doesn't match the removed truck
  const removeItem = (id) => {
    showAlert(true, "danger", "Truck Removed");
    setTruckLoad(truckLoad.filter((truck) => truck.id !== id)); //If truck id does not match then it will be added to new array, if it does match; i won't get returned + won't be displayed
  };

  //editItem grabs the id of the item to be edited, sets the item and sets all required values
  const editItem = (id) => {
    const specificItem = truckLoad.find((truck) => truck.id === id);
    setIsEditing(true);
    setEditId(id);
    setTruckName(specificItem.truckName);
    setTruckPrice(specificItem.truckPrice);
    setTruckContents(specificItem.truckContents);
    setTruckManifest(specificItem.truckManifest);
  };

  //////////////////////// &&--FETCH--&& ///////////////////////////////

  // // New delete request //^----DELETE----
  // const deleteTrucks = async () => {
  //   try {
  //     const response = await fetch("api.thewholesalegroup.com/api/v1/inventory/", {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         id: "",
  //       }),
  //     });
  //     return response.json();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // //useEffect fetches trucks only after initial render. This is accomplished by passing the empty array
  // useEffect(() => {
  //   deleteTrucks();
  //   console.log("deleteTrucks useEffect ran successfully");
  // }, [truckLoad]);
  // // End of useEffect for fetch

  ////////////////////////// &&--PROVIDER--&& ///////////////////////////////
  return (
    <TruckContext.Provider
      value={{
        truckName,
        setTruckName,
        truckPrice,
        setTruckPrice,
        truckContents,
        setTruckContents,
        truckManifest,
        setTruckManifest,
        truckLoad,
        setTruckLoad,
        // trucks,
        // setTrucks,
        id,
        setId,

        clearList,
        showAlert,
        editItem,
        removeItem,

        // getData,
        alert,
        isEditing,
        editId,
        setAlert,
        setIsEditing,
        setEditId,
      }}
    >
      {children}
    </TruckContext.Provider>
  );
};

//! Custom hook for using context within app
const useTruckContext = () => {
  return useContext(TruckContext);
};

//^ useTruck custom hook //

export const useTruck = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  // const [trucks, setTrucks] = useState([]); //LIST OF TRUCKS FROM API

  const [trucks, setTrucks] = useReducer((state, value) => ([...value]), [] )

  const addTruck = (truck) => {
    setTrucks(trucks.concat(truck))
    console.log("Hey", truck)
  }

  useEffect(() => {
    setLoading(true);

    const fetchTrucks = async () => {
      try {
        const response = await fetch(
          "https://api.thewholesalegroup.com/api/v1/inventory/",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const newTrucks = await response.json(); //returns a promise
        setTrucks(newTrucks); //Making sure the trucks list is current using newTrucks which adds each new truck to the truckLoad
        console.log(newTrucks)
        setLoading(false);
        setErrorMessage("");
      } catch (error) {
        console.log(error);
        setErrorMessage(error);
      }
    };
    fetchTrucks();
    console.log("Anything");
  }, []);
  
  return [trucks, loading, errorMessage, addTruck];
};

export { TruckProvider, useTruckContext };
