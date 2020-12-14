import React, { useState } from "react";
import { useEffect } from "react";
import { Card, ListGroup, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import store from "../../redux/store";
import Base from "../core/Base";
import { getAllProducts } from "../core/helper/ProductsHelper";
import { deleteProduct } from "./helper/ProductHelper";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getProducts = () => {
    setLoading(true);
    // code to get all the product details!
    getAllProducts().then((res) => {
      if (res.error) {
        setError(true);
        return;
      } else {
        setLoading(false);
        setProducts(res);
      }
    });
  };

  useEffect(() => {
    setError(false);
    getProducts();
  }, []);

  const handleDelete = (event) => {
    setLoading(true);
    const productId = event.target.value;
    const userId = store.getState().userReducer.user._id;
    const token = store.getState().userReducer.accessToken;
    deleteProduct(productId, userId, token).then((res) => {
      if (res.error) {
        // throw res.error;
        setError(true);
      } else {
        // let tempArr = products;
        // tempArr.filter((item) => {
        //   return item._id !== productId;
        // });
        // setProducts([...tempArr]);
        getProducts();
        setLoading(false);
      }
    });
  };

  const loadingMessage = () => {
    if (loading) {
      return <div className="container">loading...</div>;
    } else {
      return null;
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <div className="container">
          <Alert variant="danger">Something went wrong</Alert>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <Base>
        {errorMessage()}
        {loadingMessage()}
        <div className="container mt-5">
          <Link id="brightButton" className="mb-3 btn" to="/admin/dashboard">
            Dashboard
          </Link>
          <Card>
            <Card.Header>
              <h2>Manage Products</h2>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {products.length !== 0 &&
                  products.map((item, i) => {
                    return (
                      <ListGroup.Item key={i}>
                        <Link to={`/product/${item._id}`} id="notLink">
                          {item.name}
                        </Link>

                        <Button
                          className="categoryButton"
                          id="GreyButton"
                          value={item._id}
                          onClick={handleDelete}
                        >
                          Delete
                        </Button>
                      </ListGroup.Item>
                    );
                  })}
                {products.length === 0 && (
                  <ListGroup.Item>No Products found</ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </Base>
      {/* {redirectAdmin} */}
    </div>
  );
}

export default AllProducts;
