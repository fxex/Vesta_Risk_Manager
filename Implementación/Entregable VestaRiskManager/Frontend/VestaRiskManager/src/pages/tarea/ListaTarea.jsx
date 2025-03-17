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
import { obtenerIteracionActual } from "../../services/proyectos";
import { informeIncidencia } from "../informes/incidencia";
import { useUsuario } from "../../context/usuarioContext";
import { obtenerIncidenciaId } from "../../services/informes";

export const TareaLoader = async ({ params }) => {
  const tarea = await obtenerIncidenciasProyecto(params.id_proyecto);
  const iteracion = await obtenerIteracionActual(params.id_proyecto);
  return { tarea, iteracion};
};

export default function ListaTarea() {
  const { incidencias, iteracion } = useLoaderData();
  const navigate = useNavigate();
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));

  function filtrarYFormatear(usuarios, rolBuscado) {
    return usuarios
      .filter(user => user.rol === rolBuscado)
      .map(user => `${user.nombre} - ${user.email}`)
      .join('\n');
}

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
          <h3>{proyecto.nombre} - Tareas a Realizar</h3>
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
            Generar Informe
          </Button>
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
            Generar Informe completo
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
                  <td>{incidencia.responsable_nombre}</td>
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
                          onClick={async() => {
                            const respuesta = await obtenerIncidenciaId(incidencia.id_incidencia)                                                        
                            const datos = {
                              id_riesgo: `RK${incidencia.id_riesgo < 10 ? '0':''}${incidencia.id_riesgo}`,
                              iteracion_nombre: iteracion.nombre,
                              responsable: incidencia.responsable_nombre,
                              responsable_correo: respuesta.responsable_email,
                              responsable_rol: respuesta.responsable_rol,
                              nombre_proyecto: proyecto.nombre,
                              descripcion_riesgo: respuesta.descripcion_riesgo,
                              responsable_riesgo: respuesta.responsable_riesgo,
                              tipo_riesgo: respuesta.tipo_riesgo,
                              fecha_incidencia: formatearFechaHora(new Date(incidencia.fecha_ocurrencia)),
                              descripcion_incidencia: incidencia.descripcion,
                              observaciones_incidencia: incidencia.gravedad,
                              lideres_proyecto: filtrarYFormatear(proyecto.participantes, "Lider del proyecto"),
                              desarrolladores_proyecto: filtrarYFormatear(proyecto.participantes, "Desarrollador")
                            }
                            informeIncidencia(datos)
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
