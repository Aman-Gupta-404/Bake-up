import React, { useState } from "react";
import Base from "../core/Base";
import { Card, ListGroup, Button, Alert } from "react-bootstrap";
import { useEffect } from "react";
import { deleteCategory, getAllCategories } from "./helper/ProductHelper";
import store from "../../redux/store";
import { Redirect, Link } from "react-router-dom";

function AllCategory() {
  const [categories, setCategories] = useState([]);
  const [isRedirect, setIsRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);
    getAllCategories().then((res) => {
      if (res.error) {
        return setError(true);
      } else {
        setCategories([...categories, ...res]);
        setLoading(false);
        return;
      }
    });
  }, []);

  const handleDelete = (e) => {
    setLoading(true);
    const userId = store.getState().userReducer.user._id;
    const token = store.getState().userReducer.accessToken;
    // console.log(e.target.value);\
    const cateId = e.target.value;
    deleteCategory(e.target.value, userId, token).then((res) => {
      if (res.error) {
        setError(true);
      } else {
        getAllCategories().then((res) => {
          if (res.error) {
            setError(true);
            return;
          } else {
            setCategories([...res]);
            setLoading(false);
            return;
          }
        });
        // setIsRedirect(true);
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
              <h2>Manage Category</h2>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {categories.length !== 0 &&
                  categories.map((cate, i) => {
                    return (
                      <ListGroup.Item key={i}>
                        {cate.name}
                        <Button
                          className="categoryButton"
                          id="GreyButton"
                          value={cate._id}
                          onClick={handleDelete}
                        >
                          Delete
                        </Button>
                      </ListGroup.Item>
                    );
                  })}
                {categories.length === 0 && (
                  <ListGroup.Item>No categories found</ListGroup.Item>
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

export default AllCategory;
