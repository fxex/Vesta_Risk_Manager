import React from "react";
import Navegador from "../../components/Navegador";
import Footer from "../../components/Footer";
import Contenedor from "../../components/Contenedor";
import { useLoaderData } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ListaCategorias() {
  const categorias = useLoaderData();

  const navigate = useNavigate();

  return (
    <>
      <Navegador />
      <Contenedor>
        <h3>Categorias</h3>
        <>
          <Button
            variant="success"
            onClick={() => {
              navigate("/inicio/categoria/crear");
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mx-1" />
            Nueva categoria
          </Button>
          <Table size="sm" hover className="mt-2">
            <thead className="table-info">
              <tr>
                <th className="text-center">Nombre</th>
                <th className="text-center">Descripción</th>
                <th className="text-center" style={{ minWidth: "12em" }}>
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((item, key) => (
                <tr key={key}>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion}</td>
                  <td style={{ minWidth: "12em", textAlign: "center" }}>
                    <Button
                      variant="outline-primary"
                      className="mx-1"
                      onClick={() => {
                        navigate(`/inicio/categoria/${item.id_categoria}`);
                      }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    <Button
                      variant="outline-warning"
                      className="mx-1"
                      onClick={() => {
                        navigate(
                          `/inicio/categoria/modificar/${item.id_categoria}`
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="mx-1"
                      disabled={null}
                      onClick={() => {
                        navigate(
                          `/inicio/categoria/eliminar/${item.id_categoria}`
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
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
