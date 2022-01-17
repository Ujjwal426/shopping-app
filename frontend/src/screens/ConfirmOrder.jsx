import React from "react";
import Message from "../components/shared/Message";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const backto = () => {
    navigate(`/`);
  };
  return (
    <div>
      <Row>
        <Col md={6}>
          <Message>Order Placed</Message>
          <Button className="btn-block" onClick={backto}>
            Return to Main menu
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ConfirmOrder;
