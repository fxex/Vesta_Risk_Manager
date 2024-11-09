import React from "react";
import Contenedor from "../../components/Contenedor";
import NavegadorLider from "../../components/NavegadorLider";
import Footer from "../../components/Footer";
import {
  Button,
  Figure,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNetworkWired,
  faPenToSquare,
  faPlus,
  faTrashCan,
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

export const riesgoLoader = async ({ params }) => {
  const riesgos = await obtenerRiesgosProyecto(params.id_proyecto);
  riesgos.map((item, key) => {
    item.id_riesgo_local = key + 1;
  });

  const iteracion = await obtenerIteracionActual(params.id_proyecto);

  return { riesgos, iteracion };
};

export default function ListaRiesgos() {
  const { id_proyecto } = useParams();
  const { riesgos, iteracion } = useLoaderData();

  const location = useLocation();

  const navigate = useNavigate();
  const comprobacionLider = location.pathname.includes("lider");
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));

  return (
    <>
      <NavegadorLider />
      <Contenedor>
        <>
          <h3>{proyecto.nombre}</h3>
          {iteracion.nombre ? <h4>{iteracion.nombre}</h4> : null}
        </>
        <>
          <Button
            variant="success"
            onClick={() => {
              navigate(
                `/inicio/proyecto/${
                  comprobacionLider ? "lider" : "desarrollador"
                }/${id_proyecto}/riesgo/crear`
              );
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mx-1" />
            Nuevo Riesgo
          </Button>
          <Table size="sm" hover className="mt-2" bordered>
            <thead className="cabecera">
              <tr>
                <th style={{ minWidth: "4em" }} className="th"></th>
                <th className="th">ID</th>
                <th className="th">Categoria</th>
                <th className="th">Descripción</th>
                <th style={{ maxWidth: "2em" }} className="th">
                  Responsable
                </th>
                <th style={{ maxWidth: "5em" }} className="th">
                  Factor de riesgo
                </th>
                <th className="th">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {riesgos.map((riesgo, key) => (
                <tr key={key} style={{ textAlign: "center" }}>
                  <td className="td" style={{}}>
                    {riesgo.factor_riesgo === null ? (
                      <Figure.Image src={escudoAmarillo}></Figure.Image>
                    ) : riesgo.factor_riesgo < 9 ? (
                      <Figure.Image src={escudoGris}></Figure.Image>
                    ) : riesgo.factor_riesgo < 36 ? (
                      <Figure.Image src={escudoAzul}></Figure.Image>
                    ) : riesgo.factor_riesgo < 64 ? (
                      <Figure.Image src={escudoRojo}></Figure.Image>
                    ) : (
                      <Figure.Image src={escudoCritico}></Figure.Image>
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
                  <td className="td">
                    {riesgo.responsables.map((riesgo) => (
                      <>
                        {riesgo.nombre} <br />
                      </>
                    ))}
                  </td>
                  <td className="td">{riesgo.factor_riesgo}</td>
                  <td className="td">
                    <div className={`${comprobacionLider ? "" : "d-none"}`}>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-edit">Editar</Tooltip>}
                      >
                        <Button
                          variant="outline-warning"
                          disabled={iteracion === null}
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
                          disabled={iteracion === null}
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
                          disabled={iteracion === null || riesgo.evaluado}
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
                          disabled={iteracion === null}
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
        </>
      </Contenedor>
      <Footer />
    </>
  );
}
