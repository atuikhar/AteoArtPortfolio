import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Form, Button, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";

import Loader from "./../components/Loader";

import { login } from "../actions/userActions";

import FormContainer from "../components/FormContainer";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 className="text-center">SignIn</h1>

      {error && <Message variant="danger"> {error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label> Email Address </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mt-2" controlId="password">
          <Form.Label> Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="text-center mt-3">
          <Button type="submit">SignIn</Button>
        </Form.Group>
      </Form>
      <Row className="py-3">
        <Col>
          <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
            <Button className="btn btn-sm btn-info">SignUp</Button>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
