import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import logo from "../img/w-logo.png";
import { useGlobalContext } from "../context";

const url = "https://api.thewholesalegroup.com/v1/trucks/?id=";

const AccountDetails = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  document.title = "Logout";
  let history = useHistory();

  const {
    cookies,
    removeCookie
} = useGlobalContext();

  useEffect(() => {
    setLoading(true);
    
  });

  //showAlert function, when called the values for each param are passed in as arguments
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
};

  const logout = () => {
    const url = "https://api.thewholesalegroup.com/v1/account/logout/";
    // user might have a refresh token that have not expired yet
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            refresh: cookies["user-refresh-token"]
        }),
    })
    .then(() => {
        removeCookie("user-access-token");
        removeCookie("user-refresh-token");
        history.push("/")
    })
    .catch((error) => {
        showAlert(true, "danger", error.message);
    });
  }

  useEffect(() => {
      logout();
  })

  return (
    <>
        {loading ? (
            <Loading />
        ) : (
            <Loading />
        )}
    </>
  );
};

export default AccountDetails;

// TP-52
