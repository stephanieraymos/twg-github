import React, { useState } from "react";
import Modal from './Modal';

const Home = () => {

  document.title = "Home";

  const showModal = (e) => {
      return <Modal />
  }

  return (
    <>
      <h1>Home Page</h1>
      <button type="button" onClick={(e) => showModal()}></button>
    </>
  );
};

export default Home;

// TP-22
