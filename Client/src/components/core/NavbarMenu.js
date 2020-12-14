import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import store from "../../redux/store";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { logoutUser } from "../admin/helper/authHelper";
import { withRouter, Link, Redirect } from "react-router-dom";
import { REMOVE_USER } from "../../redux/users/userTypes";

export default withRouter(function NavbarMenu({ history }) {
  const [logoutLoading, setLogoutLoading] = useState(false); //state to handle loading suring logout
  const [logoutRedirect, setLogoutRedirect] = useState(false);
  const [show, setShow] = useState(false); //state to handle logout warning

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const tabStyle = (history, path) => {
    if (history.location.pathname === path) {
      return true;
    } else {
      return false;
    }
  };

  // functions for condentional rendering of the nav buttons
  const renderSignup = () => {
    if (!store.getState().userReducer.isLoggedIn) {
      return (
        <Nav.Link
          as={Link}
          id={tabStyle(history, "/signup") ? "highlightNav" : ""}
          to="/signup"
        >
          Sign up
        </Nav.Link>
      );
    } else {
      return null;
    }
  };

  const renderCart = () => {
    if (store.getState().userReducer.isLoggedIn) {
      return (
        <Nav.Link
          as={Link}
          id={tabStyle(history, "/cart") ? "highlightNav" : ""}
          to="/cart"
        >
          Cart
        </Nav.Link>
      );
    } else {
      return null;
    }
  };

  const renderUserDash = () => {
    if (
      store.getState().userReducer.isLoggedIn &&
      store.getState().userReducer.user.isAdmin
    ) {
      return (
        <Nav.Link
          as={Link}
          id={tabStyle(history, "/dashboard") ? "highlightNav" : ""}
          to="/admin/dashboard"
        >
          User
        </Nav.Link>
      );
    } else if (
      store.getState().userReducer.isLoggedIn &&
      !store.getState().userReducer.user.isAdmin
    ) {
      return (
        <Nav.Link
          as={Link}
          id={tabStyle(history, "/dashboard") ? "highlightNav" : ""}
          to="/dashboard"
        >
          User
        </Nav.Link>
      );
    } else {
      return null;
    }
  };

  const renderLogin = () => {
    if (!store.getState().userReducer.isLoggedIn) {
      return (
        <Nav.Link
          as={Link}
          id={tabStyle(history, "/login") ? "highlightNav" : ""}
          to="/login"
          // activeClassName="active"
        >
          Login
        </Nav.Link>
      );
    } else {
      return null;
    }
  };

  const renderLogout = () => {
    if (store.getState().userReducer.isLoggedIn) {
      if (logoutRedirect) {
        return <Redirect exact to="/" />;
      }
      return (
        <Nav.Link
          // as={Link}
          id={tabStyle(history, "#") ? "highlightNav" : ""}
          onClick={handleShow}
        >
          Logout
        </Nav.Link>
      );
    } else {
      return null;
    }
  };

  const handleLogout = () => {
    setLogoutLoading(true);
    logoutUser().then((res) => {
      store.dispatch({ type: REMOVE_USER, payload: { isLoggedIn: false } });
      window.location.replace("/");
      setLogoutRedirect(true);
      setLogoutLoading(false);
      handleClose();
    });
  };

  if (logoutLoading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div>
      {/* <Navbar bg="dark" variant="dark" expand="lg" className="navbar"> */}
      <Navbar expand="lg" variant="dark" className="navbar text-white">
        <Navbar.Brand as={Link} to="/" className="font-weight-bold">
          Bake-Up
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              as={Link}
              id={tabStyle(history, "/") ? "highlightNav" : ""}
              to="/"
            >
              Home
            </Nav.Link>
            {renderCart()}
            {renderUserDash()}
            {/* {store.getState().isLoggedIn ? (
              <Nav.Link href="/signup">Sign up</Nav.Link>
            ) : null} */}
            {renderSignup()}
            {renderLogin()}
            {renderLogout()}
            <Nav.Link
              as={Link}
              id={tabStyle(history, "/about") ? "highlightNav" : ""}
              to="/about"
            >
              About
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Form inline>
            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button id="navButton">Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Navbar>
      {/* logout warning dialog statrts here */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout</Modal.Body>
        <Modal.Footer>
          <Button id="greyButton" onClick={handleClose}>
            Cancel
          </Button>
          <Button id="brightButton" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});
