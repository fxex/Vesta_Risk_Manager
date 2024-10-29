import React from "react";
import logoVesta from "../assets/img/Logo-VestaRiskManager2.png";
import { Navbar, Container, Figure, Nav, NavDropdown } from "react-bootstrap";
import "../styles/GradientBorderComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faUserGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useUsuario } from "../context/usuarioContext";

export default function NavegadorLider() {
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
            <Nav.Link href="/inicio">Dashboard</Nav.Link>
            <Nav.Link href="/inicio">Lista de Riesgos</Nav.Link>
            <Nav.Link href="/inicio">Monitoreo</Nav.Link>

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
