import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../Pages/Loading";
import { logoutURL } from "../../Pages/urls";
import { useAuthContext } from "../../auth";

const Logout = () => {
  document.title = "Logout";
  let history = useHistory();

  const {
    logout
  } = useAuthContext();

  useEffect(() => {
    logout()
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        history.push("/");
      });
  }, []);

  return <Loading />;
};

export default Logout;

// TP-52
