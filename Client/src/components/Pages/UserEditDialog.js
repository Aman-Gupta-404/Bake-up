import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import store from "../../redux/store";
import { UPDATE_USER } from "../../redux/users/userTypes";
import { updateUser } from "./Helper/userUpdateHelper";

function UserEditDialog(props) {
  const [updatedUser, setUpdatedUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const getUser = () => {
    const user = store.getState().userReducer.user;
    const { _id, firstName, lastName, email } = user;
    setUpdatedUser({
      ...updatedUser,
      firstName,
      lastName,
      _id,
      email,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserUpdate = () => {
    updateUser(updatedUser)
      .then((res) => {
        if (res.error) {
          return window.alert("something went wrong");
        } else {
          const payloadBody = {
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
          };
          // dipatching the user data
          store.dispatch({
            type: UPDATE_USER,
            payload: payloadBody,
          });
        }
        props.onUpdate();
        // window.alert("User updated uccessfully!");
      })
      .catch((err) => {
        window.alert("something went wrong");
      });

    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="first name"
                    name="firstName"
                    value={updatedUser.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className="col-sm-6">
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="last name"
                    name="lastName"
                    value={updatedUser.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              {/* <div className="col-sm-6">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    Pleae enter a new password
                  </Form.Text>
                </Form.Group>
              </div> */}
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} id="brightButton">
          Cancel
        </Button>
        <Button onClick={handleUserUpdate} id="brightButton">
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserEditDialog;
