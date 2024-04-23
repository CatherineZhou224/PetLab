import React, { useState } from "react";
import "../App.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// ImageModal component to display an image and allow renaming
const ImageModal = ({
  src, // Source URL of the image to display
  alt, // Alternate text for the image
  caption, // Caption text to display below the image
  onClose, // Function to call on closing the modal
  handleCloseSave, // Function to handle saving the new name
  updateCollectionName, // Function to update the name in the collection
}) => {
  const [newName, setNewName] = useState(""); // State to hold the new name input by the user

  return (
    <>
      <div className="image-modal">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img className="image-modal-content" src={src} alt={alt} />
        {caption.length > 0 && (
          <div className="caption">💗💗💗💗💗{caption}💗💗💗💗💗</div>
        )}

        <InputGroup
          className="mb-3"
          style={{ width: "50%", margin: "0 auto", marginTop: "0px" }}
        >
          <Form.Control
            placeholder="Rename your pet"
            aria-label="Rename your pet"
            aria-describedby="basic-addon2"
            value={newName}
            onChange={(e) => setNewName(e.target.value)} // Update newName state as user types
          />
          <Button
            variant="success"
            id="button-addon2"
            onClick={() => {
              handleCloseSave(newName, alt); // Call handleCloseSave to save the new name
              updateCollectionName(newName, alt); // Update the collection with the new name
              setNewName(""); // Reset newName state to clear the form
            }}
          >
            Save
          </Button>
        </InputGroup>
      </div>
    </>
  );
};

export default ImageModal;
