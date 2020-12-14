import React, { useState, useEffect } from "react";
import { getAllProducts } from "./helper/ProductsHelper";
import Base from "./Base";
import Cards from "./Cards";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import store from "../../redux/store";

function Home() {
  // react states
  const [products, setProducts] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  // to reaload the page
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  };

  // Function to do the api call
  const getProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        // console.log("something went wrong");
        return null;
      } else {
        // console.log(data);
        setProducts(data);
      }
    });
  };

  const refreshPage = () => {};

  useEffect(() => {
    setLoggedIn(store.getState().userReducer.isLoggedIn);
    getProducts();
  }, [reload, loggedIn]);

  return (
    <div>
      <Base>
        <div>
          <Jumbotron fluid className="jumbotron">
            <h1 className="jumbo-text jumbo-head">We Bake It Right</h1>
            <p className="jumbo-text jumbo-child">
              Our bakery items are baked with extreme love and care
            </p>
          </Jumbotron>

          {/* Cards to display items */}
          <Container className="justify-content-center">
            <Row>
              {products.map((item, i) => {
                let flag = false;
                const cartData = store.getState().cartReducer.products; // this is an array
                cartData.map((id) => {
                  if (id === item._id) {
                    flag = true;
                    return;
                  }
                });
                return (
                  <Col key={i} className="d-flex align-items-stretch">
                    <Cards
                      data={item}
                      cart={flag}
                      reloadFunction={handleReload}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </Base>
    </div>
  );
}

export default Home;
