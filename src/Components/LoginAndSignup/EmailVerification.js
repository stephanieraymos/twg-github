import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Pages/Loading";
import { useGlobalContext } from "../../context";
import { useHistory, useLocation } from "react-router-dom";
import { authService } from "../../authService";

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

  document.title = "Email Verification";

  useEffect(() => {
    authService.emailVerification(id, token)
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
