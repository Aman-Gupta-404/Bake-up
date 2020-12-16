import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import { loginUser, storeUser } from "./helper/authHelper";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import store from "../../redux/store";
import { ADD_USER } from "../../redux/users/userTypes";
import { GET_CART_PRODUCTS } from "../../redux/Cart/CartTypes";

function Login() {
  const history = useHistory();

  const loggedInStatus = store.getState().userReducer.isLoggedIn;

  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    success: true,
    isRedirect: false,
  });

  const [clicked, setClicked] = useState(false);

  const { email, password } = login;

  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  // function to handle the login submit button
  const loginSubmit = () => {
    // event.preventDefault(); //prevent default button action

    // validations
    if (email === "" || password == "") {
      setLogin({
        ...login,
        success: false,
      });
      return;
    }

    // setting loading values as false
    setLogin({
      ...login,
      loading: true,
    });

    loginUser({ email, password })
      .then((res) => {
        if (res.error) {
          setLogin({
            ...login,
            loading: false,
            success: false,
          });
          return;
        } else {
          const {
            _id,
            firstName,
            lastName,
            email,
            isAdmin,
            accessToken,
            cart,
          } = res;
          // console.log("message form login.js: ", cart);
          const payloadBody = {
            isLoggedIn: true,
            accessToken: accessToken,
            user: {
              _id,
              firstName,
              lastName,
              email,
              isAdmin,
            },
          };
          // dipatching the user data
          store.dispatch({
            type: ADD_USER,
            payload: payloadBody,
          });
          // dispatching the cart data
          store.dispatch({ type: GET_CART_PRODUCTS, payload: cart });
          // console.log(store.getState());
          setLogin({
            ...login,
            loading: false,
            success: true,
          });
        }

        // clearing the react state
        setLogin({
          email: "",
          password: "",
          loading: false,
          success: true,
          isRedirect: true,
        });
        window.location.replace("/");
      })
      .catch((err) => {
        setLogin({
          ...login,
          success: false,
        });
        console.log(err);
      });
  };

  // TODO:
  const onSubmitClick = (e) => {
    e.preventDefault();
    setClicked(true);
  };

  useEffect(() => {
    if (clicked) {
      loginSubmit();
      setClicked(false);
    }
  }, [clicked]);

  // funciton to redirect to home page
  const redirectHome = () => {
    if (login.isRedirect) {
      if (store.getState().userReducer.isLoggedIn) {
        return <Redirect exact to="/" />;
      } else {
        // console.log("something went wrong in logging in");
      }
    }
  };

  const loginForm = () => {
    return (
      <div className="container mt-5">
        {loading()}
        <Card>
          <Card.Header>
            <h3>Login</h3>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Form.Group as={Col} sm={12} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    //FIXME: for testing purpose only
                    value={login.email}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} sm={12} controlId="Text">
                  <Form.Label>Password</Form.Label>
                  <span>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      name="password"
                      onChange={handleChange}
                      //FIXME: for testing purpose only
                      // value="123456789"
                      value={login.password}
                    />
                  </span>
                </Form.Group>
              </Row>
              {/* <Button id="brightButton" type="submit" onClick={loginSubmit}> */}
              <Button id="brightButton" type="submit" onClick={onSubmitClick}>
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <p>
          Don't have an account, click <a href="/signup">here</a> to signup
        </p>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="container errorMsg mt-4">
        <h2>An error occured</h2>
        <p>Please check your email and password</p>
      </div>
    );
  };

  const loading = () => {
    return <div className=" loading"></div>;
  };

  if (login.loading) {
    return (
      <div className="container">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (loggedInStatus) {
    return <Redirect exact to="/" />;
  } else if (login.success == false) {
    return (
      <Base>
        {errorMessage()}
        {loginForm()}
        {/* {redirectHome()} */}
      </Base>
    );
  } else {
    return (
      <Base>
        {loginForm()}
        {/* {redirectHome()} */}
      </Base>
    );
  }
}

export default Login;
