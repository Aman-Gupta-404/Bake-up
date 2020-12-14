import React from "react";
import Base from "../core/Base";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createProduct, getAllCategories } from "./helper/ProductHelper";
import { useEffect } from "react";
import store from "../../redux/store";
import { Redirect } from "react-router";

function AddProducts() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    photo: "",
    price: null,
    allCategories: [],
    error: "",
    redirect: false,
    formData: "",
    message: "",
  });

  const [error, setError] = useState(false);

  const [success, setSuccess] = useState({
    loading: false,
    // productCreated: false,
  });

  const [created, setCreated] = useState(false);

  const preLoad = () => {
    setSuccess({
      loading: true,
    });
    getAllCategories().then((res) => {
      // console.log(res);
      if (res.error) {
        setProduct({
          ...product,
          error: res.error,
          message: res.message,
        });
      } else {
        setProduct({
          ...product,
          allCategories: [...res],
          formData: new FormData(),
        });
        setSuccess({
          loading: false,
        });
      }

      return;
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const handleChange = (event) => {
    const value =
      event.target.name === "photo"
        ? event.target.files[0]
        : event.target.value;
    product.formData.set(event.target.name, value);
    setProduct({
      ...product,
      [event.target.name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const flag =
      product.name === "" ||
      product.description === "" ||
      product.category === "" ||
      product.price === "" ||
      product.photo === "";
    if (flag) {
      setError(true);
      setProduct({
        ...product,
        formData: new FormData(),
        error: "fill all fields",
      });
      return;
    }

    setSuccess({
      ...success,
      loading: true,
    });
    // console.log(product.formData.getAll("description"));
    const token = store.getState().userReducer.accessToken;
    const id = store.getState().userReducer.user._id;
    createProduct(product.formData, id, token)
      .then((res) => {
        if (res.error) {
          setError(true);

          setProduct({
            ...product,
            error: res.error,
            name: "",
            description: "",
            category: "",
            photo: "",
            price: null,
            formData: new FormData(),
          });
          return;
        } else {
          setProduct({
            ...product,
            name: "",
            description: "",
            category: "",
            photo: "",
            error: "",
            price: null,
            formData: new FormData(),
            redirect: true,
          });
          setSuccess({
            loading: false,
          });
          setCreated(true);
        }
      })
      .catch((err) => {
        setError(true);
        return;
      });
  };

  const productForm = () => {
    return (
      <div className="container mt-5" id="">
        <Card>
          <Card.Header>
            <h3>Add Product</h3>
          </Card.Header>
          <Card.Body>
            <Form action={`${process.env.REACT_APP_BACKENDURL}/product/upload`}>
              {/* To add photos */}
              <Form.Group>
                <Form.File
                  id="exampleFormControlFile1"
                  label="product"
                  name="photo"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="ProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter name"
                  name="name"
                  onChange={handleChange}
                  value={product.name}
                />
              </Form.Group>

              <Form.Group controlId="ProductDiscription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  rows={3}
                  placeholder="description"
                  name="description"
                  onChange={handleChange}
                  value={product.description}
                />
              </Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                onChange={handleChange}
                value={product.category}
              >
                <option value="">Option 1</option>
                {product.allCategories.length !== 0 &&
                  product.allCategories.map((cate, i) => {
                    return (
                      <option key={i} value={cate._id}>
                        {cate.name}
                      </option>
                    );
                  })}
              </Form.Control>
              <Form.Group controlId="ProducPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  rows={3}
                  placeholder="Price"
                  name="price"
                  onChange={handleChange}
                  value={product.price}
                />
              </Form.Group>
              <br />
              <div>
                <Link className="btn" to="/admin/dashboard" id="GreyButton">
                  Cancel
                </Link>
                {/* <Button
                  id="brightButton"
                  className="mb-3 btn"
                  to="/admin/dashboard"
                >
                  Dashboard
                </Button> */}
                <Button
                  className="ml-3"
                  id="brightButton"
                  type="submit"
                  onClick={onSubmit}
                >
                  Add Product
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  };

  const SuccessMessage = () => {
    if (created && !error) {
      return (
        <div className="container">
          <Alert variant="success" className="mt-3">
            Product successfully created
          </Alert>
        </div>
      );
    } else {
      return null;
    }
  };
  const errorMessage = () => {
    if (error && !created) {
      return (
        <div className="container">
          <Alert variant="danger" className="mt-3">
            something went wrong!
          </Alert>
        </div>
      );
    } else {
      return null;
    }
  };

  const performRedirect = () => {
    if (product.redirect) {
      window.alert("Product created");
      return <Redirect to="/admin/dashboard" />;
    } else {
      return null;
    }
  };

  return (
    <Base>
      {/* {SuccessMessage()} */}
      {errorMessage()}
      {performRedirect()}
      {productForm()}
    </Base>
  );
}

export default AddProducts;
