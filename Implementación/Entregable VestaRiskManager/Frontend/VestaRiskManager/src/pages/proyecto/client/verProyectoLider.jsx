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

// Datos de prueba
const datosPrueba = {
  datos_proyecto: {
    riesgos_activos: 12,
    evaluaciones_pendientes: 3,
    planes_accion: 5,
    riesgos_atencion: 7
  },
  iteraciones: [
    { nombre: "Iteración 1" },
    { nombre: "Iteración 2" },
    { nombre: "Iteración 3" },
    { nombre: "Iteración 4" }
  ],
  categorias: [
    { nombre: "Técnico" },
    { nombre: "Gestión" },
    { nombre: "Comercial" },
    { nombre: "Externo" },
    { nombre: "Organizacional" },
    { nombre: "Calidad" }
  ],
  datos_evaluacion: [
    [
      { nivel: "Bajo", cantidad: 5 },
      { nivel: "Medio", cantidad: 8 },
      { nivel: "Alto", cantidad: 3 },
      { nivel: "Crítico", cantidad: 2 }
    ],
    [
      { nivel: "Bajo", cantidad: 6 },
      { nivel: "Medio", cantidad: 7 },
      { nivel: "Alto", cantidad: 4 },
      { nivel: "Crítico", cantidad: 3 }
    ],
    [
      { nivel: "Bajo", cantidad: 8 },
      { nivel: "Medio", cantidad: 6 },
      { nivel: "Alto", cantidad: 3 },
      { nivel: "Crítico", cantidad: 1 }
    ],
    [
      { nivel: "Bajo", cantidad: 2 },
      { nivel: "Medio", cantidad: 8 },
      { nivel: "Alto", cantidad: 6 },
      { nivel: "Crítico", cantidad: 4 }
    ]
  ]
};

export const dashboardLoader = async ({ params }) => {
  //Para la funcionalidad descomentar esto -> const datosRiesgos = await obtenerDatosRiesgos(params.id_proyecto);
  return { datosRiesgos: datosPrueba };
};

export default function VerProyectoLider() {
  //Para la funcionalidad descomentar esto -> const {datosRiesgos} = useLoaderData();
  const datosRiesgos = datosPrueba;
  //A partir de acá no cmabie nada, solo agregué la matriz
  const {datos_proyecto, iteraciones, categorias, datos_evaluacion} = datosRiesgos;
  const ultimasIteraciones = iteraciones.map(item=>item.nombre).reverse();
  const categoriasProyecto = categorias.map(item=>item.nombre);
  const datos_evaluacion_reversa = [...datos_evaluacion].reverse();
  const datos_bajo = datos_evaluacion_reversa.map(item=>{
    return item[0].cantidad 
  });

  const datos_medio = datos_evaluacion_reversa.map(item=>{
    return item[1].cantidad 
  });

  const datos_alto = datos_evaluacion_reversa.map(item=>{
    return item[2].cantidad 
  });

  const datos_critico = datos_evaluacion_reversa.map(item=>{
    return item[3].cantidad 
  });
    
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
                    <Card.Text className="text-center fs-1">{datos_proyecto.riesgos_activos}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={3}>
                <Card>
                  <Card.Header style={{minHeight:65, textAlign:"center"}}>
                   Evaluaciones pendientes 
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="text-center fs-1">{datos_proyecto.evaluaciones_pendientes}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={3}>
                <Card>
                  <Card.Header className="d-flex justify-content-center align-items-center" style={{minHeight:65}}>
                    Planes de acción
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="text-center fs-1">{datos_proyecto.planes_accion}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header className="d-flex justify-content-center align-items-center" style={{minHeight:65}}>
                    Requiere atención
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="text-center fs-1">{datos_proyecto.riesgos_atencion}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xs={5}>
          <Card>
            <Card.Header>
              Matriz Tongji
            </Card.Header>
            <Card.Body className="p-2">
              <div className="table-responsive">
                <table className="table table-bordered text-center align-middle table-sm mb-0"
                style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}>
                  <thead>
                    <tr>
                      <th rowSpan="2" style={{ verticalAlign: "middle", width: "90px" }}>Probabilidad</th>
                      <th colSpan="4" style={{ fontWeight: "bold" }}>Impacto</th>
                    </tr>
                    <tr>
                      <th style={{ width: "100px" }}>Bajo</th>
                      <th style={{ width: "100px" }}>Moderado</th>
                      <th style={{ width: "100px" }}>Significante</th>
                      <th style={{ width: "100px" }}>Alto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Alto</th>
                      <td style={{ 
                          backgroundColor: "#ff9966", 
                          width: "45px", 
                          height: "45px",
                          aspectRatio: "1",
                          padding: 0,
                          lineHeight: 1,
                          verticalAlign: "middle"
                      }}></td>
                      <td style={{ 
                        backgroundColor: "#ff5252", 
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                      <td style={{ 
                        backgroundColor: "#ff5252", 
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                      <td style={{ 
                        backgroundColor: "#ff5252", 
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                    </tr>
                    <tr>
                      <th>Significante</th>
                      <td style={{ 
                        backgroundColor: "#ffff66", 
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                      <td style={{ 
                        backgroundColor: "#ff9966", 
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                      <td style={{ 
                        backgroundColor: "#ff9966", 
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                      <td style={{ 
                        backgroundColor: "#ff5252", 
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                    </tr>
                    <tr>
                      <th>Moderado</th>
                      <td style={{ 
                        backgroundColor: "#66cc66", 
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                      <td style={{ 
                        backgroundColor: "#ffff66", //amarillo
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                      <td style={{ 
                        backgroundColor: "#ffff66",
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                      <td style={{ 
                        backgroundColor: "#ff9966", 
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                    </tr>
                    <tr>
                      <th>Bajo</th>
                      <td style={{ 
                        backgroundColor: "#66cc66", 
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                      <td style={{ 
                        backgroundColor: "#66cc66", 
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                      <td style={{ 
                        backgroundColor: "#66cc66", 
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                      <td style={{ 
                        backgroundColor: "#ffff66", 
                        width: "45px", 
                        height: "45px",
                        aspectRatio: "1",
                        padding: 0,
                        lineHeight: 1,
                        verticalAlign: "middle"
                        }}></td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
