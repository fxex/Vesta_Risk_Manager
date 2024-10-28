import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BotonSalir({ ruta }) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate(ruta);
      }}
    >
      <FontAwesomeIcon icon={faArrowRightFromBracket} className="mx-1" />
      Salir
    </Button>
  );
}
