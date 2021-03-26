import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { useGlobalContext } from "../context";
import { useTruckContext } from "../truckContext";
import { useHistory } from "react-router-dom";

const EmailVerification = () => {
    const url = "https://api.thewholesalegroup.com/v1/account/register/verify/";
    const { id } = useParams();
    const { token } = useParams();
    let history = useHistory();

    const {
        setUserId,
        setFirstName,
        setLastName,
        setEmail,
        setCompany,
        setPhoneNumber,
        setBillingAddress,
        cookies,
        setCookie,
        error,
        setError,
    } = useGlobalContext();

    const {
        showAlert
    } = useTruckContext();

    document.title = "Email Verification";

    useEffect(() => {
        fetch(`${url}${id}/${token}/`)
            .then((response) => {
                const res = response.json()
                if (response.ok) {
                    return res
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
                setCookie("user-access-token", user["token"]["access"], {
                    path: "/",
                    // secure: true,
                    maxAge: 3600    // 1 hour
                });
                setCookie("user-refresh-token", user["token"]["refresh"], {
                    path: "/",
                    // secure: true,
                    maxAge: 604800  // 7 days
                });
            })
            .then(() => history.push("/Dashboard"))
            .catch((error) => {
                showAlert(true, "danger", error.message);
            });
    });

    return <Loading />;
};

export default EmailVerification;

// TP-52
