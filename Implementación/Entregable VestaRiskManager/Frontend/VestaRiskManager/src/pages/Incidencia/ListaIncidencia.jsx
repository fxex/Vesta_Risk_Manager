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
  faCheck,
  faNetworkWired,
  faPenToSquare,
  faPlus,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { obtenerRiesgosProyecto } from "../../services/riesgos";
import "./../../styles/ListaRiesgo.css";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons/faClipboardList";
import { obtenerIteracionActual } from "../../services/proyectos";
import escudoAmarillo from "../../assets/img/escudo amarillo.png";
import escudoGris from "../../assets/img/escudo gris.png";
import escudoAzul from "../../assets/img/Escudo azul.png";
import escudoRojo from "../../assets/img/escudo rojo.png";
import escudoCritico from "../../assets/img/Escudo critico.png";
import escudoVerde from "../../assets/img/escudo verde.png";
import { formatearFecha } from "../../utils/fecha";

// export const riesgoLoader = async ({ params }) => {
//   const riesgos = await obtenerRiesgosProyecto(params.id_proyecto);
//   riesgos.map((item, key) => {
//     item.id_riesgo_local = key + 1;
//   });

//   const iteracion = await obtenerIteracionActual(params.id_proyecto);

//   return { riesgos, iteracion };
// };

