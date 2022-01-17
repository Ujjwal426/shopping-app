import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loading from "../components/shared/Loading";
import { login } from "../actions/userAction";
import FormContainer from "../components/shared/FormContainer";
import { useLocation, useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loaction = useLocation();
  const navigate = useNavigate();
  const redirect = loaction.search ? loaction.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <FormContainer>
        <h1>Log IN</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label className="my-2">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="my-2">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-3">
            Log IN
          </Button>
        </Form>
        <Row>
          <Col>
            New Customer :
            <Link to={"/register"} className="btn btn-light" mx="1">
              register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
