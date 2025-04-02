import React from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import { Card, Col, Container, Row } from "react-bootstrap";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { obtenerDatosRiesgos } from "../../../services/riesgos";
import { useLoaderData } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const dashboardLoader = async ({ params }) => {
  const datosRiesgos = await obtenerDatosRiesgos(params.id_proyecto);
  return {datosRiesgos};
};

export default function VerProyectoLider() {
  const {datosRiesgos} = useLoaderData()
  console.log(datosRiesgos);
  
  return (
    <>
      <NavegadorLider />
      <div
        style={{ minHeight: "70vh" }}
        className=""
      >
        {/* <Figure.Image src={Construccion}></Figure.Image> */}
        <Container className="mt-2 mx-0 d-flex flex-column justify-content-around">
        <Row className="d-flex flex-nowrap">
          <Col xs={8}>
            <Card style={{maxHeight:"50vh"}}>
              <Card.Header>
                Evolución de cantidad de riesgo
              </Card.Header>
              <Card.Body >
                <Bar data={{datasets:[
                  {
                    label:"Prueba",
                    data:[{x:"11/10/2025",y:20}, {x:"15/10/2025", y:40}]
                  }
                ]}} options={{
                  barThickness:20,
                  responsive:false
                }}
                width={650}
                height={200} 
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={5}>
            <Card>
              <Card.Header>
                Resumen de riesgos
              </Card.Header>
              <Card.Body>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="d-flex flex-nowrap">
          <Col xs={8}>
            <h2 className="text-center fs-4 my-2">Sobre el proyecto</h2>
            <Row className="mb-3">
              <Col xs={3}>
                <Card>
                  <Card.Header className="d-flex justify-content-center align-items-center" style={{minHeight:65}}>
                    Riesgos activos
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="text-center fs-1">{datosRiesgos.riesgos_activos}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={3}>
                <Card>
                  <Card.Header style={{minHeight:65, textAlign:"center"}}>
                   Evaluaciones pendientes 
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="text-center fs-1">{datosRiesgos.evaluaciones_pendientes}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={3}>
                <Card>
                  <Card.Header className="d-flex justify-content-center align-items-center" style={{minHeight:65}}>
                    Planes de acción
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="text-center fs-1">{datosRiesgos.planes_accion}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header className="d-flex justify-content-center align-items-center" style={{minHeight:65}}>
                    Requiere atencion
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="text-center fs-1">{datosRiesgos.riesgos_atencion}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xs={5}>
            <Card>
              <Card.Header>
                Matriz tongji
              </Card.Header>
              <Card.Body>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}
