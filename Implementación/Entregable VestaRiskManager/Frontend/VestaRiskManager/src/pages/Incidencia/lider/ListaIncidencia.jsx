import React, { useEffect, useState } from "react";
import Contenedor from "../../../components/Contenedor";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import {
  Alert,
  Button,
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
  useNavigate,
} from "react-router-dom";
import { formatearFecha, formatearFechaHora, filtrarYFormatear } from "../../../utils/funciones";
import { informeIncidencia } from "../../informes/incidencia";
import { obtenerIncidenciaId } from "../../../services/informes";
import BotonSalir from "../../../components/BotonSalir";
import "./../../../styles/ListaRiesgo.css";
import { obtenerIncidenciasProyectoPaginado } from "../../../services/incidencia";
import Paginado from "../../../components/Paginado";

export default function ListaIncidencia() {
  const { incidencias, totalPaginas, iteracion } = useLoaderData();
  
  const navigate = useNavigate();
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));
  const [paginaActual, setPaginaActual] = useState(1);
  const [incidenciasCargadas, setIncidenciasCargadas] = useState(incidencias);

  useEffect(() => {
    obtenerIncidenciasProyectoPaginado(proyecto.id_proyecto, paginaActual).then(
      (data) => {
        setIncidenciasCargadas(data.incidencias);
      }
    );
  }, [paginaActual]);
  return (
    <>
      <NavegadorLider />
      {iteracion === null ? (
        <Alert variant="danger" className="text-center">
          No existe una iteración activa del proyecto. Sólo se permite
          visualizar.
        </Alert>
      ) : null}
      <Contenedor>
        <>
          <h3>{proyecto.nombre} - Incidencias ocurridas</h3>
          {iteracion ? (
            <>
              <h4>
                {iteracion.nombre}
                {" - "}
                {formatearFecha(iteracion.fecha_inicio)}
                {" al "}
                {formatearFecha(iteracion.fecha_fin)}
              </h4>
            </>
          ) : null}
        </>
        <>
          <Button
            variant="success"
            onClick={() => {
              navigate(`/inicio/proyecto/lider/${proyecto.id_proyecto}/monitoreo/incidencia/crear`);
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
              {incidenciasCargadas && incidenciasCargadas.length > 0 ? incidenciasCargadas.map((incidencia, key) => (
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
                            const iteracionExiste = iteracion ? iteracion : {}                                          
                            const datos = {
                              id_riesgo: `RK${incidencia.id_riesgo < 10 ? '0':''}${incidencia.id_riesgo}`,
                              iteracion_nombre: iteracionExiste.nombre ? iteracionExiste.nombre : null,
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
              )) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>No hay incidencias</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Paginado paginaActual={paginaActual} setPaginaActual={setPaginaActual} totalPaginas={totalPaginas} />
          <BotonSalir ruta={"/inicio/proyecto/lider/" + proyecto.id_proyecto + "/monitoreo"} />
        </>
      </Contenedor>
      <Footer />
    </>
  );
}
