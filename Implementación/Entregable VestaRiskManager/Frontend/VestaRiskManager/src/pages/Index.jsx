import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { GoogleLogin } from "@react-oauth/google";
import Contenedor from "../components/Contenedor";
import Navegador from "../components/Navegador";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { obtenerUsuariosCorreo } from "../services/usuarios";
import { useUsuario } from "../context/usuarioContext";

export default function Index() {
  const [error, setError] = useState(false);
  const { iniciarSesion } = useUsuario();
  const navigation = useNavigate();

  return (
    <>
      <Navegador />
      <Contenedor>
        <h3>Vesta Risk Manager - Login</h3>
        <>
          <h5>Bienvenido</h5>
          <p>
            Estimado usuario: Bienvenido a la aplicaci&oacute;n Vesta Risk
            Manager, una aplicaci&oacute;n desarrollada en la UARG - UNPA.
          </p>
          <Alert variant="danger">
            <strong>Importante:</strong> Para acceder al sistema es necesario
            disponer de un correo de{" "}
            <a href="http://www.gmail.com" target="_blank">
              Gmail
            </a>
          </Alert>
          <hr />
          <h5>Ingreso al Sistema</h5>
          <p>
            Ud. puede ingresar el sistema si est&aacute; conectado a su e-mail.
            Por favor haga click en el bot&oacute;n a continuaci&oacute;n y
            elija su cuenta o realice el login.
          </p>
          {error && (
            <Alert variant="danger">
              Usuario ingresado no registrado. Solicite ser registrado por un
              administrador del sistema e intentelo de nuevo.
            </Alert>
          )}
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decode = jwtDecode(credentialResponse.credential);
              obtenerUsuariosCorreo(decode.email).then((item) => {
                if (item.validacion) {
                  localStorage.setItem("jwt", credentialResponse.credential);
                  iniciarSesion(
                    item.datos.nombre_usuario,
                    item.datos.email,
                    item.datos.nombre_perfil
                  );
                  navigation("/inicio");
                  setError(false);
                } else {
                  setError(true);
                }
              });
            }}
            onError={() => {
              setError(true);
            }}
          />
        </>
      </Contenedor>
      {/* <Container className="pt-4 pb-5">
        <Card>
          <Card.Header>
            <h3>Vesta Risk Manager - Login</h3>
          </Card.Header>
          <Card.Body>
            <h5>Bienvenido</h5>
            <p>
              Estimado usuario: Bienvenido a la aplicaci&oacute;n Vesta Risk
              Manager, una aplicaci&oacute;n desarrollada en la UARG - UNPA.
            </p>
            <Alert variant="danger">
              <strong>Importante:</strong> Para acceder al sistema es necesario
              disponer de un correo de{" "}
              <a href="http://www.gmail.com" target="_blank">
                Gmail
              </a>
            </Alert>
            <hr />
            <h5>Ingreso al Sistema</h5>
            <p>
              Ud. puede ingresar el sistema si est&aacute; conectado a su
              e-mail. Por favor haga click en el bot&oacute;n a
              continuaci&oacute;n y elija su cuenta o realice el login.
            </p>
            {error && (
              <Alert variant="danger">
                Usuario ingresado no registrado. Solicite ser registrado por un
                administrador del sistema e intentelo de nuevo.
              </Alert>
            )}
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </Card.Body>
        </Card>
      </Container> */}
      <Footer></Footer>
    </>
  );
}
