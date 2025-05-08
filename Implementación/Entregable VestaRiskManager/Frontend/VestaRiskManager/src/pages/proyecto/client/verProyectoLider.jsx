import React from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import { Card, Col, Container, Row } from "react-bootstrap";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';
import { obtenerDatosRiesgos } from "../../../services/riesgos";
import { useLoaderData } from "react-router-dom";
import MantrizTonji from "../../../components/MatrizTonji";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
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
  const {datos_proyecto, iteraciones, categorias, datos_evaluacion} = datosRiesgos;
  const ultimasIteraciones = (iteraciones??[]).map(item=>item.nombre).reverse()
  
  const categoriasProyecto = categorias??[].map(item=>item.nombre)
  const datos_evaluacion_reversa = [...datos_evaluacion??[]].reverse()
  const datos_bajo = datos_evaluacion_reversa.map(item=>{
    return item[0].cantidad 
  })

  const datos_medio = datos_evaluacion_reversa.map(item=>{
    return item[1].cantidad 
  })

  const datos_alto = datos_evaluacion_reversa.map(item=>{
    return item[2].cantidad 
  })

  const datos_critico = datos_evaluacion_reversa.map(item=>{
    return item[3].cantidad 
  })
  
  return (
    <>
      <NavegadorLider />
      <div
        style={{ minHeight: "70vh" }}
        className=""
      >
        {/* <Figure.Image src={Construccion}></Figure.Image> */}
        <Container className="mt-2 mx-0 d-flex flex-column justify-content-around">
        <Row className="d-flex flex-nowrap mb-5" style={{height:"50vh"}}>
          <Col xs={9}>
            <Card style={{maxHeight:"50vh"}}>
              <Card.Header>
                Evolución de cantidad de riesgo
              </Card.Header>
              <Card.Body >
                <Bar data={
                  {
                    labels:ultimasIteraciones,
                    datasets:[
                      {
                        label:"Irrelevantes",
                        data:datos_bajo,
                        backgroundColor: '#2ecc71'
                      },
                      {
                        label:"Necesitan reevaluación",
                        data:datos_medio,
                        backgroundColor: '#f1c40f'
                      },
                      {
                        label:"Necesitan planificación",
                        data:datos_alto,
                        backgroundColor: '#f39c12'
                      },
                      {
                        label:"Criticos",
                        data:datos_critico,
                        backgroundColor: '#e74c3c'
                      }
                    ]
                  }
                } 
                options={{
                  barThickness:20,
                  responsive:false,
                  plugins:{
                    legend:{
                      position:"right",
                      reverse:true
                    }
                  },
                  scales:{
                    x:{
                      stacked:true,
                      title:{
                        display:true,
                        text:"Iteraciones"
                      }
                    },
                    y:{
                      stacked:true,
                      beginAtZero:true,
                      title:{
                        display:true,
                        text:"Cantidad de riesgos"
                      }
                    }
                  }
                }}
                width={720}
                height={200} 
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={5}>
            <Card style={{maxHeight:"55vh"}}>
              <Card.Header>
                Resumen de riesgos
              </Card.Header>
              <Card.Body>
                <Radar data={
                  {
                    labels: categoriasProyecto,
                    datasets: [
                      {
                        data: [80, 90, 70, 85, 75, 95], // Valores en cada eje
                        backgroundColor: "#2A6EBB ",
                      },
                    ]
                  }
                }
                options={{
                  responsive:false,
                  plugins:{
                    legend:{display:false},
                    tooltip:{enabled:false}
                  },
                  scales:{
                    r:{
                      ticks:{
                        display:false
                      },
                    }
                  }
                }} 
                height={250} width={400} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="d-flex flex-nowrap">
          <Col xs={9}>
            <h2 className="text-center fs-4" style={{position:"absolute", top:"66%" ,left:"25%", textDecoration:"underline"}}>Sobre el proyecto</h2>
            <Row className="mb-3">
              <Col xs={3}>
                <Card>
                  <Card.Header className="d-flex justify-content-center align-items-center" style={{minHeight:65}}>
                    Riesgos activos
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="text-center fs-1">{datos_proyecto?.riesgos_activos??0}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={3}>
                <Card>
                  <Card.Header style={{minHeight:65, textAlign:"center"}}>
                   Evaluaciones pendientes 
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="text-center fs-1">{datos_proyecto?.evaluaciones_pendientes??0}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={3}>
                <Card>
                  <Card.Header className="d-flex justify-content-center align-items-center" style={{minHeight:65}}>
                    Planes de acción
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="text-center fs-1">{datos_proyecto?.planes_accion??0}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header className="d-flex justify-content-center align-items-center" style={{minHeight:65}}>
                    Requiere atención
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="text-center fs-1">{datos_proyecto?.riesgos_atencion??0}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xs={5}>
            <Card style={{maxHeight:"65vh"}}>
              <Card.Header>
                Matriz tongji
              </Card.Header>
              <Card.Body>
                <MantrizTonji />
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