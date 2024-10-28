import React, { useState } from "react";
import Contenedor from "../../components/Contenedor";
import Footer from "./../../components/Footer";
import Navegador from "../../components/Navegador";
import { Alert, Button, Form } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { crearPerfil } from "../../services/usuarios";
import { useNavigate } from "react-router-dom";
import BotonSalir from "../../components/BotonSalir";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function CrearPerfil() {
  const permisos = useLoaderData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    permisos: [],
  });
  const [creado, setCreado] = useState(null);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevFormData) => {
      if (checked) {
        // Agrega el permiso si está seleccionado
        return {
          ...prevFormData,
          permisos: [...prevFormData.permisos, value],
        };
      } else {
        // Elimina el permiso si está desmarcado
        return {
          ...prevFormData,
          permisos: prevFormData.permisos.filter(
            (permiso) => permiso !== value
          ),
        };
      }
    });
  };

  const handleClick = async () => {
    const resultado = await crearPerfil(formData);
    setCreado(resultado);
  };

  if (creado === null) {
    return (
      <>
        <Navegador />
        <Contenedor>
          <>
            <h3>Crear Perfil</h3>
            <p>
              Complete los campos a continuaci&oacute;n. Luego, presione el
              bot&oacute;n <b>Confirmar</b>.<br />
              Si desea cancelar, presione el bot&oacute;n <b>Cancelar</b>.
            </p>
          </>
          <Form>
            <h4>Propiedades</h4>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del perfil"
                onChange={handleChange}
                name="nombre"
                value={formData.nombre}
              />
            </Form.Group>
            <hr />
            <h4>Permisos</h4>
            <Form.Group>
              {permisos.map((item, key) => (
                <Form.Check
                  key={key}
                  type="checkbox"
                  name="permiso"
                  label={item.nombre}
                  value={item.id_permiso}
                  onChange={handleCheckboxChange}
                />
              ))}
            </Form.Group>
          </Form>
          <>
            <Button
              variant="outline-success"
              className="mx-1"
              onClick={handleClick}
            >
              <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />
              Confirmar
            </Button>
            <Button
              variant="outline-danger"
              className="mx-1"
              onClick={() => {
                navigate("/inicio/perfiles");
              }}
            >
              <FontAwesomeIcon icon={faXmark} style={{ marginRight: "5px" }} />
              Cancelar
            </Button>
          </>
        </Contenedor>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navegador />
        <Contenedor>
          <h3>Crear Usuario</h3>
          <>
            {creado ? (
              <Alert variant="success">Operación realizada con éxito.</Alert>
            ) : (
              <Alert variant="danger">Ha ocurrido un error.</Alert>
            )}
            <hr />
            <h5>Opciones</h5>
            <BotonSalir ruta={"/inicio/perfiles"} />
          </>
        </Contenedor>
      </>
    );
  }
}
