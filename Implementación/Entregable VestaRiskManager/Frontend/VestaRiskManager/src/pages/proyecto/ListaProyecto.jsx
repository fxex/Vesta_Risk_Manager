import React, { useEffect, useState } from "react";
import Navegador from "../../components/Navegador";
import Footer from "../../components/Footer";
import { useLoaderData, useNavigate } from "react-router-dom";
import Contenedor from "../../components/Contenedor";
import "./../../styles/Home.css";
import { Alert, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

export default function ListaProyecto() {
  const navigate = useNavigate();
  const proyectos = useLoaderData();
  const location = useLocation();

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (location.state?.mensaje) {
      setMensaje(location.state.mensaje);

      // Limpiar el mensaje después de unos segundos
      const timeoutId = setTimeout(() => {
        setMensaje("");
      }, 3000); // Mostrar el mensaje durante 3 segundos

      // Limpiar el timeout si el componente se desmonta
      return () => clearTimeout(timeoutId);
    }
  }, [location.state]);

  return (
    <>
      <Navegador />
      {mensaje ? (
        <Alert variant="success" className="text-center fs-4">
          {mensaje}
        </Alert>
      ) : null}
      <Contenedor>
        <h3>Proyectos</h3>
        <div style={{ minHeight: "40vh" }}>
          {proyectos.map((item, key) => (
            <Button
              key={key}
              className="w-100 d-flex justify-content-between align-items-center py-3 mb-2 boton_proyecto"
            >
              {item.nombre}
              <div className="w-25 d-flex justify-content-end gap-1 align-items-center">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="fw-bold fs-3 me-2 icono"
                  onClick={() => {
                    navigate(`/inicio/proyecto/modificar/${item.id_proyecto}`);
                  }}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="fw-bold fs-3 me-2 icono"
                  onClick={() => {
                    navigate(`/inicio/proyecto/${item.id_proyecto}`);
                  }}
                />
              </div>
            </Button>
          ))}
        </div>
      </Contenedor>
      <Footer />
    </>
  );
}
