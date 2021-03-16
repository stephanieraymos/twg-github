import React, { useState, useEffect, useContext, useReducer } from "react";


// Generating context
const AppContext = React.createContext(null);

//Generating provider
const AppProvider = ({ children }) => {
  const url = "http://143.110.225.28/api/v1/inventory/"; //API LINK

  //////////////////////// &&--STATE--&& /////////////////////////////

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

  

  ////////////////////////// &&--PROVIDER--&& ///////////////////////////////
  return (
    <AppContext.Provider
      value={{

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

        isSidebarOpen,
        isModalOpen,
        setIsSidebarOpen,
        setIsModalOpen,

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//! Custom hook for using context within app
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
