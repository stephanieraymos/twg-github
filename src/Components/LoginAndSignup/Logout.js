import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../Pages/Loading";

import { useAuthContext } from "../../auth";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

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
        logout(token);
      })
      .catch((error) => {
        history.push("/");
      });
  }, []);

  const logout = (accessToken) => {
    const url = "https://api.thewholesalegroup.com/v1/account/logout/";
    // user might have a refresh token that have not expired yet
    fetch(url, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            refresh: fetchRefreshToken()
        }),
    })
    .then((response) => {
      removeTokens();
      history.push("/");
    })
    .catch((error) => {
      history.push("/")
    });
  }

  return <Loading />
};

export default Logout;

// TP-52
