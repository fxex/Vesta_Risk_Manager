import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logoVesta from "../../assets/img/Logo-VestaRiskManager1.png";
import logoUnpa from "../../assets/img/Logo-UNPA-UARG-azul.png";
import "../../styles/informe.css";
import { formatearFechaHora } from "../../utils/fecha";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
  },
  imageVesta: {
    width: 50,
    height: 50,
  },
  imageUnpa: {
    width: 30,
    height: 50,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    color: "#000",
  },
  section: {
    marginBottom: 0,
    padding: 10,
  },
  textHeader: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%", // 4 columnas (100% / 4)
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    margin: 0, // Eliminar márgenes
    padding: 0, // Eliminar relleno
  },
  tableCell: {
    fontSize: 10,
    padding: 5,
    textAlign: "center",
    margin: 0, // Eliminar márgenes
  },
  tableHeader: {
    backgroundColor: "#00B0F0", // Fondo celeste
    color: "#FFF", // Letras blancas
    fontWeight: "bold",
  },
  grayBackground: {
    backgroundColor: "#F0F0F0", // Fondo gris
  },
  whiteBackground: {
    backgroundColor: "#FFF", // Fondo blanco
  },
});

// 📄 Componente del Informe
export default function InformeIncidencia({ datos }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.textHeader}>Fecha y Hora: </Text>
            <Text
              style={{ ...styles.textHeader, borderBottom: "1px solid gray" }}
            >
              {formatearFechaHora(new Date())}
            </Text>
          </View>
          <Text style={styles.textHeader}>Iteración N°:</Text>
        </View>
        <View style={styles.header}>
          <Image src={logoVesta} style={styles.imageVesta} />
          <Text style={styles.title}>
            INFORME DE INCIDENCIA {"\n"} RIESGO N°
          </Text>
          <Image src={logoUnpa} style={styles.imageUnpa} />
        </View>

        {/* Tabla */}
        <View style={styles.section}>
          <View style={styles.table}>
            {/* Primera fila: Título combinado */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={{ width: "100%", padding: 1 }}>
                <Text style={styles.tableCell}>1. DATOS DEL USUARIO</Text>
              </View>
            </View>

            {/* Segunda fila: 4 columnas */}
            <View style={styles.tableRow}>
              <View style={[styles.tableCol, styles.grayBackground]}>
                <Text style={{ ...styles.tableCell, textAlign: "center" }}>
                  Nombre
                </Text>
              </View>
              <View style={[styles.tableCol, styles.whiteBackground]}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={[styles.tableCol, styles.grayBackground]}>
                <Text style={{ ...styles.tableCell, textAlign: "center" }}>
                  Correo
                </Text>
              </View>
              <View style={[styles.tableCol, styles.whiteBackground]}>
                <Text style={styles.tableCell}></Text>
              </View>
            </View>

            {/* Tercera fila: 4 columnas */}
            <View style={styles.tableRow}>
              <View style={[styles.tableCol, styles.grayBackground]}>
                <Text style={{ ...styles.tableCell, textAlign: "center" }}>
                  Rol
                </Text>
              </View>
              <View style={{ width: "75%", padding: 5 }}>
                <Text style={styles.tableCell}></Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
