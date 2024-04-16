import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const NameCustomizeModal = ({ show, handleClose, handleCloseSave}) => {

    const [petNameInput, setPetNameInput] = useState("");

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Customize a name</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="customized.petName">
              <Form.Label>Name your pet</Form.Label>
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
            onClick={() => handleCloseSave(petNameInput)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NameCustomizeModal;
