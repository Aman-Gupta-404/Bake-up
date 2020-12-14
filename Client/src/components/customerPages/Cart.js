import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import store from "../../redux/store";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { getSingleProduct } from "./pageHelper";
import { Button, Col, Container, Row, Alert } from "react-bootstrap";
import Cards from "../core/Cards";
import { Redirect } from "react-router";

function Cart() {
  const [cartId, setCartId] = useState(store.getState().cartReducer.products);
  // const [cartId, setCartId] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const [productsData, setProductsData] = useState([]); //real prdoucts from here

  // to reaload the page
  const [reload, setReload] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getProductDetails = () => {
    const cartData = store.getState().cartReducer.products;
    cartData.map((itemId) => {
      getSingleProduct(itemId).then((res) => {
        if (res.error) {
          return;
        } else {
          let temp = cartProducts;
          temp.push(res.product);
          setCartProducts([...temp]);
        }
      });
    });
  };

  useEffect(() => {
    getProductDetails();
    console.log(cartProducts);
  }, [reload]);

  const handleReload = () => {
    setCartProducts([]);
    setReload(!reload);
  };

  const handleEmptyCart = () => {
    const temp = store.getState().cartReducer.products;
    if (temp.length === 0) {
      return (
        <div className="container mt-3 text-center">
          <Alert variant="warning">Your cart is empty!</Alert>
        </div>
      );
    } else {
      return null;
    }
  };

  const checkoutButton = () => {
    const temp = store.getState().cartReducer.products;
    if (temp.length === 0) {
      return (
        <Link id="brightButton" className="mb-3 btn" to="/cart">
          Back
        </Link>
      );
    } else {
      return null;
    }
  };

  const cardDisplay = () => {
    return (
      <Container className="justify-content-center">
        <div></div>
        <Row>
          {cartProducts.length !== 0 &&
            cartProducts.map((item, i) => {
              let flag = false;
              const data = store.getState().cartReducer.products;
              data.map((id) => {
                if (id === item._id) {
                  flag = true;
                  return;
                }
              });
              if (!flag) {
                return null;
              } else {
                return (
                  <Col key={i}>
                    <Cards
                      data={item}
                      cart={flag}
                      reloadFunction={handleReload}
                    />
                  </Col>
                );
              }
            })}
        </Row>
      </Container>
    );
  };

  return (
    <Base>
      {handleEmptyCart()}
      {cardDisplay()}
    </Base>
  );
}

export default Cart;
