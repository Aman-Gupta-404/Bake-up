import React, { useState } from "react";
import Base from "../core/Base";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Alert, Col, Row } from "react-bootstrap";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { signUp } from "./helper/authHelper";
import { Link } from "react-router-dom";

function Signup() {
  // state to temperoraly store signup details

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // error handeling state
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { firstName, lastName, email, password } = data;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (event) => {
    event.preventDefault();

    // validations
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      setError(true);
      setSuccess(false);
      return;
    }

    signUp({
      firstName,
      lastName,
      email,
      password,
    })
      .then((res) => {
        // console.log(res);
        if (res.error) {
          setError(true);
          setSuccess(false);
        } else {
          setSuccess(true);
          setError(false);
          setData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setError(true);
      });
  };

  const signupForm = () => {
    return (
      <div className="container mt-5">
        <Card>
          <Card.Header>
            <h3>Sign-Up</h3>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Form.Group as={Col} sm={6} controlId="Text">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    onChange={handleChange}
                    name="firstName"
                    value={data.firstName}
                  />
                </Form.Group>
                <Form.Group as={Col} sm={6} controlId="Text">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last name"
                    onChange={handleChange}
                    name="lastName"
                    value={data.lastName}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    name="email"
                    value={data.email}
                  />
                </Form.Group>
                <Form.Group as={Col} sm={6} controlId="Text">
                  <Form.Label>Password</Form.Label>

                  <Form.Control
                    type="password"
                    placeholder="password"
                    onChange={handleChange}
                    name="password"
                    value={data.password}
                  />
                  {/* <span className="passIcon">
                    <VisibilityIcon />
                  </span> */}
                </Form.Group>
              </Row>
              <Button id="brightButton" onClick={submit}>
                Sign up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <p>
          Already have an account, click <a href="/login">here</a> to login
        </p>
      </div>
    );
  };

  const errorMessage = () => {
    // console.log(error);
    if (error && !success) {
      return (
        <div className="container mt-4 text-center">
          <Alert variant="danger">something went wrong, please try again</Alert>
        </div>
      );
    } else {
      return null;
    }
  };

  const successMessage = () => {
    if (success && !error) {
      return (
        <div className="container mt-4 text-center">
          <Alert variant="success">
            Account created successfully, login{" "}
            <span>
              <Link to="/login">here</Link>
            </span>
          </Alert>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Base>
      {errorMessage()}
      {successMessage()}
      {signupForm()}
    </Base>
  );
}

export default Signup;
