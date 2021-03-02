import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //Wrapping whole app in Provider
  return <AppContext.Provider value="Testing">{children}</AppContext.Provider>;
};

// Custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
