import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loading from "../components/shared/Loading";
import { signin } from "../actions/userAction";
import FormContainer from "../components/shared/FormContainer";
import { useLocation, useNavigate } from "react-router-dom";

const SigninScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState("");
  const loaction = useLocation();
  const navigate = useNavigate();

  const redirect = loaction.search ? loaction.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error, userInfo } = userSignin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password Do Not Match");
    } else {
      dispatch(signin(name, email, password, phone));
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Register</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loading />}
        {message && <Message variant="danger">{message}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label className="my-2">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label className="my-2">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label className="my-2">Phone No</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Phone No"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <Form.Group controlId="confirm password">
            <Form.Label className="my-2">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-3">
            SIGN IN
          </Button>
        </Form>
        <Row>
          <Col>
            <h5 className="my-3">
              Have an account !
              <Link to={"/login"} className="btn btn-light" mx="1">
                login
              </Link>
            </h5>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default SigninScreen;
