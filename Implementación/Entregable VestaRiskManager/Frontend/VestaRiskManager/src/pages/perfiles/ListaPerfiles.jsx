import React, { useState } from "react";
import Navegador from "../../components/Navegador";
import Footer from "../../components/Footer";
import Contenedor from "../../components/Contenedor";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

export default function ListaPerfiles() {
  const perfiles = useLoaderData();
  console.log(perfiles);

  const navigate = useNavigate();

  return (
    <>
      <Navegador />
      <Contenedor>
        <h3>Perfiles</h3>
        <>
          <Button
            variant="success"
            onClick={() => {
              navigate("/inicio/perfil/crear");
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mx-1" />
            Nuevo perfil
          </Button>
          <Table size="sm" hover className="mt-2">
            <thead className="table-info">
              <tr>
                <th>Perfiles</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {perfiles.map((item, key) => (
                <tr key={key}>
                  <td>{item.nombre}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      className="mx-1"
                      onClick={() => {
                        navigate(`/inicio/perfil/${item.id_perfil}`);
                      }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    <Button
                      variant="outline-warning"
                      className="mx-1"
                      disabled={item.nombre === "Administrador"}
                      onClick={() => {
                        navigate(`/inicio/perfil/modificar/${item.id_perfil}`);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="mx-1"
                      disabled={
                        item.nombre === "Administrador" ||
                        item.total_usuarios > 0
                      }
                      onClick={() => {
                        navigate(`/inicio/perfil/eliminar/${item.id_perfil}`);
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
