import React, { useState } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/shared/FormContainer";
import { saveShippingAddress } from "../actions/cartAction";
import { useNavigate } from "react-router-dom";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="my-2"
            required
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="my-2"
            required
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="postalCode">
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter PostalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="my-2"
            required
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="country">
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="my-2"
            required
          ></Form.Control>
        </FormGroup>
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
