import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";
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

const Modal = () => {
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
      <div className="modal-container">
        <h3 className="modal-header">Login</h3>
        <form onSubmit={handleSubmit}>
          {/* If alert is showing, we bring in the alert component */}
          {alert.show && <Alert {...alert} removeAlert={showAlert} />}
          <div className="form-control">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              style={{ textAlign: "center" }}
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              style={{ textAlign: "center" }}
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ textAlign: "center" }}
            />
            <a href="/Signup">
              <div className="no-account">Don't have an account?</div>
            </a>
            <button className="submit-modal-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Modal;

// TP-42
