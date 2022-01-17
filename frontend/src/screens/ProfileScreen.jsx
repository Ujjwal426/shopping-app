import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loading from "../components/shared/Loading";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (user === undefined) {
        dispatch(getUserDetails());
      }
    }
  }, [navigate, dispatch, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({ user: user._d, name, email, phone, password })
    );
  };
  const updateUser = useSelector((state) => state.updateUser);
  const { success } = updateUser;
  return (
    <>
      <Row>
        <Col md={6}>
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading && <Loading />}
          <h1>Register</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label className="my-2">Update Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Update Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label className="my-2">Update Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Update Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label className="my-2">Update Phone No</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Phone No"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label className="my-2">Update Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Update Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="Update Confirm Password">
              <Form.Label className="my-2">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Update Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3">
              Update Profile
            </Button>
          </Form>
        </Col>
        <Col md={2}></Col>
        <Col md={4}>
          <h2>My Orders</h2>
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
