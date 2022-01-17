import React, { useState } from "react";
import { Form, Button, Col, FormGroup } from "react-bootstrap";
import { savePaymentMethod } from "../actions/cartAction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setpaymentMethod] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div>
      <h2 className="my-3">Payment Method</h2>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label as="legend">
            <Col>
              <Form.Check
                type="radio"
                label="Paypal or Credit Card"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                checked
                onChange={(e) => setpaymentMethod(e.target.value)}
                className="my-2"
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Strip"
                id="strip"
                name="paymentMethod"
                value="strip"
                checked
                onChange={(e) => setpaymentMethod(e.target.value)}
                className="my-2"
              ></Form.Check>
            </Col>
          </Form.Label>
        </FormGroup>
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default PaymentScreen;
