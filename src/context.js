import React, { useState, useContext } from "react";

// Generating context
const AppContext = React.createContext(null);
//Generating provider
const AppProvider = ({ children }) => {
  //////////////////////// &&--STATE--&& /////////////////////////////
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
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
        company,
        setCompany,
        phoneNumber,
        setPhoneNumber,
        billingAddress,
        setBillingAddress,
        userId,
        setUserId,
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
