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
          <h4>{iteracion.nombre}</h4>
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
              {riesgos.map((item, key) => (
                <tr key={key} style={{ textAlign: "center" }}>
                  <td className="td">
                    {item.factor_riesgo === null ? (
                      <Figure.Image src={escudoAmarillo}></Figure.Image>
                    ) : item.factor_riesgo < 9 ? (
                      <Figure.Image src={escudoGris}></Figure.Image>
                    ) : item.factor_riesgo < 36 ? (
                      <Figure.Image src={escudoAzul}></Figure.Image>
                    ) : item.factor_riesgo < 64 ? (
                      <Figure.Image src={escudoRojo}></Figure.Image>
                    ) : null}
                  </td>
                  <td className="td">
                    RK
                    {item.id_riesgo_local < 10
                      ? `0${item.id_riesgo_local}`
                      : item.id_riesgo_local}
                  </td>
                  <td className="td">{item.nombre_categoria}</td>
                  <td
                    style={{ maxWidth: "20em", textAlign: "justify" }}
                    className="td"
                  >
                    {item.descripcion}
                  </td>
                  <td className="td">
                    {item.responsables.map((item) => (
                      <>
                        {item.nombre} <br />
                      </>
                    ))}
                  </td>
                  <td className="td">{item.factor_riesgo}</td>
                  <td className="td">
                    <div className={`${comprobacionLider ? "" : "d-none"}`}>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-edit">Editar</Tooltip>}
                      >
                        <Button variant="outline-warning">
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
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                      </OverlayTrigger>
                    </div>
                    <br />
                    <div>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id="tooltip-edit">Evaluar</Tooltip>}
                      >
                        <Button
                          variant="outline-primary"
                          onClick={() => {
                            navigate(
                              `/inicio/proyecto/${
                                comprobacionLider ? "lider" : "desarrollador"
                              }/${id_proyecto}/riesgo/${item.id_riesgo}-${
                                item.id_riesgo_local
                              }/evaluacion/crear`
                            );
                          }}
                        >
                          <FontAwesomeIcon icon={faClipboardList} />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="tooltip-edit">Planificar</Tooltip>
                        }
                      >
                        <Button
                          style={{ marginLeft: "5px" }}
                          variant="outline-success"
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
