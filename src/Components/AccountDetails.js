import React, { useState, useEffect } from "react";
import {
  FaAngleDoubleLeft,
  FaTimes,
  FaEdit,
  FaAngleDoubleDown,
} from "react-icons/fa";
import Navigation from "./Navigation";
// import { useTruck } from "../truckContext";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import logo from "../img/w-logo.png";
import { Card, Accordion } from "react-bootstrap";

const url = "https://api.thewholesalegroup.com/v1/trucks/?id=";

const AccountDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  document.title = "Account Details";

  useEffect(() => {
    setLoading(true);
    
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      
    </>
  );
};

export default AccountDetails;

// TP-52
