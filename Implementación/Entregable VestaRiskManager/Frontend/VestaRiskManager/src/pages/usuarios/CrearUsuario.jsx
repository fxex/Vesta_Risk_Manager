import React, { useState } from "react";
import Contenedor from "../../components/Contenedor";
import Footer from "./../../components/Footer";
import Navegador from "../../components/Navegador";
import { Alert, Button, Form } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import {
  crearUsuario,
  obtenerUsuariosCorreo,
  obtenerUsuariosNombre,
} from "../../services/usuarios";
import { useNavigate } from "react-router-dom";
import BotonSalir from "../../components/BotonSalir";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { verificarCorreo } from "../../utils/verificarCorreo";

export default function CrearUsuario() {
  const perfiles = useLoaderData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    perfil: 1,
  });
  const [creado, setCreado] = useState(null);
  const [error, setError] = useState({
    nombre: false,
    correo: false,
    perfil: false,
    nombreIgual: false,
    correoIgual: false,
  });
  const [botonPresionado, setBotonPresionado] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    setBotonPresionado(true);
    const comprobarNombre =
      formData.nombre.length === 0
        ? false
        : await obtenerUsuariosNombre(formData.nombre);

    const comprobarCorreoBD =
      formData.correo.length === 0 || !verificarCorreo(formData.correo)
        ? { validacion: false }
        : await obtenerUsuariosCorreo(formData.correo);

    const comprobacionError = {
      nombre: formData.nombre.length === 0,
      correo: formData.correo.length === 0 || !verificarCorreo(formData.correo),
      perfil: formData.perfil == null || formData.perfil < 1,
      nombreIgual: comprobarNombre,
      correoIgual: comprobarCorreoBD.validacion,
    };

    setError(comprobacionError);
    let comprobacion = false;
    Object.values(comprobacionError);
    for (const valor of Object.values(comprobacionError)) {
      if (valor) {
        comprobacion = valor;
        break;
      }
    }

    if (!comprobacion) {
      const resultado = await crearUsuario(formData);
      setCreado(resultado);
    }
    setBotonPresionado(false);
  };

  if (creado === null) {
    return (
      <>
        <Navegador />
        <Contenedor>
          <>
            <h3>Crear Usuario</h3>
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
                placeholder="Ingrese el nombre del usuario"
                onChange={handleChange}
                name="nombre"
                value={formData.nombre}
                style={
                  error.nombre
                    ? { outline: "2px solid rgba(255, 0, 0, 0.5)" }
                    : null
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese el correo del usuario"
                name="correo"
                onChange={handleChange}
                value={formData.correo}
                style={
                  error.correo
                    ? { outline: "2px solid rgba(255, 0, 0, 0.5)" }
                    : null
                }
              />
            </Form.Group>
            <hr />
            <h4>Perfiles</h4>
            <Form.Group>
              {perfiles.map((item, key) => (
                <Form.Check
                  key={key}
                  type="radio"
                  name="perfil"
                  label={item.nombre}
                  value={item.id_perfil}
                  checked={item.id_perfil == formData.perfil}
                  onChange={handleChange}
                />
              ))}
            </Form.Group>
            {error.correoIgual || error.nombreIgual ? (
              <Alert variant="danger">
                El usuario no puede poseer el mismo{" "}
                {error.nombreIgual ? "nombre" : ""}{" "}
                {error.correoIgual && error.nombreIgual ? "y " : ""}
                {error.correoIgual ? "correo" : ""}
              </Alert>
            ) : null}
          </Form>
          <>
            <Button
              variant="outline-success"
              className="mx-1"
              onClick={handleClick}
              disabled={botonPresionado}
            >
              <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />
              Confirmar
            </Button>
            <Button
              variant="outline-danger"
              className="mx-1"
              onClick={() => {
                navigate("/inicio/usuarios");
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
            <BotonSalir ruta={"/inicio/usuarios"} />
          </>
        </Contenedor>
      </>
    );
  }
}
