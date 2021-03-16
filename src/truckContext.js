import React, { useState, useEffect, useContext, createContext } from "react";
import InventoryAllTrucks from "./Components/InventoryAllTrucks"


// Generating context
const TruckContext = createContext(null)

//Generating provider
const TruckProvider = ({ children }) => {
  const url = "http://143.110.225.28/api/v1/inventory/"; //API LINK

  //////////////////////// &&--STATE--&& /////////////////////////////

  const [truckLoad, setTruckLoad] = useState([]); //INVENTORY LIST ON ADD TRUCKLOAD PAGE
  const [truckName, setTruckName] = useState("");
  const [truckPrice, setTruckPrice] = useState("");
  const [truckContents, setTruckContents] = useState([]);
  const [truckManifest, setTruckManifest] = useState([]);
  const [id, setId] = useState("");
  const [trucks, setTrucks] = useState([]); //LIST OF TRUCKS FROM API

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

  //Fetching the trucks db from the API link above //^----GET----
  const fetchTrucks = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const newTrucks = await response.json(); //returns a promise
      setTrucks(newTrucks); //Making sure the trucks list is current using newTrucks which adds each new truck to the truckLoad
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect fetches trucks only after initial render. This is accomplished by passing the empty array
  useEffect(() => {
    fetchTrucks();
    console.log("Trucks fetched successfully inside the useEffect");
  }, []);
  // End of useEffect for fetch

  // New delete request //^----DELETE----
  const deleteTrucks = async () => {
    try {
      const response = await fetch("http://143.110.225.28/api/v1/inventory/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "",
        }),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect fetches trucks only after initial render. This is accomplished by passing the empty array
  useEffect(() => {
    deleteTrucks();
    console.log("deleteTrucks useEffect ran successfully");
  }, [truckLoad]);
  // End of useEffect for fetch


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
        trucks,
        setTrucks,
        id,
        setId,

        fetchTrucks,
        clearList,
        showAlert,
        editItem,
        removeItem,

        alert,
        isEditing,
        editId,
        setAlert,
        setIsEditing,
        setEditId
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

export { TruckProvider, useTruckContext };
