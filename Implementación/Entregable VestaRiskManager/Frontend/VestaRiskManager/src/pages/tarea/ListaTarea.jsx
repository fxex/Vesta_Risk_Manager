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
  faFilePdf,
  faCheck,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { obtenerTareasProyecto } from "../../services/riesgos";
import "./../../styles/ListaRiesgo.css";
import { formatearFecha, formatearFechaHora } from "../../utils/fecha";
import { obtenerIteracionActual } from "../../services/proyectos";
import { informeIncidencia } from "../informes/incidencia";
import { useUsuario } from "../../context/usuarioContext";
import { obtenerIncidenciaId } from "../../services/informes";
import { completarTarea } from "../../services/planes";
import { informeTarea } from "../informes/tareas";

export const TareaLoader = async ({ params }) => {
  const tareas = await obtenerTareasProyecto(params.id_proyecto);
  const iteracion = await obtenerIteracionActual(params.id_proyecto);
  return { tareas, iteracion};
};

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
            onClick={() => {
              const datos = {
                nombre_proyecto: proyecto.nombre,
                riesgos: [{id_riesgo:"RK01"}, {id_riesgo:"RK02"},{id_riesgo:"RK03"},{id_riesgo:"RK04"},{id_riesgo:"RK05"}, {id_riesgo:"RK06"}, {id_riesgo:"RK07"}]
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
                          className={tarea.estado == '1'? "d-none":""}
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
