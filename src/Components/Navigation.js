import React from "react";
import Modal from "./Modal";

const Navigation = () => {
  document.title = "Navigation";

  const showModal = (e) => {
    return <Modal />;
  };

  return (
    <>
      <h1>Navigation</h1>
      <button type="button" onClick={(e) => showModal()}></button>
    </>
  );
};

export default Navigation;

// TP-39
