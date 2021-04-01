import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import logo from "../img/w-logo.png";
import { useGlobalContext } from "../context";

import { useAuthContext } from "../auth";

const url = "https://api.thewholesalegroup.com/v1/trucks/?id=";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [accessToken, setAccessToken] = useState("");

  document.title = "Logout";
  let history = useHistory();

  const {
    fetchAccessToken,
    fetchRefreshToken,
    removeTokens,
  } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    fetchAccessToken
      .then((token) => {
        setAccessToken(token);
      })
      .catch((error) => {
        history.push("/");
      });
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
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken,
        },
        body: JSON.stringify({
            refresh: fetchRefreshToken()
        }),
    })
    .then(() => {
        removeTokens();
        history.push("/");
    })
    .catch((error) => {
        showAlert(true, "danger", error.message);
        history.push("/home")
    });
  }

  useEffect(() => {
    logout();
  }, [])

  return <Loading />
};

export default Logout;

// TP-52
