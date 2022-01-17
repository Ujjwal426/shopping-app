import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const footer = () => {
  return (
    <>
      <footer className="my-3">
        <Container>
          <Row>
            <Col className="text-center">
              <span>Copyright &copy; Ujjwal </span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default footer;
