import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { Button, Modal, Form } from "react-bootstrap";
import { useGlobalContext } from "../context";
import Alert from "./Alert";
import modalandsidebar from "../css/modalandsidebar.css";

const getLocalStorage = () => {
  let person = localStorage.getItem("person");
  if (person) {
    return JSON.parse(localStorage.getItem("person"));
  } else {
    return [];
  }
};

const LoginModal = () => {
  const url = "https://api.thewholesalegroup.com/api/v1/account/login/";

  const { isModalOpen, closeModal } = useGlobalContext();

  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const {
    userId,
    setUserId,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    company,
    setCompany,
    phoneNumber,
    setPhoneNumber,
    billingAddress,
    setBillingAddress,
  } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showAlert(true, "danger", "Please enter value");
    } else {
      // Show alert and add person to person list only if name is true and not editing
      showAlert(true, "success", "Person Added");

      setEmail("");
      setPassword("");
    }
  };

  //showAlert function, when called the values for each param are passed in as arguments
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  //* useEffect for user post request
  const login = () => {
    console.log("login is running");
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else if (response.status == 400) {
          throw new Error("One or more of the required keys are missing.");
        } else if (response.status == 404) {
          throw new Error(
            "The user does not exist or email/password is incorrect."
          );
        }
      })
      .then((user) => {
        closeModal();
        setUserId(user["id"]);
        setEmail(user["email"]);
        setFirstName(user["first_name"]);
        setLastName(user["last_name"]);
        setCompany(user["company"]);
        setPhoneNumber(user["phone_number"]);
        setBillingAddress(user["billing_address"]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <Modal show={isModalOpen} onHide={closeModal}>
        {/* <Modal.Dialog
          dialogAs="home-modal"
          style={{ backgroundColor: "transparent" }}
        > */}
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <h1 className="modal-header">Login</h1>
            <button onClick={closeModal} className="close-trucks-modal ml-auto">
              X
            </button>
          </Modal.Header>
          <Modal.Body
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              border: "none",
            }}
          >
            <Form.Group className="center-form-group">
              <Form.Label style={{ color: "white" }}>Email</Form.Label>
              <Form.Control
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />
              <Form.Label style={{ color: "white" }}>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer
            style={{ justifyContent: "space-between", marginLeft: "4rem" }}
          >
            <a href="/Signup">
              <div>Don't have an account?</div>
            </a>
            <Button
              type="submit"
              onClick={login}
              className="boot-button"
              style={{ textAlign: "center" }}
            >
              Login
            </Button>
          </Modal.Footer>
        </Form>
        {/* </Modal.Dialog> */}
      </Modal>
    </div>
  );
};

export default LoginModal;

// TP-42
