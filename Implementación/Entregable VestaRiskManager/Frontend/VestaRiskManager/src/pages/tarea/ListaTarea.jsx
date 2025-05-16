import React, { useState } from "react";
import Contenedor from "../../components/Contenedor";
import NavegadorLider from "../../components/NavegadorLider";
import Footer from "../../components/Footer";
import {
  Alert,
  Button,
  Modal,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCheck,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { formatearFecha } from "../../utils/fecha";
import { useUsuario } from "../../context/usuarioContext";
import { completarTarea, obtenerDatosTareasInforme } from "../../services/planes";
import { informeTarea } from "../informes/tareas";
import { filtrarYFormatear } from "../../utils/filtrarUsuario";
import "./../../styles/ListaRiesgo.css";

export default function ListaTarea() {
  const { tareas, iteracion } = useLoaderData();
  const navigate = useNavigate();
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));
  const { usuario } = useUsuario();  

  const [completar, setCompletar] = useState(false)
  const [tareaSeleccionada, setTareaSeleccionada] = useState(0)

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
          <h3>{proyecto.nombre} - Tareas a Realizar</h3>
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
            onClick={async () => {
              const resultado = await obtenerDatosTareasInforme(proyecto.id_proyecto)
              const iteracionExiste = iteracion ? iteracion : {}
              
              const datos = {
                nombre_proyecto: proyecto.nombre,
                iteracion_nombre: iteracionExiste.nombre ? iteracionExiste.nombre : null,
                lideres_proyecto: filtrarYFormatear(proyecto.participantes, "Lider del proyecto"),
                desarrolladores_proyecto: filtrarYFormatear(proyecto.participantes, "Desarrollador"),
                riesgos: resultado
              }
              informeTarea(datos)
            }}
            // disabled={iteracion === null}
          >
            Generar Informe
          </Button>
          {/* <Button
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
          </Button> */}
          <Table size="sm" hover className="mt-2" bordered>
            <thead className="cabecera">
              <tr>
                <th style={{ maxWidth: "5em" }} className="th">Nombre</th>
                <th style={{ width: "20em" }} className="th">Descripción</th>
                <th style={{ width: "10em" }} className="th">
                  Fecha de inicio
                </th>
                <th style={{ width: "10em" }} className="th">
                  Fecha de fin
                </th>
                <th style={{ maxWidth: "5em" }} className="th">Estado</th>
                <th className="th">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tareas.map((tarea, key) => (
                <tr key={key} style={{textAlign:"center"}}>
                  <td>{tarea.nombre}</td>
                  <td style={{textWrap:"wrap"}}>{tarea.descripcion}</td>
                  <td>{formatearFecha(tarea.fecha_inicio)}</td>
                  <td>{formatearFecha(tarea.estado == '0' ? tarea.fecha_fin : tarea.fecha_fin_real)}</td>
                  <td>{tarea.estado == '0' ? "Pendiente" : "Completado"}</td>
                  <td className="td">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-edit">Completar</Tooltip>}
                      >
                        <Button
                          style={{ marginRight: "5px" }}
                          variant="outline-success"
                          onClick={()=>{
                            setCompletar(true)
                            setTareaSeleccionada(tarea.id_tarea)
                          }}
                          className={tarea.estado == '1' || tarea.pertenece == 0 ? "d-none":""}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-edit">Ver</Tooltip>}
                      >
                        <Button
                          variant="outline-primary"
                          onClick={() => {
                            navigate(`inicio/proyecto/lider/${proyecto.id_proyecto}/monitoreo/${usuario.id_usuario}/tarea/${tarea.id_tarea}`)
                          }}
                        >
                          <FontAwesomeIcon icon={faSearch} />
                        </Button>
                      </OverlayTrigger>
                      
                      
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal
            show={completar}
            onHide={() => {
              setCompletar(false);
              setTareaSeleccionada(0)
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>¿Está seguro?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                La tarea será marcada como completada y no se podrá revertir la acción.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-success"
                onClick={async () => {
                  await completarTarea(tareaSeleccionada)
                  setCompletar(false);
                  window.location.reload()
                }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ marginRight: "5px" }}
                />
                Marcar como completado
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => {
                  setCompletar(false);
                  setTareaSeleccionada(0)
                }}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  style={{ marginRight: "5px" }}
                />
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Contenedor>
      <Footer />
    </>
  );
}
