import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";

// Params: modalContent, closeModal
const Modal = () => {
  useEffect(() => {
    setTimeout(() => {
      // closeModal();
    }, 3000);
  }, []);

  const loginOption = () => {
    return <h1>Login Option</h1>;
  };

  const registerOption = () => {
    return <h1>Register Option</h1>;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  // This will be the state of a modal that opens when button is clicked.
  // The modal will show import information based on what info was requested.
  const [modalContent, setModalContent] = useState(loginOption);
  // This will set the modal content based on whether the user selects login or register
  console.log(modalContent);

  return (
    <>
      <h1>Modal</h1>
      {/* {modalContent === loginOption ? (
        <Login />
      ) : (
        <Register /> && setModalContent(registerOption)
      )} */}
    </>
  );
};

export default Modal;

// TP-42
