import React, { useState, useContext, useRef } from "react";
import { userURL } from "./Pages/urls"
import { useAuthContext } from "./auth";
import { useParams } from "react-router-dom";

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

  // ---- NOTES ------- ////
  const [salesReadMore, setSalesReadMore] = useState(false);
  const [accountingReadMore, setAccountingReadMore] = useState(false);
  const [logisticsReadMore, setLogisticsReadMore] = useState(false);
  const [isEditingSales, setIsEditingSales] = useState(false);
  const [isEditingLogi, setIsEditingLogi] = useState(false);
  const [isEditingAct, setIsEditingAct] = useState(false);
  const [salesNotes, setSalesNotes] = useState("");
  const [actNotes, setActNotes] = useState("");
  const [logiNotes, setLogiNotes] = useState("");
  const [validated, setValidated] = useState(false);
  const [originalValues, setOriginalValues] = useState({});

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



        salesReadMore: salesReadMore,
        accountingReadMore: accountingReadMore,
        logisticsReadMore: logisticsReadMore,
        isEditingSales: isEditingSales,
        setIsEditingSales: setIsEditingSales,
        isEditingLogi: isEditingLogi,
        setIsEditingLogi: setIsEditingLogi,
        isEditingAct: isEditingAct,
        setIsEditingAct: setIsEditingAct,
        salesNotes: salesNotes,
        setSalesNotes: setSalesNotes,
        actNotes: actNotes,
        setActNotes: setActNotes,
        logiNotes: logiNotes,
        setLogiNotes: setLogiNotes,
        validated: validated,
        setValidated: setValidated,
        originalValues: originalValues,
        setOriginalValues: setOriginalValues,
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
