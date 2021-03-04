import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  
  const getLocalStorage = () => {
    let truck = localStorage.getItem("truck");
    if (truck) {
      return JSON.parse(localStorage.getItem("truck"));
    } else {
      return [];
    }
  };

  //Wrapping whole app in Provider
  const [truckLoad, setTruckLoad] = useState(getLocalStorage());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [truckName, setTruckName] = useState("");
  const [truckPrice, setTruckPrice] = useState("");
  const [truckContents, setTruckContents] = useState([]);
  const [id, setId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [postToDb, setPostToDb] = useState(true);
  const [error, setError] = useState(false);

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
    setTruckName(specificItem.truckName);
    setTruckPrice(specificItem.truckPrice);
    setTruckContents(specificItem.truckContents);
  };

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
        truckLoad,
        setTruckLoad,
        id,
        setId,
        isEditing,
        setIsEditing,
        editId,
        setEditId,
        alert,
        setAlert,
        postToDb,
        setPostToDb,
        error,
        setError,
        getLocalStorage,
        openModal,
        openSidebar,
        closeModal,
        closeSidebar,
        showAlert,
        clearList,
        removeItem,
        editItem
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
