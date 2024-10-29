import React, { useState } from "react";
import Contenedor from "../../components/Contenedor";
import Footer from "./../../components/Footer";
import Navegador from "../../components/Navegador";
import { Alert, Button, Form } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import {
  actualizarUsuario,
  obtenerPerfiles,
  obtenerUsuariosId,
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
  const [error, setError] = useState(false);
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
    if (
      formData.nombre.length === 0 ||
      formData.correo.length === 0 ||
      !verificarCorreo(formData.correo) ||
      formData.perfil == null ||
      formData.perfil < 1
    ) {
      setError(true);
    } else {
      setBotonPresionado(true);
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
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                disabled={usuario.email === usuarioLoader.email}
                placeholder="Ingrese el correo del usuario"
                name="correo"
                onChange={handleChange}
                value={formData.correo}
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
            {error && (
              <Alert variant="danger" className="mt-4">
                Revise los campos ingresados
              </Alert>
            )}
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