export default function ListaIncidencia() {
  const { id_proyecto } = useParams();
  // const { riesgos, iteracion } = useLoaderData();
  const location = useLocation();

  const navigate = useNavigate();
  const comprobacionLider = location.pathname.includes("lider");
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));
  const [confirmarEdicion, setConfirmarEdicion] = useState({
    confirmar: false,
    riesgo: null,
  });

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
          <h3>{proyecto.nombre}</h3>
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
              navigate(
                `/inicio/proyecto/${
                  comprobacionLider ? "lider" : "desarrollador"
                }/${id_proyecto}/incidencia/crear`
              );
            }}
            // disabled={iteracion === null}
          >
            <FontAwesomeIcon icon={faPlus} className="mx-1" />
            Nueva incidencia
          </Button>
          <Table size="sm" hover className="mt-2" bordered>
            <thead className="cabecera">
              <tr>
                <th style={{ minWidth: "4em" }} className="th"></th>
                <th className="th">ID</th>
                <th className="th">Descripción</th>
                <th style={{ maxWidth: "6em" }} className="th">
                  Responsable
                </th>
                <th style={{ maxWidth: "5em" }} className="th">
                  Identificador del riesgo
                </th>
                <th className="th">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[].map((riesgo, key) => (
                <tr key={key} style={{ textAlign: "center" }}>
                  <td className="td" style={{}}>
                    {riesgo.factor_riesgo === null || riesgo.evaluado <= 0 ? (
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-edit">
                            Evaluación pendiente.
                          </Tooltip>
                        }
                      >
                        <Figure.Image
                          src={escudoAmarillo}
                          style={false ? { cursor: "pointer" } : null}
                          onClick={() => {
                            if (false) {
                              navigate(
                                `/inicio/proyecto/${
                                  comprobacionLider ? "lider" : "desarrollador"
                                }/${id_proyecto}/riesgo/${riesgo.id_riesgo}-${
                                  riesgo.id_riesgo_local
                                }/evaluacion/crear`
                              );
                            }
                          }}
                        />
                      </OverlayTrigger>
                    ) : riesgo.factor_riesgo < 9 ? (
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-edit">
                            No necesita realizarse ninguna acción.
                          </Tooltip>
                        }
                      >
                        <Figure.Image src={escudoGris} />
                      </OverlayTrigger>
                    ) : riesgo.factor_riesgo < 36 ? (
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-edit">
                            Será reevaluado en la siguiente iteración.
                          </Tooltip>
                        }
                      >
                        <Figure.Image src={escudoAzul} />
                      </OverlayTrigger>
                    ) : riesgo.factor_riesgo < 64 ? (
                      riesgo.planes_realizado.total_minimizacion == 0 &&
                      riesgo.planes_realizado.total_mitigacion == 0 ? (
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-edit">
                              Estrategia de mitigación o minimización necesaria.
                            </Tooltip>
                          }
                        >
                          <Figure.Image src={escudoRojo} />
                        </OverlayTrigger>
                      ) : (
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-edit">
                              No necesita realizarse ninguna acción.
                            </Tooltip>
                          }
                        >
                          <Figure.Image src={escudoVerde} />
                        </OverlayTrigger>
                      )
                    ) : riesgo.planes_realizado.total_contingencia == 0 ||
                      (riesgo.planes_realizado.total_minimizacion == 0 &&
                        riesgo.planes_realizado.total_mitigacion == 0) ? (
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-edit">
                            Estrategia de contingencia y de
                            mitigación/minimización necesaria.
                          </Tooltip>
                        }
                      >
                        <Figure.Image
                          src={escudoCritico}
                          style={false ? { cursor: "pointer" } : null}
                          onClick={() => {
                            if (false) {
                              navigate(
                                `/inicio/proyecto/${
                                  comprobacionLider ? "lider" : "desarrollador"
                                }/${id_proyecto}/riesgo/${riesgo.id_riesgo}-${
                                  riesgo.id_riesgo_local
                                }/plan/crear`
                              );
                            }
                          }}
                        />
                      </OverlayTrigger>
                    ) : (
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-edit">
                            No necesita realizarse ninguna acción.
                          </Tooltip>
                        }
                      >
                        <Figure.Image src={escudoVerde} />
                      </OverlayTrigger>
                    )}
                  </td>
                  <td className="td">
                    RK
                    {riesgo.id_riesgo_local < 10
                      ? `0${riesgo.id_riesgo_local}`
                      : riesgo.id_riesgo_local}
                  </td>
                  <td className="td">{riesgo.nombre_categoria}</td>
                  <td
                    style={{ maxWidth: "20em", textAlign: "justify" }}
                    className="td"
                  >
                    {riesgo.descripcion}
                  </td>
                  <td className="td" style={{ maxWidth: "8em" }}>
                    {riesgo.responsables}
                  </td>
                  <td className="td">
                    {riesgo.evaluado > 0 ? riesgo.factor_riesgo : null}
                  </td>
                  <td className="td">
                    <div className={`${comprobacionLider ? "" : "d-none"}`}>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-edit">Editar</Tooltip>}
                      >
                        <Button
                          variant="outline-warning"
                          disabled={false === null}
                          onClick={() => {
                            if (riesgo.factor_riesgo) {
                              setConfirmarEdicion({ confirmar: true, riesgo });
                            } else {
                              navigate(
                                `/inicio/proyecto/lider/${id_proyecto}/riesgo/modificar/${riesgo.id_riesgo}-${riesgo.id_riesgo_local}`
                              );
                            }
                          }}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-edit">Eliminar</Tooltip>}
                      >
                        <Button
                          style={{ marginLeft: "5px" }}
                          variant="outline-danger"
                          disabled={false === null}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                      </OverlayTrigger>
                    </div>
                    <br />
                    <div>
                      <OverlayTrigger
                        placement={comprobacionLider ? "bottom" : "top"}
                        overlay={<Tooltip id="tooltip-edit">Evaluar</Tooltip>}
                      >
                        <Button
                          variant="outline-primary"
                          disabled={iteracion === null || riesgo.evaluado > 0}
                          onClick={() => {
                            navigate(
                              `/inicio/proyecto/${
                                comprobacionLider ? "lider" : "desarrollador"
                              }/${id_proyecto}/riesgo/${riesgo.id_riesgo}-${
                                riesgo.id_riesgo_local
                              }/evaluacion/crear`
                            );
                          }}
                        >
                          <FontAwesomeIcon icon={faClipboardList} />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement={comprobacionLider ? "bottom" : "top"}
                        overlay={
                          <Tooltip id="tooltip-edit">Planificar</Tooltip>
                        }
                      >
                        <Button
                          style={{ marginLeft: "5px" }}
                          variant="outline-success"
                          disabled={
                            iteracion === null ||
                            riesgo.factor_riesgo < 9 ||
                            riesgo.evaluado <= 0
                          }
                          onClick={() => {
                            navigate(
                              `/inicio/proyecto/${
                                comprobacionLider ? "lider" : "desarrollador"
                              }/${id_proyecto}/riesgo/${riesgo.id_riesgo}-${
                                riesgo.id_riesgo_local
                              }/plan/crear`
                            );
                          }}
                        >
                          <FontAwesomeIcon icon={faNetworkWired} />
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal
            show={confirmarEdicion.confirmar}
            onHide={() => {
              setConfirmarEdicion({ confirmar: false, riesgo: null });
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>¿Está seguro?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                El riesgo posee evaluaciones y/o planes asociados. Si se realiza
                alguna modificación podría generarse una inconsistencia.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-success"
                onClick={() => {
                  navigate(
                    `/inicio/proyecto/lider/${id_proyecto}/riesgo/modificar/${confirmarEdicion.riesgo.id_riesgo}-${confirmarEdicion.riesgo.id_riesgo_local}`
                  );
                }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ marginRight: "5px" }}
                />
                Editar de todos modos
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => {
                  setConfirmarEdicion({ confirmar: false, riesgo: null });
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
