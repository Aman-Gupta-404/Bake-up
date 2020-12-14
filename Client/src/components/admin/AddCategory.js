import React from "react";
import Base from "../core/Base";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useState } from "react";
import { createCategory } from "./helper/ProductHelper";
import store from "../../redux/store";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

function AddCategory() {
  const [category, setCategory] = useState({
    name: "",
    error: false,
    success: false,
    isRedirect: false,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (category.name === "") {
      setCategory({
        ...category,
        error: true,
      });
      return;
    }
    const uploadData = {
      category: category.name,
    };
    const token = store.getState().userReducer.accessToken;
    const userId = store.getState().userReducer.user._id;
    // console.log(uploadData);
    createCategory(uploadData, token, userId).then((res) => {
      // console.log(res);
      if (res.error) {
        setCategory({
          ...category,
          error: res.error,
        });
      } else {
        setCategory({
          ...category,
          name: "",
          error: false,
          success: true,
          isRedirect: true,
        });
        alert("The Category was successfully created");
      }
    });
  };

  const redirectBack = () => {
    if (category.isRedirect) {
      return <Redirect exact to="/admin/dashboard" />;
    }
  };

  const errorMessage = () => {
    if (category.error && !category.success) {
      return (
        <div className="container mt-3">
          <Alert variant="danger">Something went wrong</Alert>
        </div>
      );
    }
  };

  const categoryForm = () => {
    return (
      <div className="container mt-5" id="">
        <Card>
          <Card.Header>
            <h3>Add Category</h3>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="CategoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter category"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Group>

              <br />
              <Link className="btn" to="/admin/dashboard" id="GreyButton">
                Cancel
              </Link>
              <Button
                className="ml-3"
                id="brightButton"
                type="submit"
                onClick={onSubmit}
              >
                Add Product
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <Base>
      {errorMessage()}
      {categoryForm()}
      {redirectBack()}
    </Base>
  );
}

export default AddCategory;
