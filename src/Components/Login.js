import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { Button, Modal, Form } from "react-bootstrap";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
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
  const { isModalOpen, closeModal } = useGlobalContext();

  const [person, setPerson] = useState(getLocalStorage());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //showAlert function, when called the values for each param are passed in as arguments
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  //useEffect happens only when person array changes. The person gets saved to localStorage
  useEffect(() => {
    localStorage.setItem("Person", JSON.stringify(person));
  }, [person]);

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
                placeholder="Email"
              />
              <Form.Label style={{ color: "white" }}>Password</Form.Label>
              <Form.Control
                type="text"
                required
                value={password}
                onChange={(e) => setEmail(e.target.value)}
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
              onClick={closeModal}
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
