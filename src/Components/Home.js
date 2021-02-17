import React, { useState } from "react";
import Modal from './Modal';

const Home = () => {

  document.title = "Return Center - Home";

  const showModal = (e) => {
      return <Modal />
  }

  return (
    <>
      <h1>Home</h1>
      <button type="button" onClick={(e) => showModal()}></button>
    </>
  );
};

export default Home;
