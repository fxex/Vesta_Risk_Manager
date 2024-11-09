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
import { useUsuario } from "../../context/usuarioContext";

export default function ListaUsuarios() {
  const { usuario } = useUsuario();
  const usuarios = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <Navegador />
      <Contenedor>
        <h3>Usuarios</h3>
        <>
          <Button
            variant="success"
            onClick={() => {
              navigate("/inicio/usuario/crear");
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mx-1" />
            Nuevo usuario
          </Button>
          <Table size="sm" hover className="mt-2">
            <thead className="table-info">
              <tr>
                <th>Usuarios</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((item, key) => (
                <tr key={key}>
                  <td>
                    {item.nombre}
                    <br />
                    {item.email}
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      className="mx-1"
                      onClick={() => {
                        navigate(`/inicio/usuario/${item.id_usuario}`);
                      }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    <Button
                      variant="outline-warning"
                      className="mx-1"
                      onClick={() => {
                        navigate(
                          `/inicio/usuario/modificar/${item.id_usuario}`
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="mx-1"
                      disabled={usuario.email == item.email}
                      onClick={() => {
                        navigate(`/inicio/usuario/eliminar/${item.id_usuario}`);
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
