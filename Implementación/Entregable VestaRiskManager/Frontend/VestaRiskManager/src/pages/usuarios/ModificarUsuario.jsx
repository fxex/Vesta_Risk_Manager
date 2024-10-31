import React, { useState } from "react";
import Contenedor from "../../components/Contenedor";
import Footer from "./../../components/Footer";
import Navegador from "../../components/Navegador";
import { Alert, Button, Form } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import {
  actualizarUsuario,
  obtenerPerfiles,
  obtenerUsuariosCorreo,
  obtenerUsuariosId,
  obtenerUsuariosNombre,
} from "../../services/usuarios";
import { useNavigate, useParams } from "react-router-dom";
import BotonSalir from "../../components/BotonSalir";
import { useUsuario } from "../../context/usuarioContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { verificarCorreo } from "../../utils/verificarCorreo";

export async function cargarModificarUsuario({ params }) {
  const usuario = await obtenerUsuariosId(params.id_usuario);
  const perfiles = await obtenerPerfiles();
  return { usuarioLoader: usuario, perfiles };
}

export default function ModificarUsuario() {
  const { usuario } = useUsuario();
  const { usuarioLoader, perfiles } = useLoaderData();
  const { id_usuario } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: usuarioLoader.nombre_usuario,
    correo: usuarioLoader.email,
    perfil: usuarioLoader.id_perfil,
  });
  const [error, setError] = useState({
    nombre: false,
    correo: false,
    perfil: false,
    nombreIgual: false,
    correoIgual: false,
  });
  const [botonPresionado, setBotonPresionado] = useState(false);

  const [modificado, setModificado] = useState(null);

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
      usuarioLoader.nombre_usuario == formData.nombre ||
      formData.nombre.length === 0
        ? false
        : await obtenerUsuariosNombre(formData.nombre);

    const comprobarCorreoBD =
      usuarioLoader.email == formData.correo ||
      formData.correo.length === 0 ||
      !verificarCorreo(formData.correo)
        ? { validacion: false }
        : await obtenerUsuariosCorreo(formData.correo);

    console.log(
      usuarioLoader.nombre_usuario == formData.nombre &&
        formData.nombre.length === 0
    );

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
      const resultado = await actualizarUsuario(id_usuario, formData);
      setModificado(resultado);
    }
    setBotonPresionado(false);
  };

  if (modificado === null) {
    return (
      <>
        <Navegador />
        <Contenedor>
          <>
            <h3>Actualizar Usuario</h3>
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
                disabled={usuario.email === usuarioLoader.email}
                placeholder="Ingrese el correo del usuario"
                name="correo"
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
                  disabled={usuario.email == usuarioLoader.email}
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
          <h3>Actualizar Usuario</h3>
          <>
            {modificado ? (
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
