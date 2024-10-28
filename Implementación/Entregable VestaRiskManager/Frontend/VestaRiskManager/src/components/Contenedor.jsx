import React from "react";
import { Container, Card } from "react-bootstrap";

export default function Contenedor({ children }) {
  const [headerContent, bodyContent, footerContent] = children;
  return (
    <Container className="pt-4 pb-5" style={{ minHeight: "70vh" }}>
      <Card>
        <Card.Header>{headerContent}</Card.Header>
        <Card.Body>{bodyContent}</Card.Body>
        {footerContent && <Card.Footer>{footerContent}</Card.Footer>}
      </Card>
    </Container>
  );
}
