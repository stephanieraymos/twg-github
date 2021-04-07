import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Pages/Loading";
import { useGlobalContext } from "../../context";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../auth";
import { verifyURL } from "../../Pages/urls";

const EmailVerification = () => {
  const { id } = useParams();
  const { token } = useParams();
  let history = useHistory();

  const [userId, setUserId] = useState("");

  const {
    setFirstName,
    setLastName,
    setEmail,
    setCompany,
    setPhoneNumber,
    setBillingAddress,
  } = useGlobalContext();

  const { setAccessToken, setRefreshToken } = useAuthContext();

  document.title = "Email Verification";

  useEffect(() => {
    fetch(`${verifyURL}${id}/${token}/`)
      .then((response) => {
        const res = response.json();
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
        setAccessToken(user["token"]["access"]);
        setRefreshToken(user["token"]["refresh"]);
      })
      .then(() => history.push("/dashboard"))
      .catch((error) => {
        history.push("/");
      });
  }, []);

  return <Loading />;
};

export default EmailVerification;

// TP-52
