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
  const [truckLoad, setTruckLoad] = useState(getLocalStorage() );
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
