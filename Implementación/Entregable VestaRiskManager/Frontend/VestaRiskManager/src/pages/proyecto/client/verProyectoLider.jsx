import React, { useRef } from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";

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
import { useLoaderData } from "react-router-dom";
import MantrizTonji from "../../../components/MatrizTonji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/BotonDescarga.css";
import { useUsuario } from "../../../context/usuarioContext";

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

export default function VerProyectoLider() {
  const grafico_evolucion = useRef(null)
  const grafico_resumen = useRef(null)
  const grafico_matriz = useRef(null)
  const {datosRiesgos, iteracion} = useLoaderData()
  const {datos_proyecto, iteraciones, categorias, datos_evaluacion, evaluacion_tongji, datos_telaraña} = datosRiesgos;  
  
  const ultimasIteraciones = (iteraciones??[]).map(item=>item.nombre).reverse()
  
  const categoriasProyecto = (categorias??[]).map(item=>item.nombre)
  const datosTelarañaFormateados = (datos_telaraña??[]).map(item=>item.total_riesgo)
  

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

  const puntos = evaluacion_tongji.map(item => ({ x: parseInt(item.x), y: parseInt(item.y), label: item.label > 9 ? `RK${item.label}` : `RK0${item.label}`}));

  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));


  const descargarGraficoEvolucion = () => {
    const url = grafico_evolucion.current.toBase64Image();
    const link = document.createElement('a');
    link.href = url;
    link.download = `grafico_evolucion_${proyecto.nombre}.png`;
    link.click();
  }

  const descargarGraficoTelaraña = () => {
    const url = grafico_resumen.current.toBase64Image();
    const link = document.createElement('a');
    link.href = url;
    link.download = `grafico_telaraña_${proyecto.nombre}.png`;
    link.click();
  }

  const descargarMatrizTongji = () => {
    const url = grafico_matriz.current.getScatterRef().toBase64Image();
    const link = document.createElement('a');
    link.href = url;
    link.download = `grafico_matriz_tongji_${proyecto.nombre}.png`;
    link.click();
  }

  const {usuario} = useUsuario()
  const comprobacionEspectador = usuario.perfil === "Espectador" || usuario.perfil === "Administrador";
  
  return (
    <>
      <NavegadorLider />
      {comprobacionEspectador ? (
        <Alert variant="primary" className="text-center">
          Usted es espectador del proyecto {proyecto.nombre}. Sólo se permite la visualización.
        </Alert>
      ) : null}
      {iteracion === null ? (
        <Alert variant="danger" className="text-center">
          No existe una iteración activa del proyecto. Sólo se permite
          visualizar.
        </Alert>
      ) : null}
      <>
        <Container className="mt-2 mx-0 d-flex flex-column justify-content-around">
        <Row className="d-flex flex-nowrap mb-5" style={{height:"50vh"}}>
          <Col xs={9}>
            <Card style={{maxHeight:"50vh"}}>
              <Card.Header className="d-flex justify-content-between align-items-center">
                Evolución de cantidad de riesgo
                {!comprobacionEspectador && <FontAwesomeIcon icon={faDownload} className="descargar" onClick={descargarGraficoEvolucion}/>}
              </Card.Header>
              <Card.Body >
                <Bar
                ref={grafico_evolucion} 
                data={
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
                        label:"Críticos",
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
          <Col xs={5} style={{width:"40%"}}>
            <Card style={{maxHeight:"55vh"}}>
              <Card.Header className="d-flex justify-content-between align-items-center">
                Resúmen de riesgos
                {!comprobacionEspectador && <FontAwesomeIcon icon={faDownload} className="descargar" onClick={descargarGraficoTelaraña}/>}
              </Card.Header>
              <Card.Body>
                <Radar 
                ref={grafico_resumen}
                data={
                  {
                    labels: categoriasProyecto,
                    datasets: [
                      {
                        data: datosTelarañaFormateados,
                        backgroundColor: "#2A6EBB",
                        fill:true,
                        borderColor: "#2A6EBB",
                        pointBackgroundColor: "#2A6EBB",
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
                      min:0,
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
            <h2 className="text-center fs-4" style={{position:"absolute", top:(iteracion && !comprobacionEspectador) ?"60%":"70%" ,left:"25%", textDecoration:"underline"}}>Sobre el proyecto</h2>
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
          <Col xs={5} style={{width:"40%"}}>
            <Card style={{maxHeight:"65vh"}}>
              <Card.Header className="d-flex justify-content-between align-items-center">
                Matriz tongji
                {!comprobacionEspectador && <FontAwesomeIcon icon={faDownload} className="descargar" onClick={descargarMatrizTongji}/>}
              </Card.Header>
              <Card.Body>
                <MantrizTonji puntos={puntos} ref={grafico_matriz} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </Container>
      </>
      <Footer />
    </>
  );
}