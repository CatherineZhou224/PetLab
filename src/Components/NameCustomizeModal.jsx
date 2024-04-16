import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col';
import { useState } from "react";

const NameCustomizeModal = ({ show, handleClose, handleCloseSave, breed }) => {
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
