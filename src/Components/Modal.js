import React, { useState, useEffect } from "react";

const Modal = (modalContent, closeModal) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // This will be the state of a modal that opens when button is clicked.
  // The modal will show import information based on what info was requested.
  const [modalContent, setModalContent] = useState(loginOption);

  return (
    <>
      {modalContent === loginOption ? (
        <Login />
      ) : (
        <Register /> && setModalContent(registerOption)
      )}
    </>
  );
};

export default Modal;
