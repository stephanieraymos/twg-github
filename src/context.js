import React, { useState, useEffect, useContext, useReducer } from "react";
import Inventory from "./Components/Inventory";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const url = "http://143.110.225.28/api/v1/inventory/"; //API LINK

  //////////////////////// &&--STATE--&& /////////////////////////////

  //Wrapping whole app in Provider

  const [truckLoad, setTruckLoad] = useState([]);
  const [truckName, setTruckName] = useState("");
  const [truckPrice, setTruckPrice] = useState("");
  const [truckContents, setTruckContents] = useState([]);
  const [truckManifest, setTruckManifest] = useState("");
  const [id, setId] = useState("");
  const [trucks, setTrucks] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [error, setError] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [personId, setPersonId] = useState("");

  if (truckLoad.truckName === "") {
    console.log("The truck name is empty but printing");
  }

  ////////////////////// &&--FUNCTIONS--&& /////////////////////////

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    setTruckName("");
    setTruckPrice("");
    setTruckContents([]);
    setTruckManifest("");
  };

  const handleSubmit = (e) => {
    console.log(truckLoad);
    e.preventDefault();
    if (!truckName || !truckPrice || !truckContents) {
      showAlert(true, "danger", "Please enter value");
    } else if (truckName && isEditing) {
      // deal with edit if something is in value and user is editing
      setTruckLoad(
        truckLoad.map((truck, id) => {
          if (truck.id === editId) {
            return {
              ...truck,
              id,
              truckName,
              truckPrice,
              truckContents,
              truckManifest,
            };
          }
          return truck;
        })
      );
      setTruckName("");
      setTruckPrice("");
      setTruckContents([]);
      setTruckManifest("");
      setEditId(""); //Reseting editId
      setIsEditing(false); //Reseting isEditing to false
      showAlert(true, "success", "Truck Details Updated"); //Showing alert after edit is submitted
    } else {
      // Show alert and add truck to inventory only if name is true and not editing
      showAlert(true, "success", "Truck Added");
      //Creating new truck
      const newTruck = {
        id,
        truckName,
        truckPrice,
        truckContents,
        truckManifest,
      };

      //Spreading out current truckLoad and adding newTruck to the list
      setTruckLoad([...truckLoad, newTruck]);
      setTruckName("");
      setTruckPrice("");
      setTruckContents([]);
      setTruckManifest("");
      console.log(newTruck); //Logging new truck for testing purposes
    }
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

  // useEffect for delete method //^----DELETE----
  // useEffect(async() => {
  //   await fetch("http://143.110.225.28/api/v1/inventory/", {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       id: "",
  //     }),
  //   }).then((err) => console.log(err));
  // }, []);
  // End of useEffect for delete

  // New delete request
  // const deleteTrucks = async () => {
  //   const response = await fetch("http://143.110.225.28/api/v1/inventory/", {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       id: "",
  //     }),
  //   });
  //   if (response.ok) {
  //     console.log(response.status, "Delete request successful");
  //   } else {
  //     console.log(
  //       response.status,
  //       "Something went wrong with the delete request"
  //     );
  //   }
  //   return await response.json();
  // };

  // //useEffect fetches trucks only after initial render. This is accomplished by passing the empty array
  // useEffect(() => {
  //   deleteTrucks();
  //   console.log("deleteTrucks useEffect ran successfully");
  // }, [trucks]);
  // // End of useEffect for fetch

  //Fetching the trucks db from the API link above //^----POST (ADD INVENTORY)----
  const postTrucks = async () => {
    try {
      const response = await fetch("http://143.110.225.28/api/v1/inventory/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          truckName: truckName,
          truckPrice: truckPrice,
          truckContents: truckContents,
          truckManifest: truckManifest,
        }),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect fetches trucks only after initial render. This is accomplished by passing the empty array
  useEffect(() => {
    postTrucks();
    console.log("postTrucks useEffect ran successfully");
  }, []);
  // End of useEffect for fetch

  ////////////////////////// &&--PROVIDER--&& ///////////////////////////////
  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        isSidebarOpen,
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

        isEditing,
        setIsEditing,
        editId,
        setEditId,
        alert,
        setAlert,
        error,
        setError,
        openModal,
        openSidebar,
        closeModal,
        closeSidebar,
        showAlert,
        clearList,
        removeItem,
        editItem,
        handleSubmit,

        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        personId,
        setPersonId,

        fetchTrucks,
        postTrucks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//! Custom hook for using context within app
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
