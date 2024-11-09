import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./../styles/modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ModalPersonalizado({
  title,
  children,
  show,
  setShow,
  onConfirm,
  datosDefecto,
}) {
  const [botonPresionado, setBotonPresionado] = useState(false);
  const handleShow = () => {
    setShow(!show);
    datosDefecto();
  };
  return (
    <Modal show={show} onHide={handleShow} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-success"
          onClick={() => {
            setBotonPresionado(true);
            onConfirm();
            setBotonPresionado(false);
          }}
          disabled={botonPresionado}
        >
          <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />
          Añadir
        </Button>
        <Button variant="outline-danger" onClick={handleShow}>
          <FontAwesomeIcon icon={faXmark} style={{ marginRight: "5px" }} />
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
