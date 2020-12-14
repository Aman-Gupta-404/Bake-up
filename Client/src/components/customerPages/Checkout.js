import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import store from "../../redux/store";
import Base from "../core/Base";
import { getSingleProduct } from "./pageHelper";

import { Card, ListGroup, Button, Alert } from "react-bootstrap";

function Checkout(props) {
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  const getCartData = () => {
    const tempData = store.getState().cartReducer.products;
    tempData.map((item) => {
      getSingleProduct(item).then((res) => {
        if (res.error) {
          setError(true);
        } else {
          let temp = products;
          temp.push(res.product);
          setProducts([...temp]);
        }
      });
    });
  };

  useEffect(() => {
    getCartData();
  }, []);

  const calculatePrice = () => {
    var sum = 0;
    products.map((item) => {
      sum = sum + item.price;
    });
    return sum;
  };

  const renderData = () => {
    return (
      <div className="container mt-5">
        <Link id="brightButton" className="mb-3 btn" to="/cart">
          Back
        </Link>
        <Card>
          <Card.Header>
            <h2>Checkout</h2>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              {products.length !== 0 &&
                products.map((item, i) => {
                  return (
                    <ListGroup.Item key={i}>
                      {item.name}
                      <span id="checkout-price">{item.price}</span>
                    </ListGroup.Item>
                  );
                })}
              <ListGroup.Item>
                Total Price
                <span id="checkout-price">{calculatePrice()}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <Base>
      {/* {products.length !== 0 &&
        products.map((item) => {
          return <p>{item.name}</p>;
        })} */}
      {renderData()}
    </Base>
  );
}

export default Checkout;
