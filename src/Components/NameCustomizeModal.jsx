import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import { useState } from "react";

// This component allows users to customize a pet's name through a modal dialog.
const NameCustomizeModal = ({ show, handleClose, handleCloseSave, breed }) => {
  const [petNameInput, setPetNameInput] = useState("");

  return (
    <>
      {/* Modal component from react-bootstrap used to display an overlay or a pop-up dialog. */}
      <Modal show={show} onHide={handleClose}>
        {/* Modal header with a close button. */}
        <Modal.Header closeButton>
          <Modal.Title>Customize a name</Modal.Title>
        </Modal.Header>
        {/* Body of the modal containing a form for user input. */}
        <Modal.Body>
          {/* Form group for customizing the pet's name. */}
          <Form>
            <Form.Group className="mb-3" controlId="customized.petName">
              <Form.Label>Name your pet</Form.Label>
              <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={`Breed: ${breed}`}
                />
              </Col>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Think of a name;))"
                value={petNameInput}
                onChange={(e) => setPetNameInput(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleCloseSave(petNameInput, breed)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NameCustomizeModal;
