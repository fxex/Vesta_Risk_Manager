import React from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { informeTarea } from "../../informes/tareas";
import { useUsuario } from "../../../context/usuarioContext";

export default function MonitoreoLider() {
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));
  const navigate = useNavigate();
  const { id_proyecto } = useParams();
  const { usuario } = useUsuario();  

  return (
    <>
      <NavegadorLider />
      <Contenedor>
        <h3>{proyecto.nombre} - Monitoreo</h3>
        <div style={{ minHeight: "50vh" }}>
          <p>Seleccione una de las siguientes opciones:</p>
          <div className="d-flex gap-3" style={{ minHeight: "10vh" }}>
            <Button
              className="boton_2"
              onClick={() => {
                navigate(
                  `/inicio/proyecto/lider/${id_proyecto}/monitoreo/planes`
                );
              }}
            >
              Planes actuales
            </Button>
            <Button className="boton_2">Planes pasados</Button>
            <Button className="boton_2">Evaluaciones actuales</Button>
            <Button className="boton_2">Evaluaciones anteriores</Button>
          </div>
          <hr ></hr>
          <p>Informes:</p>
          <div className="d-flex gap-3" style={{ minHeight: "10vh" }}>
            <Button className="boton_2" onClick={() =>{
              navigate(
                `/inicio/proyecto/lider/${id_proyecto}/monitoreo/incidencias`
              );
            }
            }>Incidencias</Button>
            <Button className="boton_2" onClick={()=>{
              navigate(
                `/inicio/proyecto/lider/${id_proyecto}/monitoreo/${usuario.id_usuario}/tareas`
              );
            }
            }>Tareas a realizar</Button>
            <Button className="boton_2">Seguimiento de riesgo</Button>
          </div>
        </div>
      </Contenedor>
      <Footer />
    </>
  );
}
