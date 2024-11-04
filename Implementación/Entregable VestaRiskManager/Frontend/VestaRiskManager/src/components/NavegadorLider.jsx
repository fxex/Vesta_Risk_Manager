import React from "react";
import logoVesta from "../assets/img/Logo-VestaRiskManager2.png";
import { Navbar, Container, Figure, Nav, NavDropdown } from "react-bootstrap";
import "../styles/GradientBorderComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUsuario } from "../context/usuarioContext";
import useProyecto from "../hooks/useProyecto";

export default function NavegadorLider() {
  const navigate = useNavigate();
  const [value] = useProyecto("proyecto_seleccionado", "");
  const location = useLocation();
  const { usuario } = useUsuario();
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="gradient-border-bottom"
    >
      <Container className="d-flex align-items-center">
        <Navbar.Brand href="/inicio" className="d-flex align-items-center">
          <Figure.Image src={logoVesta} width={60} />
          Vesta Risk Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/inicio">
              <FontAwesomeIcon icon={faHouse} className="mx-2" />
              Inicio
            </Nav.Link>
            <Nav.Link href={`/inicio/proyecto/lider/${value.id_proyecto}`}>
              Dashboard
            </Nav.Link>
            <Nav.Link
              href={`/inicio/proyecto/lider/${value.id_proyecto}/riesgos`}
            >
              Lista de Riesgos
            </Nav.Link>
            <Nav.Link
              href={`/inicio/proyecto/lider/${value.id_proyecto}/monitoreo`}
            >
              Monitoreo
            </Nav.Link>

            <Nav.Link href="/salir">
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="mx-2"
              />
              Salir
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
