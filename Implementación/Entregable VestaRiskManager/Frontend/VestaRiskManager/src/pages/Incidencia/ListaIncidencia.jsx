import React, { useState } from "react";
import Contenedor from "../../components/Contenedor";
import NavegadorLider from "../../components/NavegadorLider";
import Footer from "../../components/Footer";
import {
  Alert,
  Button,
  Figure,
  Modal,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faTrashCan,
  faFilePdf
} from "@fortawesome/free-solid-svg-icons";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { obtenerIncidenciasProyecto } from "../../services/riesgos";
import "./../../styles/ListaRiesgo.css";
import { formatearFecha, formatearFechaHora } from "../../utils/fecha";

export const incidenciaLoader = async ({ params }) => {
  const incidencias = await obtenerIncidenciasProyecto(params.id_proyecto);
  return { incidencias };
};

export default function ListaIncidencia() {
  const { incidencias } = useLoaderData();
  const navigate = useNavigate();
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));

  return (
    <>
      <NavegadorLider />
      {/* {iteracion === null ? (
        <Alert variant="danger" className="text-center">
          No existe una iteración activa del proyecto. Sólo se permite
          visualizar.
        </Alert>
      ) : null} */}
      <Contenedor>
        <>
          <h3>{proyecto.nombre} - Incidencias ocurridas</h3>
          {/* {iteracion ? (
            <>
              <h4>
                {iteracion.nombre}
                {" - "}
                {formatearFecha(iteracion.fecha_inicio)}
                {" al "}
                {formatearFecha(iteracion.fecha_fin)}
              </h4>
            </>
          ) : null} */}
        </>
        <>
          <Button
            variant="success"
            onClick={() => {
              // navigate(
              //   `/inicio/proyecto/${
              //     comprobacionLider ? "lider" : "desarrollador"
              //   }/${id_proyecto}/incidencia/crear`
              // );
            }}
            // disabled={iteracion === null}
          >
            <FontAwesomeIcon icon={faPlus} className="mx-1" />
            Nueva incidencia
          </Button>
          <Table size="sm" hover className="mt-2" bordered>
            <thead className="cabecera">
              <tr>
                <th style={{ maxWidth: "5em" }} className="th">Identificador del riesgo</th>
                <th className="th">Descripcion</th>
                <th className="th">Responsable</th>
                <th style={{ maxWidth: "4em" }} className="th">
                  Gravedad
                </th>
                <th style={{ maxWidth: "4em" }} className="th">
                  Fecha
                </th>
                <th className="th">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {incidencias.map((incidencia, key) => (
                <tr key={key} style={{textAlign:"center"}}>
                  <td>RK
                    {incidencia.id_riesgo < 10
                      ? `0${incidencia.id_riesgo}`: incidencia.id_riesgo}</td>
                  <td>{incidencia.descripcion}</td>
                  <td>{incidencia.responsable}</td>
                  <td style={{color: incidencia.gravedad === "Alta" ? "red" : incidencia.gravedad === "Media" ? "yellow":"gray", fontWeight:"bold"}}>{incidencia.gravedad}</td>
                  <td>{formatearFechaHora(new Date(incidencia.fecha_ocurrencia))}</td>
                  <td className="td">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-edit">Ver</Tooltip>}
                      >
                        <Button
                          variant="outline-primary"
                          onClick={() => {
                            
                          }}
                        >
                          <FontAwesomeIcon icon={faSearch} />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-edit">Descargar</Tooltip>}
                      >
                        <Button
                          style={{ marginLeft: "5px" }}
                          variant="outline-dark"
                          onClick={() => {
                            
                          }}
                        >
                          <FontAwesomeIcon icon={faFilePdf} />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-edit">Eliminar</Tooltip>}
                      >
                        <Button
                          style={{ marginLeft: "5px" }}
                          variant="outline-danger"
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                      </OverlayTrigger>
                      
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      </Contenedor>
      <Footer />
    </>
  );
}
