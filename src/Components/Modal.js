import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      showAlert(true, "danger", "Please enter value");
    } else if (firstName && isEditing) {
      // deal with edit if something is in value and user is editing
      setFirstName(
        person.map((person) => {
          if (person.id === editId) {
            return {
              ...person,
              firstName,
              lastName,
              email,
            };
          }
          return person;
        })
      );
      setFirstName(""); //Reseting input boxes to empty string
      setLastName("");
      setEmail("");
      setEditId(null); //Reseting editId
      setIsEditing(false); //Reseting isEditing to false
      showAlert(true, "success", "Person Details Updated"); //Showing alert after edit is submitted
    } else {
      // Show alert and add person to person list only if name is true and not editing
      showAlert(true, "success", "Person Added");
      //Creating new person
      const newPerson = {
        id: new Date().getTime().toString(),
        firstName,
        lastName,
        email,
      };

      //Spreading out current person list and adding newPerson to the list
      setPerson([...person, newPerson]);
      setFirstName(""); //Reseting input boxes to empty string
      setLastName("");
      setEmail("");
      console.log(newPerson); //Logging new person for testing purposes
    }
  };

  //showAlert function, when called the values for each param are passed in as arguments
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  //clearList function. Once list is cleared an alert confirms this to the user + person list is set back to empty array
  const clearList = () => {
    showAlert(true, "danger", "People cleared successfully");
    setPerson([]);
  };

  //removeItem grabs the id of the person to be removed, shows an alert to the user confirming
  //deletion + filters through the person list to keep only the people whose id doesn't match the removed person
  const removeItem = (id) => {
    showAlert(true, "danger", "Person Removed");
    setPerson(person.filter((person) => person.id !== id)); //If person id does not match then it will be added to new array, if it does match; it won't get returned + won't be displayed
  };

  //editItem grabs the id of the person to be edited, sets the person and sets all required values
  const editItem = (id) => {
    const specificPerson = person.find((person) => person.id === id);
    setIsEditing(true);
    setEditId(id);
    setFirstName(specificPerson.firstName);
    setLastName(specificPerson.lastName);
    setEmail(specificPerson.email);
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
              <Form.Label style={{ color: "white" }}>First Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
              <Form.Label style={{ color: "white" }}>Last Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
              <Form.Label style={{ color: "white" }}>Email</Form.Label>
              <Form.Control
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer
            style={{ justifyContent: "space-between", marginLeft: "4rem" }}
          >
            <Link to="/Signup">Don't have an account?</Link>
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
