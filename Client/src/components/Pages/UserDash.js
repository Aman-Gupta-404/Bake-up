import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import store from "../../redux/store";
import UserEditDialog from "./UserEditDialog";

function UserDash() {
  const imgUrl =
    "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg";

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [reload, setReload] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const initializeUser = () => {
    const rawUser = store.getState().userReducer.user;
    const user = {
      firstName: rawUser.firstName,
      lastName: rawUser.lastName,
      email: rawUser.email,
    };
    setUser(user);
  };

  useEffect(() => {
    initializeUser();
  }, [reload]);

  const handleEdit = (e) => {
    e.preventDefault();
  };

  const reloadPage = () => {
    initializeUser();
    setReload(!reload);
    window.alert("Update successful");
  };

  return (
    <Base>
      <UserEditDialog
        show={editOpen}
        onUpdate={reloadPage}
        onHide={() => setEditOpen(false)}
      />
      <div className=" mt-5 dashboard">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              {/* user profile comes here */}
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <div className="userProfileDiv text-center">
                    <Card.Img
                      variant="top"
                      src={imgUrl}
                      id="userProfileImage"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <Card.Title>{user.firstName}</Card.Title>
                  </div>
                  <Card.Subtitle className="mb-2 text-muted text-center">
                    {user.email}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </div>
            <div class="col-md-8 ">
              <Card>
                <Card.Header>
                  <h2>User Information</h2>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <p>
                      Name: {user.firstName}
                      <span> </span>
                      {user.lastName}
                    </p>
                    <p>Email: {user.email}</p>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <Button id="brightButton" onClick={() => setEditOpen(true)}>
                    Edit Details
                  </Button>
                </Card.Footer>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default UserDash;
