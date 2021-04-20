import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../Pages/Loading";
import { authService } from "../../authService";

const Logout = () => {
  document.title = "Logout";
  let history = useHistory();

  useEffect(() => {
    authService.logout()
      .then(() => {
        history.push("/login");
      })
      .catch(() => {
        history.push("/login");
      });
  }, []);

  return <Loading />;
};

export default Logout;

// TP-52
