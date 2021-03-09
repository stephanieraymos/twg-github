import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, truckLoad }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout); //!Cleanup
  }, [truckLoad]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
