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

/**
 * Componente NavegadorLider
 *
 * Este componente renderiza una barra de navegación específica para líderes y desarrolladores de proyectos.
 * Incluye opciones para navegar al dashboard, lista de riesgos, monitoreo y cerrar sesión.
 *
 * @returns {JSX.Element} - Barra de navegación personalizada para líderes y desarrolladores.
 */
export default function NavegadorLider() {
  const navigate = useNavigate();
  const location = useLocation();
  const comprobacionLider = location.pathname.includes("lider");

  const { usuario } = useUsuario();
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));
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
            <Nav.Link
              href={`/inicio/proyecto/lider/${proyecto.id_proyecto}`}
              className={`${comprobacionLider ? "" : "d-none"}`}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              href={`/inicio/proyecto/${
                comprobacionLider ? "lider" : "desarrollador"
              }/${proyecto.id_proyecto}/riesgos`}
            >
              Lista de Riesgos
            </Nav.Link>
            <Nav.Link
              href={`/inicio/proyecto/${
                comprobacionLider ? "lider" : "desarrollador"
              }/${proyecto.id_proyecto}/monitoreo`}
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
