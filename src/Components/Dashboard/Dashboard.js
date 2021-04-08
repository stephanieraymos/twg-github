import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import dashboard from "../../css/dashboard.css";
import OrderDetails from "../Orders/OrderDetails";
import Loading from "../../Pages/Loading";
import { useAuthContext } from "../../auth";
import { useHistory } from "react-router-dom";
import { userURL } from "../../Pages/urls";
import DashboardBody from "./DashboardBody";

const Dashboard = () => {
  document.title = "Dashboard";

  // const { getData } = useTruckContext();

  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  let history = useHistory();

  const {
    setEmail,
    setFirstName,
    setLastName,
    setCompany,
    setPhoneNumber,
    setBillingAddress,
  } = useGlobalContext();

  const { fetchAccessToken } = useAuthContext();

  const handleViewDetails = () => {
    return <OrderDetails />;
  };

  const getUserDetails = (accessToken) => {
    fetch(userURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        const res = response.json();
        console.log(res);
        if (response.ok) {
          return res;
        } else {
          throw new Error(res.message);
        }
      })
      .then((user) => {
        setUserId(user["id"]);
        setEmail(user["email"]);
        setFirstName(user["first_name"]);
        setLastName(user["last_name"]);
        setCompany(user["company"]);
        setPhoneNumber(user["phone_number"]);
        setBillingAddress(user["billing_address"]);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  useEffect(() => {
    fetchAccessToken
      .then((token) => {
        getUserDetails(token);
      })
      .catch((error) => {
        console.log(error)
        history.push("/");
      });
  }, []);

  return (
    <>
      <DashboardBody />
    </>
  );
};

export default Dashboard;

// TP-21
