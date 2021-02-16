import React, { useState, useEffect } from "react";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
// This will be the state of a modal that opens when button is clicked. 
// The modal will show import information based on what info was requested.

  document.title = "Return Center - Home";

  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
