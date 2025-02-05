import React, { useContext, useState } from "react";
import Contenedor from "../../components/Contenedor";
import Footer from "../../components/Footer";
import Navegador from "../../components/Navegador";
import { Alert, Button, Form } from "react-bootstrap";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import BotonSalir from "../../components/BotonSalir";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { verificarError } from "../../utils/verificarErrores";

export async function cargarModificarCategoria({ params }) {
  const categoria = await obtenerCategoriaId(params.id_usuario);
  return { categoria };
}

export default function ModificarCategoria() {
  const { categoria } = useCategoria();

  const { id_categoria } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: categoria.nombre_categoria,
    descripcion: categoria.descripcion,
  });
  const [error, setError] = useState({
    nombre: false,
    descripcion: false,
  });
  const [botonPresionado, setBotonPresionado] = useState(false);

  const [modificado, setModificado] = useState(null);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError({
      ...error,
      [name]: false,
    });
  };

  const handleClick = async () => {
    setBotonPresionado(true);
    const comprobarNombre =
      categoria.nombre_categoria == formData.nombre ||
      formData.nombre.length === 0
        ? false
        : await obtenerCategoriaNombre(formData.nombre);

    const comprobarDescripcion =
      categoria.descripcion == formData.categoria ||
      formData.categoria.length === 0 
        ? false
        : await obtenerCategoriaDescripcion(formData.descripcion);

    const comprobacionError = {
      nombre: formData.nombre.length === 0 || formData.nombre.length > 30,
      descripcion: formData.descripcion.length === 0,
      nombreIgual: comprobarNombre
    };

    setError(comprobacionError);
    const comprobacion = verificarError(comprobacionError);

    if (!comprobacion) {
      const resultado = await actualizarCategoria(id_categoria, formData);
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
            <h3>Actualizar Categor&iacute;a</h3>
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
                placeholder="Ingrese el nombre de la categoría"
                onChange={handleChange}
                name="nombre"
                value={formData.nombre}
                isInvalid={error.nombre || error.nombreIgual}
              />
              {(error.nombre || error.nombreIgual) && (
                <Form.Text className="text-danger">
                  Revise que el nombre{" "}
                  {formData.nombre.length === 0
                    ? "no este vacío"
                    : formData.nombre.length > 30
                    ? "no supere la longitud maxima (30 caracteres)"
                    : error.nombreIgual
                    ? "no sea igual al de otra categoría"
                    : null}
                  .
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripci&oacute;n</Form.Label>
              <Form.Control
                type="descripción"
                onChange={handleChange}
                placeholder="Ingrese la descripción de la categoría"
                name="descripción"
                value={formData.descripcion}
                isInvalid={error.descripcion || error.descripcionIgual}
              />
              {(error.descripcion || error.descripcionIgual) && (
                <Form.Text className="text-danger">
                  Revise que la descripci&oacute;n{" "}
                  {formData.descripcion.length === 0
                    ? "no este vacia"
                    : null}
                  .
                </Form.Text>
              )}
            </Form.Group>
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
                navigate("/inicio/categorias");
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
          <h3>Actualizar Categor&iacute;a</h3>
          <>
            {modificado ? (
              <Alert variant="success">Operaci&oacute;n realizada con &eacute;xito.</Alert>
            ) : (
              <Alert variant="danger">Ha ocurrido un error.</Alert>
            )}
            <hr />
            <h5>Opciones</h5>
            <BotonSalir ruta={"/inicio/categorias"} />
          </>
        </Contenedor>
      </>
    );
  }
}
