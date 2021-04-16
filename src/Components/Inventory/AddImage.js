import React from "react";
import { Button } from "react-bootstrap";
import camera from "../../camera.js";
import { FaCamera } from "react-icons/fa";

const AddImage = () => {
  const handleTakeImage = () => {
      console.log("Handle Take Image Triggered")
    camera.startCamera();
    camera.takeSnapshot();
  };

  return (
    <div>
      <Button className="add-image-btn" onClick={handleTakeImage}>
        <FaCamera /> 
         Take Image
      </Button>
    </div>
  );
};

export default AddImage;
