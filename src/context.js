import React, { useState, useContext } from "react";
import { userURL } from "./Pages/urls"

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [isResetEmailSuccess, setIsResetEmailSuccess] = useState(false);

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

  const getUser = (token) => {
    return new Promise((resolve, reject) => {
      fetch(userURL, {
          method: "GET",
          headers: {
              Authorization: "Bearer " + token, 
          },
        })
          .then((response) => {
            const res = response.json();
            if (response.ok) {
              return res;
            } else {
              throw new Error(res.message);
            }
          })
          .then((user) => {
            setEmail(user["email"]);
            setFirstName(user["first_name"]);
            setLastName(user["last_name"]);
            setCompany(user["company"]);
            setPhoneNumber(user["phone_number"]);
            setBillingAddress(user["billing_address"]);
            resolve(true)
          })
          .catch((error) => {
            reject(error)
          });
    });
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
        isSignUpSuccess,
        setIsSignUpSuccess,
        isResetEmailSuccess,
        setIsResetEmailSuccess,
        getUser,
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
