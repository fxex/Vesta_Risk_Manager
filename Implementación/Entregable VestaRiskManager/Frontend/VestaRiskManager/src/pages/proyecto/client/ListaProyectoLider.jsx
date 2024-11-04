import React, { useEffect, useState } from "react";
import Navegador from "../../../components/Navegador";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import Contenedor from "../../../components/Contenedor";
import "./../../../styles/Home.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { obtenerProyectosUsuarioLider } from "../../../services/proyectos";
import { useUsuario } from "../../../context/usuarioContext";
import useProyecto from "../../../hooks/useProyecto";

export default function ListaProyectoLider() {
  const navigate = useNavigate();
  const { usuario } = useUsuario();
  const [proyectos, setProyectos] = useState([]);
  useEffect(() => {
    obtenerProyectosUsuarioLider(usuario.email).then((item) => {
      setProyectos(item);
    });
  }, []);

  const [value, setValue] = useProyecto("proyecto_seleccionado", "");

  return (
    <>
      <Navegador />
      <Contenedor>
        <h3>Proyectos de Líder</h3>
        <div style={{ minHeight: "40vh" }}>
          {proyectos.map((item, key) => (
            <Button
              key={key}
              className="w-100 d-flex justify-content-between align-items-center py-3 mb-2 boton_proyecto"
            >
              {item.nombre}
              <FontAwesomeIcon
                icon={faEye}
                className="fw-bold fs-3 me-2 icono"
                onClick={() => {
                  navigate(`/inicio/proyecto/lider/${item.id_proyecto}`);
                  setValue(item);
                }}
              />
            </Button>
          ))}
        </div>
      </Contenedor>
      <Footer />
    </>
  );
}
