import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Pages/Loading";
import { useGlobalContext } from "../../context";
import { useHistory, useLocation } from "react-router-dom";
import { useAuthContext } from "../../auth";

const EmailVerification = () => {
  const { id } = useParams();
  const { token } = useParams();
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const {
    setFirstName,
    setLastName,
    setEmail,
    setCompany,
    setPhoneNumber,
    setBillingAddress,
  } = useGlobalContext();

  const { emailVerification } = useAuthContext();

  document.title = "Email Verification";

  useEffect(() => {
    emailVerification(id, token)
      .then((user) => {
        setEmail(user["email"]);
        setFirstName(user["first_name"]);
        setLastName(user["last_name"]);
        setCompany(user["company"]);
        setPhoneNumber(user["phone_number"]);
        setBillingAddress(user["billing_address"]);
      })
      .then(() => {
        history.replace(from);
      })
      .catch((error) => {
        history.replace(from);
      });
  }, []);

  return <Loading />;
};

export default EmailVerification;

// TP-52
