import React, { useState, useContext, createContext, useRef } from "react";
import { inventoryURL } from "./Pages/urls"
import { useAuthContext } from "./auth";
import { useParams } from "react-router-dom";

const NotesContext = createContext();

//Generating provider
const NotesProvider = ({ children }) => {
  //////////////////////// &&--STATE--&& /////////////////////////////
  const [salesReadMore, setSalesReadMore] = useState(false);
  const [accountingReadMore, setAccountingReadMore] = useState(false);
  const [logisticsReadMore, setLogisticsReadMore] = useState(false);
  const [isEditingSales, setIsEditingSales] = useState(false);
  const [isEditingLogi, setIsEditingLogi] = useState(false);
  const [isEditingAct, setIsEditingAct] = useState(false);
  const [salesNotes, setSalesNotes] = useState("");
  const [validated, setValidated] = useState(false);
  const [originalValues, setOriginalValues] = useState({});
  const salesForm = useRef(null);
  const { accessToken } = useAuthContext();
  const { id } = useParams();

  ////////////////////// &&--FUNCTIONS--&& /////////////////////////

  // Return true or false to indicate if fetch was successful
  const updateSalesNotes = () => {
    const data = new FormData(salesForm.current);
    data.append("id", id);

    fetch(inventoryURL, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
      body: data,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return true;
        } else return false;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ////////////////////////// &&--PROVIDER--&& ///////////////////////////////
  return (
    <NotesContext.Provider
      value={{
        salesReadMore: salesReadMore,
        accountingReadMore: accountingReadMore,
        logisticsReadMore: logisticsReadMore,
        isEditingSales: isEditingSales,
        isEditingLogi: isEditingLogi,
        isEditingAct: isEditingAct,
        salesNotes: salesNotes,
        setSalesNotes: setSalesNotes,
        validated: validated,
        setValidated: setValidated,
        updateSalesNotes: updateSalesNotes,
        originalValues: originalValues,
        setOriginalValues: setOriginalValues,
        salesForm: salesForm,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

//! Custom hook for using context within app
const useNotesContext = () => {
  return useContext(NotesContext);
};

export { NotesProvider, useNotesContext };
